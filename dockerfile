FROM node:20-bookworm-slim AS build

WORKDIR /app

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .
RUN npx prisma generate
RUN NODE_OPTIONS="--max-old-space-size=1024" npx tsc

FROM node:20-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=384"

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated

RUN chown -R node:node /app
USER node

EXPOSE 8000

CMD ["node", "--enable-source-maps", "dist/src/server.js"]
