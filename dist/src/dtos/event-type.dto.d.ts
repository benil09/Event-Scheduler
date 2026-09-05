import { z } from 'zod';
export declare const createEventTypeSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    locationType: z.ZodDefault<z.ZodEnum<{
        online: "online";
        "in-person": "in-person";
    }>>;
    locationValue: z.ZodOptional<z.ZodString>;
    durationMin: z.ZodDefault<z.ZodNumber>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    bufferBeforeMin: z.ZodOptional<z.ZodNumber>;
    bufferAfterMin: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateEventTypeDto = z.infer<typeof createEventTypeSchema>;
export declare const updateEventTypeSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    locationType: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        online: "online";
        "in-person": "in-person";
    }>>>;
    locationValue: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    durationMin: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    bufferBeforeMin: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    bufferAfterMin: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type UpdateEventTypeDto = z.infer<typeof updateEventTypeSchema>;
//# sourceMappingURL=event-type.dto.d.ts.map