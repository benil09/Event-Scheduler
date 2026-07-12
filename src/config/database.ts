import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "./env.js";

const adapter = new PrismaPg({
    connectionString:DATABASE_URL
})

export const prisma = new PrismaClient({
    adapter
})

export async function connectDB(){
    try {
        await prisma.$connect();
        console.log("[Database] Database connected successfully")
    } catch (error) {
        console.error("[Database] Database failed to connect");
        process.exit(1);
    }
}