import { z } from 'zod';
export declare const bookingSchema: z.ZodObject<{
    slotId: z.ZodString;
    inviteeEmail: z.ZodEmail;
    inviteeNotes: z.ZodOptional<z.ZodString>;
    inviteeName: z.ZodString;
}, z.core.$strip>;
export type CreateBookingDto = z.infer<typeof bookingSchema>;
//# sourceMappingURL=booking.dto.d.ts.map