import { proxyActivities } from "@temporalio/workflow";

import * as Actvities from "../activities/index.js"
import { RegenerateHostSlotInput } from "../../services/slot.service.js";



// create proxy activities
const {regenerateHostSlotsActivity} = proxyActivities<typeof Actvities>({
    retry:{maximumAttempts:3},
    startToCloseTimeout:"10 minutes"
})

export async function regenerateHostSlotsWorkflow(input : RegenerateHostSlotInput){
    await regenerateHostSlotsActivity(input)
}
