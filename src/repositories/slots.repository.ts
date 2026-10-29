import { prisma } from "../config/database.js";
import { getDbClient, type DbClient } from "./db-client.js";

export async function getAllBookedSlotsByHostInRangeRepo(hostId:number,startDate: Date,endDate: Date){
    return prisma.slot.findMany({
        where:{
            hostId,
            startAt:{
                gte:startDate,
                lte:endDate
            },status:"BOOKED"            
        }
    })
}

export async function upsertAvailableSlotRepo(hostId: number, eventTypeId: number, startAt: Date, endAt: Date) {
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

export async function getAllFutureSlotsForEventRepo(eventTypeId: number, fromDate: Date) {
    return prisma.slot.findMany({
        where: {
            eventTypeId,
            startAt: { gte: fromDate }
        }
    });
}

export async function deleteSlotRepo(id: string) {
    return prisma.slot.delete({
        where: { id }
    });
}

export async function updateSlotStatusRepo(id: string, status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED') {
    return prisma.slot.update({
        where: { id },
        data: { status }
    });
}


export async function findSlotById(id: string, db?: DbClient) {
    const client = getDbClient(db);

    return client.slot.findUnique({
        where: { id },
    });
}

export async function markSlotBookedIfAvailable(id: string, db?: DbClient) {
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

export async function lockSlotForUpdate(id: string, db?: DbClient) {
    const client = getDbClient(db);

    return client.$queryRaw<{ id: string }[]>`
        SELECT id
        FROM slots
        WHERE id = ${id}
        FOR UPDATE
    `;
}

export async function markSlotBooked(id: string, db?: DbClient) {
    const client = getDbClient(db);

    return client.slot.update({
        where: { id },
        data: { status: "BOOKED" },
    });

}