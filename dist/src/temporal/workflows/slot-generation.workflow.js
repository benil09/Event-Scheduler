import { proxyActivities } from "@temporalio/workflow";
// create proxy activities
const { regenerateHostSlotsActivity } = proxyActivities({
    retry: { maximumAttempts: 3 },
    startToCloseTimeout: "10 minutes"
});
export async function regenerateHostSlotsWorkflow(input) {
    await regenerateHostSlotsActivity(input);
}
//# sourceMappingURL=slot-generation.workflow.js.map