import { sendEmail } from "../config/nodemailer.js";
import { findBookingById } from "../repositories/booking.repository.js";
export async function sendBookingConfirmationEmail(bookingId) {
    const booking = await findBookingById(bookingId);
    if (!booking || booking.status !== 'CONFIRMED')
        return;
    const when = booking.slot.startAt.toUTCString();
    await sendEmail(booking.inviteeEmail, `Booking Confirmation : ${booking.eventType.title}`, `
        <p>Hello ${booking.inviteeName},</p>
        <p>Your booking for ${booking.eventType.title} on ${when} has been confirmed.</p>
        <p>Thank you for booking with us.</p>
    `);
}
export async function sendCancellationEmail(bookingId) {
    const booking = await findBookingById(bookingId);
    if (!booking || booking.status !== 'CANCELLED')
        return;
    const when = booking.slot.startAt.toUTCString();
    await sendEmail(booking.inviteeEmail, `Booking Cancellation : ${booking.eventType.title}`, `
        <p>Hello ${booking.inviteeName},</p>
        <p>Your booking for ${booking.eventType.title} on ${when} has been cancelled.</p>
        <p>Thank you for booking with us.</p>
    `);
}
//# sourceMappingURL=booking.mailer.js.map