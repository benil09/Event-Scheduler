import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "./env.js";

const adapter = new PrismaPg({
    connectionString: DATABASE_URL,
    max: Number(process.env.DB_POOL_MAX) || 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

export const prisma = new PrismaClient({
    adapter,
});

export async function connectDB() {
    try {
        await prisma.$connect();
        console.log("[Database] Database connected successfully");
    } catch (error) {
        console.error("[Database] Database failed to connect");
        process.exit(1);
    }
}

export async function disconnectDB() {
    await prisma.$disconnect();
}