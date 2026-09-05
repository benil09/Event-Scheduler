import { RegenerateHostSlotInput } from "../../services/slot.service.js";
export declare function regenerateHostSlotsActivity(input: RegenerateHostSlotInput): Promise<void>;
export declare function sendBookingConfirmationEmailActivity(bookingId: number): Promise<void>;
export declare function sendCancellationEmailActivity(bookingId: number): Promise<void>;
export declare function createGoogleCalendarEventActivity(bookingId: number): Promise<void>;
//# sourceMappingURL=index.d.ts.map