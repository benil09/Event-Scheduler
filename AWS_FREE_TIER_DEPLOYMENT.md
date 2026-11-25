# Event-Scheduler — AWS Free Tier Backend Deployment Guide

This guide walks you through hosting the **Event-Scheduler backend** (Node.js/Express API, PostgreSQL, Redis) on **AWS Free Tier EC2 (`t2.micro` or `t3.micro` — 1 GB RAM)** using low-resource best practices, and connecting it to your **Vercel-hosted frontend**.

---

## 1. Architecture & Resource-Saving Design

An AWS Free Tier EC2 instance (`t2.micro` / `t3.micro`) only has **1 GB of RAM**. Running the full `docker-compose.yml` (which includes `temporalio/auto-setup` + Temporal Worker) would exceed 1 GB RAM and trigger Linux OOM (Out-of-Memory) kills.

Instead, `docker-compose.aws.yml` uses a **~450 MB RAM footprint**:

```text
[ Browser ] ──HTTPS──▶ [ Vercel Frontend (frontend/vercel.json) ]
                              │
                              ▼  (Server-side Rewrite / Proxy)
                       [ AWS EC2 Public IP :80 (Nginx) ]
                              │
                              ▼  (127.0.0.1:8000)
┌─────────────────────────────────────────────────────────────┐
│ Docker (docker-compose.aws.yml)                             │
│                                                             │
│  ┌──────────────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │ event_scheduler_api  │  │ PostgreSQL  │  │   Redis    │  │
│  │ (Node 20, max 384MB) │  │ (max 256MB) │  │ (max 96MB) │  │
│  └──────────────────────┘  └─────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Optimizations Implemented in Code
1. **Temporal Disabled by Default (`TEMPORAL_ENABLED=false`)**:
   - `temporal` and `worker` are placed under `profiles: ["temporal"]` in `docker-compose.aws.yml`, so they do not start on 1 GB RAM.
   - Direct fallbacks in `src/services/booking.service.ts` and `src/services/event-types.service.ts` automatically handle emails, Google Calendar events, and slot regeneration synchronously/in-process when `TEMPORAL_ENABLED=false`.
2. **PostgreSQL & Connection Pool Tuning**:
   - `src/config/database.ts` caps the `pg` pool (`DB_POOL_MAX=5`, `idleTimeoutMillis: 30000`).
   - `docker-compose.aws.yml` sets `shared_buffers=128MB`, `max_connections=30`, `work_mem=4MB`, and `mem_limit: 256m`.
3. **Redis Memory Cap**:
   - Uses `redis:7-alpine` with `--maxmemory 64mb --maxmemory-policy allkeys-lru --save ""` (`mem_limit: 96m`) so ephemeral OTPs and OAuth tokens never exhaust RAM.
4. **Node.js & Docker Build Optimization**:
   - `.dockerignore` excludes `frontend/`, `scripts/`, `*.md`, and `generated/` from the Docker build context.
   - `dockerfile` uses `npm ci --omit=dev`, runs as non-root `USER node`, and sets `NODE_OPTIONS="--max-old-space-size=384"`.
   - `src/server.ts` handles `SIGTERM`/`SIGINT` for graceful DB/Redis shutdown.
   - `src/middlewares/error-handler.ts` skips writing `debug.log` in production (Docker `json-file` logging is capped at `10m` x `3` files).
   - `src/app.ts` enables `trust proxy` and restricts CORS to `FRONTEND_URL` when set.

---

## 2. Phase 1 — Launch AWS EC2 Free Tier Instance

1. Sign in to the **AWS Management Console** and open **EC2 → Launch Instance**.
2. **Name**: `event-scheduler-backend`.
3. **AMI (OS)**: **Ubuntu Server 24.04 LTS** (64-bit x86).
4. **Instance type**: `t2.micro` or `t3.micro` *(Free tier eligible, 1 GB RAM)*.
5. **Key pair**: Create a new `.pem` key pair and download it.
6. **Network settings (Security Group)**:
   - Allow **SSH (22)** from **My IP**.
   - Allow **HTTP (80)** from **Anywhere (`0.0.0.0/0`)**.
   - Allow **HTTPS (443)** from **Anywhere (`0.0.0.0/0`)** *(if you add a custom domain + SSL later)*.
   - *(You do **not** need to expose port `8000`, `5432`, or `6379` publicly — Nginx proxies port `80` to `127.0.0.1:8000`.)*
7. **Storage**: Set root volume to **20–30 GB `gp3`** (AWS Free Tier includes up to 30 GB EBS).
8. Click **Launch instance** and note your **Public IPv4 address** (`<EC2_PUBLIC_IP>`).

---

## 3. Phase 2 — Connect via SSH & Add 2 GB Swap (Critical for 1 GB RAM)

From your local terminal:

```bash
chmod 400 ~/Downloads/your-key.pem
ssh -i ~/Downloads/your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

