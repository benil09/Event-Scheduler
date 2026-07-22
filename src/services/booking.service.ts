import { CreateBookingDto } from "../dtos/booking.dto.js";
import { prisma } from "../config/database.js"
import { createBooking, deleteBookingRepo, findBookingById, getBookingsByHost } from "../repositories/booking.repository.js";
import { badRequest, notFound } from "../utils/api-error.js";
import type { Slot } from "../../generated/prisma/client.js";
import {
    findSlotById,
    lockSlotForUpdate,
    markSlotBooked,
} from "../repositories/slots.repository.js";
import { regenerateHostSlotsWorkflow, sendBookingConfirmationEmailWorkflow, sendCancellationEmailWorkflow } from "../temporal/client.js";



// so once a booking is done we need to re-run the slot availability function and regenerate the slots for that day 
 async function triggerSlotRegen(hostId: number, slotStartAt: Date) {
    const date = slotStartAt.toISOString().split('T')[0];
    await regenerateHostSlotsWorkflow({
        hostId,
        from: date,
        to: date
    });
}


function validateSlotForBooking(slot: Slot | null): Slot {
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

function formatBookingResponse(booking: {
    id: number;
    status: string;
    slot: { startAt: Date; endAt: Date };
}) {
    return {
        booking: {
            id: booking.id,
            status: booking.status,
            startAt: booking.slot.startAt.toISOString(),
            endAt: booking.slot.endAt.toISOString(),
        },
    };
}


export async function createBookingOptimistically(userId: number, dto: CreateBookingDto) {
    const booking = await prisma.$transaction(async (tx) => {
        const locked = await lockSlotForUpdate(dto.slotId, tx)

        if (locked.length === 0) {
            throw notFound("Slot not found");
        }

        const slot = validateSlotForBooking(await findSlotById(dto.slotId, tx));

        await markSlotBooked(dto.slotId, tx);


        return createBooking(
            {
                slotId: dto.slotId,
                inviteeEmail: dto.inviteeEmail,
                inviteeName: dto.inviteeName,
                inviteeNotes: dto.inviteeNotes,
                hostId: userId,
                eventTypeId: slot.eventTypeId,
            },
            tx
        );
    });
    await triggerSlotRegen(userId,booking.slot.startAt)
    await sendBookingConfirmationEmailWorkflow(booking.id)
    return formatBookingResponse(booking);

}

export async function getBookingsByHostService(hostId: number) {
    return getBookingsByHost(hostId);
}

export async function cancelBookingService(bookingId:number,userId:number){    
        if(!bookingId){
            throw badRequest("Booking ID is required");
        }

        if(!userId){
            throw badRequest("User ID is required");
        }
        const booking = await findBookingById(bookingId);
        if(!booking){
            throw notFound("Booking not found");
        }
        if(booking.hostId !== userId){
            throw badRequest("Booking does not belong to the user");
        }
        await sendCancellationEmailWorkflow(bookingId)
        await deleteBookingRepo(bookingId);
        return "Booking cancelled successfully";    
}
