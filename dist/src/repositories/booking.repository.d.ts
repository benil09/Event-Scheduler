import { type DbClient } from "./db-client.js";
export interface CreateBookingData {
    slotId: string;
    inviteeEmail: string;
    inviteeName: string;
    inviteeNotes?: string;
    hostId: number;
    eventTypeId: number;
}
export declare function createBooking(data: CreateBookingData, db?: DbClient): Promise<{
    slot: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hostId: number;
        eventTypeId: number;
        startAt: Date;
        endAt: Date;
        status: string;
    };
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    status: string;
    slotId: string;
    inviteeEmail: string;
    inviteeNote: string | null;
    inviteeName: string | null;
    meetLink: string | null;
    calenderEventId: string | null;
    cancelledAt: Date | null;
}>;
export declare function getBookingsByHost(hostId: number, db?: DbClient): Promise<({
    slot: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hostId: number;
        eventTypeId: number;
        startAt: Date;
        endAt: Date;
        status: string;
    };
    eventType: {
        slug: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        locationType: string;
        locationValue: string | null;
        durationMin: number;
        isActive: boolean;
        bufferBeforeMin: number;
        bufferAfterMin: number;
        hostId: number;
    };
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    status: string;
    slotId: string;
    inviteeEmail: string;
    inviteeNote: string | null;
    inviteeName: string | null;
    meetLink: string | null;
    calenderEventId: string | null;
    cancelledAt: Date | null;
})[]>;
export declare function findBookingById(bookingId: number): Promise<({
    host: {
        Email: string;
        name: string;
        slug: string;
        timezone: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    };
    slot: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        hostId: number;
        eventTypeId: number;
        startAt: Date;
        endAt: Date;
        status: string;
    };
    eventType: {
        slug: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        locationType: string;
        locationValue: string | null;
        durationMin: number;
        isActive: boolean;
        bufferBeforeMin: number;
        bufferAfterMin: number;
        hostId: number;
    };
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    status: string;
    slotId: string;
    inviteeEmail: string;
    inviteeNote: string | null;
    inviteeName: string | null;
    meetLink: string | null;
    calenderEventId: string | null;
    cancelledAt: Date | null;
}) | null>;
export declare function deleteBookingRepo(bookingId: number): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    hostId: number;
    eventTypeId: number;
    status: string;
    slotId: string;
    inviteeEmail: string;
    inviteeNote: string | null;
    inviteeName: string | null;
    meetLink: string | null;
    calenderEventId: string | null;
    cancelledAt: Date | null;
}>;
//# sourceMappingURL=booking.repository.d.ts.map