import { z } from 'zod';
export const bookingSchema = z.object({
    slotId: z.string(),
    inviteeEmail: z.email("Email is required"),
    inviteeNotes: z.string().optional(),
    inviteeName: z.string(),
});
//# sourceMappingURL=booking.dto.js.map