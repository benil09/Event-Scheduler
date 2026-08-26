import { z } from 'zod';
export const createEventTypeSchema = z.object({
    title: z.string().min(1, "Title cannot be empty").max(100, "Title cannot exceed 100 characters"),
    description: z.string().max(1000).optional(),
    locationType: z.enum(['online', 'in-person']).default('online'),
    locationValue: z.string().optional(),
    durationMin: z.number().min(15).max(120).default(30),
    isActive: z.boolean().default(true),
    bufferBeforeMin: z.number().optional(),
    bufferAfterMin: z.number().optional(),
    slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens").optional()
});
export const updateEventTypeSchema = createEventTypeSchema.partial();
//# sourceMappingURL=event-type.dto.js.map