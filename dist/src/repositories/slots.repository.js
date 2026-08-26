import { prisma } from "../config/database.js";
import { getDbClient } from "./db-client.js";
export async function getAllBookedSlotsByHostInRangeRepo(hostId, startDate, endDate) {
    return prisma.slot.findMany({
        where: {
            hostId,
            startAt: {
                gte: startDate,
                lte: endDate
            }, status: "BOOKED"
        }
    });
}
export async function upsertAvailableSlotRepo(hostId, eventTypeId, startAt, endAt) {
    const existing = await prisma.slot.findUnique({
        where: {
            eventTypeId_startAt_endAt: {
                eventTypeId,
                startAt,
                endAt,
            }
        }
    });
    if (existing) {
        if (existing.status === 'BOOKED' || existing.status === 'BLOCKED') {
            return existing;
        }
        return prisma.slot.update({
            where: { id: existing.id },
            data: { status: 'AVAILABLE' }
        });
    }
    return prisma.slot.create({
        data: {
            hostId,
            eventTypeId,
            startAt,
            endAt,
            status: 'AVAILABLE',
        }
    });
}
export async function getFutureBookedOrBlockedSlotsRepo(eventTypeId, fromDate) {
    return prisma.slot.findMany({
        where: {
            eventTypeId,
            startAt: { gte: fromDate },
            status: { in: ["BOOKED", "BLOCKED"] }
        }
    });
}
export async function updateSlotStatusRepo(id, status) {
    return prisma.slot.update({
        where: { id },
        data: { status }
    });
}
export async function findSlotById(id, db) {
    const client = getDbClient(db);
    return client.slot.findUnique({
        where: { id },
    });
}
export async function markSlotBookedIfAvailable(id, db) {
    const client = getDbClient(db);
    return client.slot.updateMany({
        where: {
            id,
            status: "AVAILABLE",
        },
        data: {
            status: "BOOKED",
        },
    });
}
export async function lockSlotForUpdate(id, db) {
    const client = getDbClient(db);
    return client.$queryRaw `
        SELECT id
        FROM slots
        WHERE id = ${id}
        FOR UPDATE
    `;
}
export async function markSlotBooked(id, db) {
    const client = getDbClient(db);
    return client.slot.update({
        where: { id },
        data: { status: "BOOKED" },
    });
}
//# sourceMappingURL=slots.repository.js.map