import { proxyActivities } from "@temporalio/workflow";

import * as Actvities from "../activities/index.js"


// create proxy activities
const {sendCancellationEmailActivity} = proxyActivities<typeof Actvities>({
    retry:{maximumAttempts:3},
    startToCloseTimeout:"10 minutes"
})

export async function sendCancellationEmailWorkflow(bookingId : number){
    await sendCancellationEmailActivity(bookingId)
}
