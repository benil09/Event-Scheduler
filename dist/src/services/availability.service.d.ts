import { CreateAvailabilityRuleDto, UpdateAvailabilityRuleDto, createAvailabilityExceptionDto, UpdateExceptionDto } from "../dtos/availability-rule.dto.js";
export declare function getAvailabilityRulesByUserService(userId: number): Promise<{
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    weekday: number;
    startTime: string;
    endTime: string;
    userId: number;
}[]>;
export declare function getActiveAvailabilityRulesByUserService(userId: number): Promise<{
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    weekday: number;
    startTime: string;
    endTime: string;
    userId: number;
}[]>;
export declare function createAvailabilityRuleService(userId: number, data: CreateAvailabilityRuleDto): Promise<{
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    weekday: number;
    startTime: string;
    endTime: string;
    userId: number;
}>;
export declare function updateAvailabilityRuleService(id: number, userId: number, data: UpdateAvailabilityRuleDto): Promise<{
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    weekday: number;
    startTime: string;
    endTime: string;
    userId: number;
}>;
export declare function deleteAvailabilityRuleService(id: number, userId: number): Promise<{
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    weekday: number;
    startTime: string;
    endTime: string;
    userId: number;
}>;
export declare function getExceptionsByUserService(userId: number): Promise<{
    type: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    startTime: string | null;
    endTime: string | null;
    reason: string | null;
    userId: number;
}[]>;
export declare function createExceptionService(userId: number, data: createAvailabilityExceptionDto): Promise<{
    type: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    startTime: string | null;
    endTime: string | null;
    reason: string | null;
    userId: number;
}>;
export declare function updateExceptionService(id: number, userId: number, data: UpdateExceptionDto): Promise<{
    type: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    startTime: string | null;
    endTime: string | null;
    reason: string | null;
    userId: number;
}>;
export declare function deleteExceptionService(id: number, userId: number): Promise<{
    type: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    startTime: string | null;
    endTime: string | null;
    reason: string | null;
    userId: number;
}>;
export declare function getExceptionsByUserInRangeService(userId: number, startDate: Date, endDate: Date): Promise<{
    type: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    startTime: string | null;
    endTime: string | null;
    reason: string | null;
    userId: number;
}[]>;
//# sourceMappingURL=availability.service.d.ts.map