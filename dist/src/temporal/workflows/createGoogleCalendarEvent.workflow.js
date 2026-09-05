import { proxyActivities } from "@temporalio/workflow";
const { createGoogleCalendarEventActivity } = proxyActivities({
    retry: { maximumAttempts: 3 },
    startToCloseTimeout: "10 minutes"
});
export async function createGoogleCalendarEventWorkflow(bookingId) {
    await createGoogleCalendarEventActivity(bookingId);
}
//# sourceMappingURL=createGoogleCalendarEvent.workflow.js.map