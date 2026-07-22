import { sendBookingConfirmationEmail , sendCancellationEmail } from "../../mailer/booking.mailer.js";
import { regenerateHostSlots as runSlotGeneration , RegenerateHostSlotInput } from "../../services/slot.service.js";



export async function regenerateHostSlotsActivity(input:RegenerateHostSlotInput){
    await runSlotGeneration(input);

    
}

export async function sendBookingConfirmationEmailActivity(bookingId: number) {
    await sendBookingConfirmationEmail(bookingId);
}

export async function sendCancellationEmailActivity(bookingId: number) {
    await sendCancellationEmail(bookingId);
}    