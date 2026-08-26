import { CreateBookingDto } from "../dtos/booking.dto.js";
export declare function createBookingOptimistically(userId: number, dto: CreateBookingDto): Promise<{
    booking: {
        id: number;
        status: string;
        startAt: string;
        endAt: string;
    };
}>;
export declare function getBookingsByHostService(hostId: number): Promise<({
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
export declare function cancelBookingService(bookingId: number, userId: number): Promise<string>;
//# sourceMappingURL=booking.service.d.ts.map