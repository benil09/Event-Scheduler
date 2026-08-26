import { RegenerateHostSlotInput } from "../services/slot.service.js";
export declare function startWorkflow(workflowName: string, workflowId: string, args: unknown[]): Promise<string | null>;
export declare function regenerateHostSlotsWorkflow(input: RegenerateHostSlotInput): Promise<string | null>;
export declare function sendBookingConfirmationEmailWorkflow(bookingId: number): Promise<string | null>;
export declare function sendCancellationEmailWorkflow(bookingId: number): Promise<string | null>;
export declare function createGoogleCalendarEventWorkflow(bookingId: number): Promise<string | null>;
//# sourceMappingURL=client.d.ts.map