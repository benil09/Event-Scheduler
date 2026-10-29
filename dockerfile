FROM node:20-bookworm-slim AS build

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .
RUN npx prisma generate
RUN npx tsc

FROM node:20-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated

EXPOSE 8000

CMD ["node", "dist/src/server.js"]
