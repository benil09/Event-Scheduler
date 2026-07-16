import { sendBookingConfirmationEmail } from "../../mailer/booking.mailer.js";
import { regenerateHostSlots as runSlotGeneration , RegenerateHostSlotInput } from "../../services/slot.service.js";



export async function regenerateHostSlotsActivity(input:RegenerateHostSlotInput){
    await runSlotGeneration(input);

    
}

export async function sendBookingConfirmationEmailActivity(bookingId: number) {
    await sendBookingConfirmationEmail(bookingId);
}
    

    