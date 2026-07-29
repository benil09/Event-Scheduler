import { proxyActivities } from "@temporalio/workflow";
import * as Activities from "../activities/index.js";

const { createGoogleCalendarEventActivity } = proxyActivities<typeof Activities>({
    retry: { maximumAttempts: 3 },
    startToCloseTimeout: "10 minutes"
});

export async function createGoogleCalendarEventWorkflow(bookingId: number) {
    await createGoogleCalendarEventActivity(bookingId);
}
