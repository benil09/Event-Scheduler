import { proxyActivities } from "@temporalio/workflow";

import * as Actvities from "../activities/index.js"


// create proxy activities
const {sendBookingConfirmationEmailActivity} = proxyActivities<typeof Actvities>({
    retry:{maximumAttempts:3},
    startToCloseTimeout:"10 minutes"
})

export async function sendBookingConfirmationEmailWorkflow(bookingId : number){
    await sendBookingConfirmationEmailActivity(bookingId)
}
