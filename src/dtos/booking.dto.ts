import { z } from 'zod';

export const bookingSchema = z.object({
    slotId:z.string(),
    eventTypeId: z.number().int().positive(),
    inviteeEmail:z.email("Email is required"),
    inviteeNotes:z.string().optional(),
    inviteeName:z.string(),   
});

export type CreateBookingDto = z.infer<typeof bookingSchema>