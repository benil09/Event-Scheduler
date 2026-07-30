# 🗓️ Event-Scheduler API

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.2-000000.svg?style=flat&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748.svg?style=flat&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12%2B-4169E1.svg?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Temporal](https://img.shields.io/badge/Temporal-Orchestrator-7B2CBF.svg?style=flat)](https://temporal.io/)

**Event-Scheduler** is a modern, high-performance appointment scheduling and booking backend engine (inspired by Calendly). Built with Node.js, Express, TypeScript, Prisma, PostgreSQL, and **Temporal.io**, it powers dynamic host availability, timezone management, double-booking prevention, and fault-tolerant background processing.

---

## 📌 Project Overview

Event-Scheduler simplifies calendar management and event booking for individuals and teams. Instead of back-and-forth emails to negotiate meeting times, hosts define their recurring weekly availability and specific exceptions. Invitees can view available time slots in real time and instantly book appointments.

### Core Problems Solved
* **Automated Slot Calculation**: Converts weekly availability rules and custom holiday/block exceptions into bookable calendar slots with buffer times.
* **Double-Booking Prevention**: Uses database transaction locks (`FOR UPDATE`) to guarantee atomic bookings even under concurrent traffic.
* **Reliable Async Operations**: Offloads heavy tasks like slot regeneration, Google Calendar updates, and email notifications to Temporal background workflows.
* **Multi-Timezone Conversion**: Seamlessly converts host availability across global timezones for international invitees.

---

## ✨ Outstanding Features

* 📅 **Dynamic Weekly Availability & Exceptions**
  * Define weekly working hours per day (e.g., Monday to Friday 09:00 - 17:00).
  * Override regular schedules with custom exceptions (full-day blocks, partial unavailability, or added extra windows).
  * Configure pre-meeting and post-meeting buffer times (e.g., 10 mins before/after).

* 🔒 **Concurrency-Safe Atomic Booking**
  * Employs optimistic/pessimistic PostgreSQL transaction locks to prevent race conditions when multiple users attempt to book the exact same slot simultaneously.

* 🔄 **Event-Driven Workflow Orchestration (Temporal.io)**
  * Asynchronous slot regeneration triggered upon schedule changes.
  * Durable email notification queues for booking confirmations and cancellations.
  * Fault-tolerant background retries and activity execution.

* 📆 **Google Calendar Integration**
  * Automated sync to create and update calendar events directly on the host's Google Calendar upon booking completion.

* 🌐 **Global Timezone Support**
  * Precise date-time transformations using Luxon to handle Daylight Saving Time (DST) and multi-region timezones accurately.

* 🛡️ **Robust Validation & Error Handling**
  * End-to-end type safety with TypeScript.
  * Runtime request payload validation via Zod schemas.
  * Unified REST API error handling middleware.

---

## 🛠️ Technologies Used & How They Help

| Technology | Role | How It Helps |
| :--- | :--- | :--- |
| **Node.js & Express 5** | REST API Framework | Provides a lightweight, high-throughput asynchronous foundation for fast HTTP request handling. |
| **TypeScript** | Language | Enforces compile-time type safety across controllers, services, and DTOs, reducing runtime bugs. |
| **Prisma ORM** | Data Access | Generates type-safe database queries and handles seamless PostgreSQL schema migrations. |
| **PostgreSQL** | Relational Database | Stores users, event types, availability rules, and slots with transactional integrity and row locking. |
| **Temporal.io** | Workflow Engine | Guarantees durable background execution for slot regeneration, email dispatches, and third-party integrations. |
| **Luxon** | Time & Date Utility | Simplifies complex timezone conversions, slot interval math, and buffer time calculations. |
| **Zod** | Schema Validation | Validates incoming HTTP request bodies and query parameters before reaching business logic. |
| **Nodemailer & MailHog** | Email Delivery | Delivers HTML booking notifications in production and captures SMTP emails locally in development. |
| **Google APIs** | Calendar Integration | Connects with Google Calendar OAuth and Event APIs to synchronize host schedules automatically. |

---

## 🔄 Project Workflows

### 1. Host Availability & Slot Generation Flow
```mermaid
sequenceDiagram
    autonumber
    actor Host
    participant API as Express API
    participant DB as PostgreSQL DB
    participant Temporal as Temporal Orchestrator
    participant Worker as Temporal Worker

    Host->>API: Update Availability Rules / Exceptions
    API->>DB: Save Rules & Exceptions
    API->>Temporal: Trigger `slot-generation` Workflow
    API-->>Host: 200 OK (Schedule Updated)
    Temporal->>Worker: Execute Regenerate Slots Activity
    Worker->>DB: Calculate & Store New Available Slots
```

### 2. Invitee Booking Flow
```mermaid
sequenceDiagram
    autonumber
    actor Invitee
    participant API as Express API
    participant DB as PostgreSQL DB
    participant Temporal as Temporal Orchestrator
    participant Google as Google Calendar API

    Invitee->>API: Select Slot & Submit Booking (`POST /api/bookings`)
    API->>DB: Begin Transaction & Lock Slot (`FOR UPDATE`)
    alt Slot is AVAILABLE
        API->>DB: Mark Slot as `BOOKED` & Create Booking Record
        API->>DB: Commit Transaction
        API->>Temporal: Dispatch Email & Calendar Workflows
        API-->>Invitee: 201 Created (Booking Confirmed)
        par Async Execution
            Temporal->>Google: Create Google Calendar Event
        and Async Execution
            Temporal->>Temporal: Send Confirmation Email via SMTP
        end
    else Slot Already Booked
        API->>DB: Rollback Transaction
        API-->>Invitee: 409 Conflict (Slot Unavailable)
    end
```

---

## 🚀 Quick Start Guide

Follow these instructions to run the project locally on your machine.

### 1. Prerequisites
Ensure you have the following installed:
* **Node.js**: v18.0.0 or higher
* **Docker & Docker Compose**: For running PostgreSQL, Temporal, and MailHog services
* **npm**: v9.0.0 or higher

### 2. Environment Configuration
Create a `.env` file in the root directory and configure the environment variables:

```env
PORT=8000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"

# Temporal Configuration
TEMPORAL_ADDRESS="localhost:7233"

# SMTP / MailHog Configuration
SMTP_HOST="localhost"
SMTP_PORT=1025
SMTP_USER=""
SMTP_PASS=""
FROM_EMAIL="noreply@eventscheduler.com"
```

### 3. Start Infrastructure Services
Start PostgreSQL, Temporal Orchestrator, and MailHog using Docker Compose:

```bash
docker compose up -d
```

This starts:
* **PostgreSQL**: Port `5432`
* **Temporal Server**: Port `7233`
* **Temporal Web UI**: `http://localhost:8080`
* **MailHog Web Dashboard**: `http://localhost:8025`

### 4. Database Setup & Seeding
Execute database migrations and seed initial dummy data (hosts, event types, rules):

```bash
# Run database formatting, migrations, and generate Prisma client
npm run prisma:all

# Seed initial test data
npm run prisma:seed
```

### 5. Start Application Processes
Open two terminal windows to run both the API server and the Temporal background worker:

**Terminal 1 (API Server):**
```bash
npm run dev
```

**Terminal 2 (Temporal Background Worker):**
```bash
npm run dev:worker
```

The API will be available at `http://localhost:8000`.

---

## 🔌 API Endpoints Summary

| Group | Route | Method | Description |
| :--- | :--- | :--- | :--- |
| **System** | `/health` | `GET` | API Health and uptime check |
| **Users** | `/api/users` | `GET`, `POST`, `PUT`, `DELETE` | Host profile & user management |
| **Event Types** | `/api/event-types` | `GET`, `POST`, `PUT`, `DELETE` | Configure bookable event parameters & buffers |
| **Availability** | `/api/availability/rules` | `GET`, `POST`, `PATCH`, `DELETE` | Weekly recurring working hours management |
| **Exceptions** | `/api/availability/exceptions` | `GET`, `POST`, `PATCH`, `DELETE` | Specific date overrides, blocks, and windows |
| **Bookings** | `/api/bookings` | `GET`, `POST` | Reserve slots atomically and retrieve host bookings |
| **Public Page** | `/api/public/users/:userId/event-types/:slug` | `GET` | Public invitee view for available slots |

---

## 🔮 Future Implementation & Roadmap

* 🔐 **OAuth 2.0 for Invitees**: Support social login (Google, Microsoft) for invitees during booking.
* 👥 **Team & Collective Bookings**: Support multi-host availability matching and round-robin host assignment.
* 🔔 **Webhook Subscriptions**: Enable real-time webhook notifications for external systems when events are booked, rescheduled, or cancelled.
* 💳 **Payment Gateway Integration**: Seamless Stripe integration to charge for consultation bookings prior to confirmation.
* 🔄 **Reschedule & Self-Service Cancellation Portal**: Allow invitees to modify or cancel existing bookings via secure single-use links.
* 📊 **Analytics Dashboard**: Host metrics for total booking hours, peak booking days, and conversion rates.

---
