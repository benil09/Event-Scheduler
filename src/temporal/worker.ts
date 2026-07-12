import { NativeConnection,Worker } from "@temporalio/worker";
import { TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE, TEMPORAL_TASK_QUEUE } from "../config/env.js";
import { fileURLToPath } from "node:url";

import * as activities from "./activities/index.js";

async function run(){
    const connection = await NativeConnection.connect({
        address:TEMPORAL_ADDRESS
    })

    const worker = await Worker.create({
        connection,
        namespace:TEMPORAL_NAMESPACE,
        taskQueue:TEMPORAL_TASK_QUEUE,
        activities,
        workflowsPath:fileURLToPath(new URL("./workflows/index.ts",import.meta.url))
    })

    await worker.run()
}

run().catch((err) => {
    console.error(`[Temporal] : Error Starting worker | ${err}`);
    process.exit(1);
});