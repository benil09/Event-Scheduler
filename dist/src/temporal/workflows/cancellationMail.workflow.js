import { proxyActivities } from "@temporalio/workflow";
// create proxy activities
const { sendCancellationEmailActivity } = proxyActivities({
    retry: { maximumAttempts: 3 },
    startToCloseTimeout: "10 minutes"
});
export async function sendCancellationEmailWorkflow(bookingId) {
    await sendCancellationEmailActivity(bookingId);
}
//# sourceMappingURL=cancellationMail.workflow.js.map