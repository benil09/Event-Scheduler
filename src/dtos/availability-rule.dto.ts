import {z} from 'zod'


const timeRegex = /^([0-1]?\d|2[0-3]):[0-5]\d$/;
const dateRegex = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/;

export const createAvailabilityRuleBaseSchema = z.object({
    weekday:z.number().int().min(0).max(6),
    startTime:z.string().regex(timeRegex,"invalid time format HH:MM"),
    endTime:z.string().regex(timeRegex,"invalid time format HH:MM"),
    isActive:z.boolean().default(true),
    timezone:z.string().default("UTC"),
})
    
// Problem -> Anybody could come and set the start time which is greater than the end time 
// this is not ideal so we need to fix this -> using .refine() function 

export const createAvailabilityRuleSchema = createAvailabilityRuleBaseSchema.refine(
    (rule) => rule.startTime <= rule.endTime,
    {
        message: "End time must be after start time",
        path: ["endTime"],
    }
);

export const updateAvailabilityRuleBaseSchema = createAvailabilityRuleBaseSchema.partial().refine(
    (rule) => {
        if (rule.startTime && rule.endTime) {
            return rule.startTime <= rule.endTime;
        }
        return true;
    },
    {
        message: "End time must be after start time",
        path: ["endTime"],
    }
);

export const createAvailabilityExceptionObject = z.object({
    date: z.string().regex(dateRegex, "invalid date format YYYY-MM-DD"),
    type: z.enum(["BLOCK_FULL_DAY", "BLOCK_PARTIAL", "ADD_AVAILABLE_WINDOW"]),
    startTime: z.string().regex(timeRegex, "invalid time format HH:MM").optional(),
    endTime: z.string().regex(timeRegex, "invalid time format HH:MM").optional(),
    timezone: z.string().default("UTC"),
    reason: z.string().max(500).optional(),
});

export const createAvailabilityExceptionBaseSchema = createAvailabilityExceptionObject.superRefine((data, ctx) => {
    if (data.type !== "BLOCK_FULL_DAY") {
        if (!data.startTime || !data.endTime) {
            ctx.addIssue({
                code: "custom",
                message: "Start time and end time are required for partial/add types",
                path: ["startTime", "endTime"],
            });
        } else {
            if (data.startTime >= data.endTime) {
                ctx.addIssue({
                    code: "custom",
                    message: "End time must be after start time",
                    path: ["endTime"],
                });
            }
        }
    }
});

export const updateExceptionSchema = createAvailabilityExceptionObject.partial().superRefine((data, ctx) => {
    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
        ctx.addIssue({
            code: "custom",
            message: "End time must be after start time",
            path: ["endTime"],
        });
    }
});

export type CreateAvailabilityRuleDto = z.infer<typeof createAvailabilityRuleBaseSchema>;
export type UpdateAvailabilityRuleDto = z.infer<typeof updateAvailabilityRuleBaseSchema>;
export type createAvailabilityExceptionDto = z.infer<typeof createAvailabilityExceptionBaseSchema>;
export type UpdateExceptionDto = z.infer<typeof updateExceptionSchema>;
