import { sendBookingConfirmationEmail, sendCancellationEmail } from "../../mailer/booking.mailer.js";
import { regenerateHostSlots as runSlotGeneration } from "../../services/slot.service.js";
import { createGoogleCalenderEvent } from "../../services/googleCalneder.service.js";
export async function regenerateHostSlotsActivity(input) {
    await runSlotGeneration(input);
}
export async function sendBookingConfirmationEmailActivity(bookingId) {
    await sendBookingConfirmationEmail(bookingId);
}
export async function sendCancellationEmailActivity(bookingId) {
    await sendCancellationEmail(bookingId);
}
export async function createGoogleCalendarEventActivity(bookingId) {
    await createGoogleCalenderEvent(bookingId);
}
//# sourceMappingURL=index.js.map