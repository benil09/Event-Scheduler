import { NativeConnection, Worker } from "@temporalio/worker";
import { TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE, TEMPORAL_TASK_QUEUE } from "../config/env.js";
import { fileURLToPath } from "node:url";
import * as activities from "./activities/index.js";
import { connectRedis } from "../config/redis.js";
async function connectWithRetry(retries = 15, delayMs = 2000) {
    for (let i = 1; i <= retries; i++) {
        try {
            console.log(`[Temporal Worker] Connecting to Temporal at ${TEMPORAL_ADDRESS} (Attempt ${i}/${retries})...`);
            const connection = await NativeConnection.connect({
                address: TEMPORAL_ADDRESS
            });
            console.log(`[Temporal Worker] Successfully connected to Temporal server!`);
            return connection;
        }
        catch (err) {
            console.warn(`[Temporal Worker] Attempt ${i} failed: ${err.message || err}. Retrying in ${delayMs / 1000}s...`);
            if (i === retries)
                throw err;
            await new Promise((res) => setTimeout(res, delayMs));
        }
    }
    throw new Error("Unable to connect to Temporal server after retries");
}
async function startWorker() {
    const connection = await connectWithRetry();
    // Dynamically resolve .js in production (dist) or .ts in development (tsx/ts-node)
    const ext = import.meta.url.endsWith(".js") ? "js" : "ts";
    const workflowsPath = fileURLToPath(new URL(`./workflows/index.${ext}`, import.meta.url));
    const worker = await Worker.create({
        connection,
        namespace: TEMPORAL_NAMESPACE,
        taskQueue: TEMPORAL_TASK_QUEUE,
        activities,
        workflowsPath,
    });
    console.log(`[Temporal Worker] Worker listening on task queue: ${TEMPORAL_TASK_QUEUE}`);
    await worker.run();
}
connectRedis().catch((err) => {
    console.error(`[Redis] : Error Connecting redis | ${err}`);
    process.exit(1);
});
startWorker().catch((err) => {
    console.error(`[Temporal] : Error Starting worker | ${err}`);
    process.exit(1);
});
//# sourceMappingURL=worker.js.map