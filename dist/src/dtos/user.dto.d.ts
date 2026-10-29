import { z } from 'zod';
export declare const createUserSchema: z.ZodObject<{
    Email: z.ZodEmail;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type createUserDto = z.infer<typeof createUserSchema>;
export declare const updateUserSchema: z.ZodObject<{
    Email: z.ZodOptional<z.ZodEmail>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    timezone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type updateUserDto = z.infer<typeof updateUserSchema>;
//# sourceMappingURL=user.dto.d.ts.map