Inside the EC2 instance, create a **2 GB swap file** so `docker compose build` (`tsc` + `npm ci`) never runs out of memory:

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h
```

---

## 4. Phase 3 — Install Docker & Docker Compose

```bash
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y ca-certificates curl gnupg

# Install Docker Engine + Compose plugin
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

# Apply group membership (or log out and SSH back in)
newgrp docker
docker --version && docker compose version
```

---

## 5. Phase 4 — Deploy the Backend

### 5.1 Clone the repository

```bash
git clone <YOUR_REPO_URL> event-scheduler
cd event-scheduler
```

### 5.2 Create `.env`

```bash
cp .env.example .env
nano .env
```

Set these production values in `.env`:

```env
PORT=8000
NODE_ENV=production
SLOT_GENERATION_DAYS=30

# Docker internal service names (matches docker-compose.aws.yml)
DATABASE_URL=postgresql://nil:Nilkamal09@postgres:5432/calenderly-db?schema=public
DB_POOL_MAX=5
REDIS_URI=redis://redis:6379

# Disable Temporal on 1 GB RAM Free Tier
TEMPORAL_ENABLED=false

# Your Vercel Frontend URL (used for CORS & Google OAuth redirects)
FRONTEND_URL=https://your-app.vercel.app

# SMTP / Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com

# Google OAuth (update redirect URI to match your Vercel URL or EC2 domain)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://your-app.vercel.app/api/integrations/google/callback
GOOGLE_SENDER_EMAIL=your-email@gmail.com
GOOGLE_CALENDAR_ID=primary
```

### 5.3 Build & Start Containers

```bash
docker compose -f docker-compose.aws.yml up -d --build
```

Check container status and memory usage:

```bash
docker compose -f docker-compose.aws.yml ps
docker stats --no-stream
```

### 5.4 Run Database Migrations

```bash
docker compose -f docker-compose.aws.yml exec api npx prisma migrate deploy
```

Test the API locally on the EC2 machine:

```bash
curl http://127.0.0.1:8000/health
```

---

## 6. Phase 5 — Configure Nginx Reverse Proxy

Install Nginx on the EC2 host so incoming traffic on port `80` forwards cleanly to `127.0.0.1:8000`:

```bash
sudo apt-get install -y nginx
sudo tee /etc/nginx/sites-available/event-scheduler > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;

    client_max_body_size 2M;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/event-scheduler /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

Verify from your local machine:

```bash
curl http://<EC2_PUBLIC_IP>/health
```

*(Optional HTTPS)*: If you point a free domain (e.g., DuckDNS) to `<EC2_PUBLIC_IP>`, you can enable free SSL with:
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.duckdns.org
```

---

## 7. Phase 6 — Connect Your Vercel Frontend

Because your frontend is already on Vercel (`https://your-app.vercel.app`), browsers block direct `http://` API calls from an `https://` page (**Mixed Content**).

`frontend/vercel.json` solves this cleanly using **Vercel Rewrites** (Vercel's edge acts as an HTTPS proxy to your EC2 Nginx server):

Update `frontend/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://<EC2_PUBLIC_IP>/api/:path*"
    },
    {
      "source": "/health",
      "destination": "http://<EC2_PUBLIC_IP>/health"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

> **Note**: Make sure your frontend API client uses relative paths (`/api/...`) so requests go through Vercel's rewrite proxy. Push `frontend/vercel.json` to trigger a Vercel redeploy, then test `https://your-app.vercel.app/health`.

---

## 8. Useful Maintenance Commands

```bash
# View API logs
docker compose -f docker-compose.aws.yml logs -f api

# Restart after pulling code updates
git pull && docker compose -f docker-compose.aws.yml up -d --build

# Clean up unused Docker build cache to save EBS disk space
docker builder prune -f && docker image prune -f
```
