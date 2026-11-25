import { app } from "./app.js";
import dotenv from "dotenv";
import { PORT } from "./config/env.js";
import { connectDB, disconnectDB } from "./config/database.js";
import { connectRedis, disconnectRedis } from "./config/redis.js";

dotenv.config();

async function startServer() {
    await connectDB();
    await connectRedis();

    const server = app.listen(PORT, () => {
        console.log(`[Server]   Server is running on port ${PORT}`);
    });

    const shutdown = async (signal: string) => {
        console.log(`[Server]   Received ${signal}, shutting down gracefully...`);
        server.close(async () => {
            await Promise.allSettled([disconnectDB(), disconnectRedis()]);
            process.exit(0);
        });
        setTimeout(() => process.exit(1), 10000).unref();
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((error) => {
    console.log("[Server] Error connecting the server : ", error);
    process.exit(1);
});
