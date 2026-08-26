import { getDbClient } from "./db-client.js";
import { prisma } from "../config/database.js";
export async function createBooking(data, db) {
    const client = getDbClient(db);
    return client.booking.create({
        data: {
            slotId: data.slotId,
            inviteeEmail: data.inviteeEmail,
            inviteeName: data.inviteeName,
            inviteeNote: data.inviteeNotes,
            hostId: data.hostId,
            eventTypeId: data.eventTypeId,
            status: "CONFIRMED",
        },
        include: {
            slot: true,
        },
    });
}
export async function getBookingsByHost(hostId, db) {
    const client = getDbClient(db);
    return client.booking.findMany({
        where: { hostId },
        include: {
            slot: true,
            eventType: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
export async function findBookingById(bookingId) {
    return prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
            slot: true,
            eventType: true,
            host: true,
        },
    });
}
export async function deleteBookingRepo(bookingId) {
    return await prisma.booking.update({
        where: { id: bookingId },
        data: {
            status: "CANCELLED",
            slot: {
                update: { status: "AVAILABLE" }
            }
        }
    });
}
//# sourceMappingURL=booking.repository.js.map