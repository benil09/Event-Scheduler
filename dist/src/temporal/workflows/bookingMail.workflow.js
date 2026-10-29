import { proxyActivities } from "@temporalio/workflow";
// create proxy activities
const { sendBookingConfirmationEmailActivity } = proxyActivities({
    retry: { maximumAttempts: 3 },
    startToCloseTimeout: "10 minutes"
});
export async function sendBookingConfirmationEmailWorkflow(bookingId) {
    await sendBookingConfirmationEmailActivity(bookingId);
}
//# sourceMappingURL=bookingMail.workflow.js.map