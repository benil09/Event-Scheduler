import { z } from 'zod';
export const createUserSchema = z.object({
    Email: z.email("invalid email address"),
    name: z.string().min(1, "Name is required").max(100, 'name should not exceed 100 char'),
    slug: z.string().min(1, "Slug is required").max(100, 'slug should not exceed 100 char').optional(),
    timezone: z.string().min(1, "Timezone is required").optional()
});
export const updateUserSchema = createUserSchema.partial().refine((data) => data.Email !== undefined || data.name !== undefined, { "message": "At least one field is required" });
//# sourceMappingURL=user.dto.js.map