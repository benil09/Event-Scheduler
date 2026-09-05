import { prisma } from "../config/database.js";
import { createBooking, deleteBookingRepo, findBookingById, getBookingsByHost } from "../repositories/booking.repository.js";
import { badRequest, notFound } from "../utils/api-error.js";
import { findSlotById, lockSlotForUpdate, markSlotBooked, } from "../repositories/slots.repository.js";
import { regenerateHostSlotsWorkflow, sendBookingConfirmationEmailWorkflow, sendCancellationEmailWorkflow, createGoogleCalendarEventWorkflow } from "../temporal/client.js";
import { sendBookingConfirmationEmail, sendCancellationEmail } from "../mailer/booking.mailer.js";
import { createGoogleCalenderEvent } from "./googleCalneder.service.js";
// Re-run slot availability function and regenerate slots for that day
async function triggerSlotRegen(hostId, slotStartAt) {
    try {
        const date = slotStartAt.toISOString().split('T')[0];
        await regenerateHostSlotsWorkflow({
            hostId,
            from: date,
            to: date
        });
    }
    catch (err) {
        console.warn("[Temporal] Slot regen workflow skipped/failed:", err);
    }
}
function validateSlotForBooking(slot) {
    if (!slot) {
        throw notFound("Slot not found");
    }
    if (slot.status !== "AVAILABLE") {
        throw badRequest("Slot is not available");
    }
    if (slot.startAt <= new Date()) {
        throw badRequest("Slot has already started");
    }
    return slot;
}
function formatBookingResponse(booking) {
    return {
        booking: {
            id: booking.id,
            status: booking.status,
            startAt: booking.slot.startAt.toISOString(),
            endAt: booking.slot.endAt.toISOString(),
        },
    };
}
export async function createBookingOptimistically(userId, dto) {
    const booking = await prisma.$transaction(async (tx) => {
        const locked = await lockSlotForUpdate(dto.slotId, tx);
        if (locked.length === 0) {
            throw notFound("Slot not found");
        }
        const slot = validateSlotForBooking(await findSlotById(dto.slotId, tx));
        await markSlotBooked(dto.slotId, tx);
        return createBooking({
            slotId: dto.slotId,
            inviteeEmail: dto.inviteeEmail,
            inviteeName: dto.inviteeName,
            inviteeNotes: dto.inviteeNotes,
            hostId: userId,
            eventTypeId: slot.eventTypeId,
        }, tx);
    });
    // 1. Regenerate Slots for Host
    triggerSlotRegen(userId, booking.slot.startAt).catch(console.warn);
    // 2. Send Booking Confirmation Email (Temporal Workflow -> Direct Fallback)
    (async () => {
        try {
            const wfId = await sendBookingConfirmationEmailWorkflow(booking.id);
            if (!wfId) {
                console.log("[Booking Workflow] Temporal not active, sending email directly...");
                await sendBookingConfirmationEmail(booking.id);
            }
        }
        catch (err) {
            console.error("Failed to send booking confirmation email:", err);
            await sendBookingConfirmationEmail(booking.id).catch(console.error);
        }
    })();
    // 3. Create Google Calendar Event (Temporal Workflow -> Direct Fallback)
    (async () => {
        try {
            const wfId = await createGoogleCalendarEventWorkflow(booking.id);
            if (!wfId) {
                console.log("[Booking Workflow] Temporal not active, creating Google Calendar event directly...");
                await createGoogleCalenderEvent(booking.id);
            }
        }
        catch (err) {
            console.error("Failed to create Google Calendar event:", err);
            await createGoogleCalenderEvent(booking.id).catch(console.error);
        }
    })();
    return formatBookingResponse(booking);
}
export async function getBookingsByHostService(hostId) {
    return getBookingsByHost(hostId);
}
export async function cancelBookingService(bookingId, userId) {
    if (!bookingId) {
        throw badRequest("Booking ID is required");
    }
    if (!userId) {
        throw badRequest("User ID is required");
    }
    const booking = await findBookingById(bookingId);
    if (!booking) {
        throw notFound("Booking not found");
    }
    if (booking.hostId !== userId) {
        throw badRequest("Booking does not belong to the user");
    }
    // 1. Update database status to CANCELLED and make slot AVAILABLE first
    await deleteBookingRepo(bookingId);
    // 2. Direct / Temporal Cancellation Email (triggered after status is updated)
    (async () => {
        try {
            const wfId = await sendCancellationEmailWorkflow(bookingId);
            if (!wfId) {
                await sendCancellationEmail(bookingId);
            }
        }
        catch (err) {
            console.error("Failed to send cancellation email:", err);
            await sendCancellationEmail(bookingId).catch(console.error);
        }
    })();
    return "Booking cancelled successfully";
}
//# sourceMappingURL=booking.service.js.map