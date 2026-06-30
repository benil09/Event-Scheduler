import {z} from 'zod'


export const createUserSchema = z.object({
    Email: z.email("invalid email address"),
    name:  z.string().min(1,"Name is required").max(100,'name should not exceed 100 char')
})


export type createUserDto = z.infer<typeof createUserSchema>


export const updateUserSchema = createUserSchema.partial().refine(
    (data)=>
     data.Email !== undefined || data.name !== undefined,
    {"message":"At least one field is required"}
);




export type updateUserDto = z.infer<typeof updateUserSchema>;