import { TEMPORAL_ENABLED, TEMPORAL_TASK_QUEUE } from "../config/env.js";
import { getTemporalClient } from "../config/temporal.js";
import { RegenerateHostSlotInput } from "../services/slot.service.js";


export async function startWorkflow(
    workflowName: string,
    workflowId: string,
    args: unknown[]

) {

    if (!TEMPORAL_ENABLED) {
        console.warn("[Temporal] :  temporal is not  enabled. Skipping workflow execution ")
        return null;
    }

    try {
        const client = await Promise.race([
            getTemporalClient(),
            new Promise<never>((_, reject) => {
                setTimeout(() => {
                    reject(new Error("Timeout waiting for temporal client"))
                }, 5000)
            })
        ])

        // we know for sure that the client is ready now
        // so the temporal is enabled and ready to use

        const handle = await client.workflow.start(workflowName, {
            taskQueue: TEMPORAL_TASK_QUEUE,
            workflowId,
            args
        })

        return handle.workflowId;



    } catch (error: any) {
        console.error(`[Temporal] : Error Starting the workflow : ${workflowName} with id : ${workflowId} | ${error.message}`)
        return null;
    }




}

// async mechanism to start the workflow
export async function regenerateHostSlotsWorkflow(input: RegenerateHostSlotInput) {
    return startWorkflow('regenerateHostSlotsWorkflow',
        `regenerate-host-slots-${input.hostId}-${Date.now()}`,
        [input])
}
