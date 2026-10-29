import { type DbClient } from "./db-client.js";
export declare function getAllBookedSlotsByHostInRangeRepo(hostId: number, startDate: Date, endDate: Date): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    startAt: Date;
    endAt: Date;
    status: string;
}[]>;
export declare function upsertAvailableSlotRepo(hostId: number, eventTypeId: number, startAt: Date, endAt: Date): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    startAt: Date;
    endAt: Date;
    status: string;
}>;
export declare function getAllFutureSlotsForEventRepo(eventTypeId: number, fromDate: Date): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    startAt: Date;
    endAt: Date;
    status: string;
}[]>;
export declare function deleteSlotRepo(id: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    startAt: Date;
    endAt: Date;
    status: string;
}>;
export declare function updateSlotStatusRepo(id: string, status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED'): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    startAt: Date;
    endAt: Date;
    status: string;
}>;
export declare function findSlotById(id: string, db?: DbClient): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    startAt: Date;
    endAt: Date;
    status: string;
} | null>;
export declare function markSlotBookedIfAvailable(id: string, db?: DbClient): Promise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
export declare function lockSlotForUpdate(id: string, db?: DbClient): Promise<{
    id: string;
}[]>;
export declare function markSlotBooked(id: string, db?: DbClient): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    startAt: Date;
    endAt: Date;
    status: string;
}>;
//# sourceMappingURL=slots.repository.d.ts.map