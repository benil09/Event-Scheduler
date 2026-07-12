import {
    getAvailabilityRulesByUserRepo,
    getActiveAvailabilityRulesByUser,
    getAvailabilityRuleById,
    createAvailabilityRuleRepo,
    updateAvailabilityRuleRepo,
    removeAvailabilityRuleRepo,
    findExceptionByUser,
    findExceptionById,
    createException,
    updateException,
    removeException,
    findExceptionByUserInRange
} from "../repositories/availabilityRule.repository.js";
import {
    CreateAvailabilityRuleDto,
    UpdateAvailabilityRuleDto,
    createAvailabilityExceptionDto,
    UpdateExceptionDto
} from "../dtos/availability-rule.dto.js";
import { forbidden, notFound } from "../utils/api-error.js";
import { getUserById } from "../repositories/user.repository.js";
import { regenerateHostSlotsWorkflow } from "../temporal/client.js";

// Helper function to verify user existence
async function verifyUserExists(userId: number) {
    const user = await getUserById(userId);
    if (!user) {
        throw notFound("User not found");
    }
}

// Get all availability rules for a user
export async function getAvailabilityRulesByUserService(userId: number) {
    await verifyUserExists(userId);
    return await getAvailabilityRulesByUserRepo(userId);
}

// Get active availability rules for a user
export async function getActiveAvailabilityRulesByUserService(userId: number) {
    await verifyUserExists(userId);
    return await getActiveAvailabilityRulesByUser(userId);
}

// Create an availability rule
export async function createAvailabilityRuleService(userId: number, data: CreateAvailabilityRuleDto) {
    await verifyUserExists(userId);
    const result = await createAvailabilityRuleRepo(userId, data);
    await regenerateHostSlotsWorkflow({ hostId: userId });
    return result;
}

// Update an availability rule
export async function updateAvailabilityRuleService(id: number, userId: number, data: UpdateAvailabilityRuleDto) {
    const rule = await getAvailabilityRuleById(id);
    if (!rule) {
        throw notFound("Availability rule not found");
    }
    if (rule.userId !== userId) {
        throw forbidden("Unauthorized");
    }
    const result = await updateAvailabilityRuleRepo(id, data);
    await regenerateHostSlotsWorkflow({ hostId: userId });
    return result;
}

// Delete an availability rule
export async function deleteAvailabilityRuleService(id: number, userId: number) {
    const rule = await getAvailabilityRuleById(id);
    if (!rule) {
        throw notFound("Availability rule not found");
    }
    if (rule.userId !== userId) {
        throw forbidden("Unauthorized");
    }
    const result = await removeAvailabilityRuleRepo(id);
    await regenerateHostSlotsWorkflow({ hostId: userId });
    return result;
}

// Get all exceptions for a user
export async function getExceptionsByUserService(userId: number) {
    await verifyUserExists(userId);
    return await findExceptionByUser(userId);
}

// Create an exception
export async function createExceptionService(userId: number, data: createAvailabilityExceptionDto) {
    await verifyUserExists(userId);
    const result = await createException(userId, data);
    await regenerateHostSlotsWorkflow({ hostId: userId });
    return result;
}

// Update an exception
export async function updateExceptionService(id: number, userId: number, data: UpdateExceptionDto) {
    const exception = await findExceptionById(id);
    if (!exception) {
        throw notFound("Exception not found");
    }
    if (exception.userId !== userId) {
        throw forbidden("Unauthorized");
    }
    const result = await updateException(id, data);
    await regenerateHostSlotsWorkflow({ hostId: userId });
    return result;
}

// Delete an exception
export async function deleteExceptionService(id: number, userId: number) {
    const exception = await findExceptionById(id);
    if (!exception) {
        throw notFound("Exception not found");
    }
    if (exception.userId !== userId) {
        throw forbidden("Unauthorized");
    }
    const result = await removeException(id);
    await regenerateHostSlotsWorkflow({ hostId: userId });
    return result;
}

// Get exceptions in range
export async function getExceptionsByUserInRangeService(userId: number, startDate: Date, endDate: Date) {
    await verifyUserExists(userId);
    return await findExceptionByUserInRange(userId, startDate, endDate);
}
