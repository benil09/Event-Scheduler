import {z } from 'zod'


export const createUserSchema = z.object({
    Email: z.email("invalid email address"),
    name:  z.string().min(1,"Name is required").max(100,'name should not exceed 100 char')
})


export type createUserDto = z.infer<typeof createUserSchema>

// export const updateUserSchema = createUserSchema.partial();


export const updateUserSchema = z.object({
    Email: z.email('Invalid email address').optional(),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional(),
}).refine((data) => data.Email !== undefined || data.name !== undefined, {
    message: 'At least one field must be provided',
});

export type updateUserDto = z.infer<typeof updateUserSchema>;