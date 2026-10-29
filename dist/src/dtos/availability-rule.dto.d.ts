import { z } from 'zod';
export declare const createAvailabilityRuleBaseSchema: z.ZodObject<{
    weekday: z.ZodNumber;
    startTime: z.ZodString;
    endTime: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    timezone: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const createAvailabilityRuleSchema: z.ZodObject<{
    weekday: z.ZodNumber;
    startTime: z.ZodString;
    endTime: z.ZodString;
    isActive: z.ZodDefault<z.ZodBoolean>;
    timezone: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const updateAvailabilityRuleBaseSchema: z.ZodObject<{
    weekday: z.ZodOptional<z.ZodNumber>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    timezone: z.ZodOptional<z.ZodDefault<z.ZodString>>;
}, z.core.$strip>;
export declare const createAvailabilityExceptionObject: z.ZodObject<{
    date: z.ZodString;
    type: z.ZodEnum<{
        BLOCK_FULL_DAY: "BLOCK_FULL_DAY";
        BLOCK_PARTIAL: "BLOCK_PARTIAL";
        ADD_AVAILABLE_WINDOW: "ADD_AVAILABLE_WINDOW";
    }>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createAvailabilityExceptionBaseSchema: z.ZodObject<{
    date: z.ZodString;
    type: z.ZodEnum<{
        BLOCK_FULL_DAY: "BLOCK_FULL_DAY";
        BLOCK_PARTIAL: "BLOCK_PARTIAL";
        ADD_AVAILABLE_WINDOW: "ADD_AVAILABLE_WINDOW";
    }>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateExceptionSchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        BLOCK_FULL_DAY: "BLOCK_FULL_DAY";
        BLOCK_PARTIAL: "BLOCK_PARTIAL";
        ADD_AVAILABLE_WINDOW: "ADD_AVAILABLE_WINDOW";
    }>>;
    startTime: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    endTime: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    timezone: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    reason: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateAvailabilityRuleDto = z.infer<typeof createAvailabilityRuleBaseSchema>;
export type UpdateAvailabilityRuleDto = z.infer<typeof updateAvailabilityRuleBaseSchema>;
export type createAvailabilityExceptionDto = z.infer<typeof createAvailabilityExceptionBaseSchema>;
export type UpdateExceptionDto = z.infer<typeof updateExceptionSchema>;
//# sourceMappingURL=availability-rule.dto.d.ts.map