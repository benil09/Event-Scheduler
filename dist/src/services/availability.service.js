import { getAvailabilityRulesByUserRepo, getActiveAvailabilityRulesByUser, getAvailabilityRuleById, createAvailabilityRuleRepo, updateAvailabilityRuleRepo, removeAvailabilityRuleRepo, findExceptionByUser, findExceptionById, createException, updateException, removeException, findExceptionByUserInRange } from "../repositories/availabilityRule.repository.js";
import { forbidden, notFound } from "../utils/api-error.js";
import { getUserById } from "../repositories/user.repository.js";
import { regenerateHostSlotsWorkflow } from "../temporal/client.js";
// Helper function to verify user existence
async function verifyUserExists(userId) {
    const user = await getUserById(userId);
    if (!user) {
        throw notFound("User not found");
    }
}
// Get all availability rules for a user
export async function getAvailabilityRulesByUserService(userId) {
    await verifyUserExists(userId);
    return await getAvailabilityRulesByUserRepo(userId);
}
// Get active availability rules for a user
export async function getActiveAvailabilityRulesByUserService(userId) {
    await verifyUserExists(userId);
    return await getActiveAvailabilityRulesByUser(userId);
}
// Create an availability rule
export async function createAvailabilityRuleService(userId, data) {
    await verifyUserExists(userId);
    const result = await createAvailabilityRuleRepo(userId, data);
    try {
        await regenerateHostSlotsWorkflow({ hostId: userId });
    }
    catch (temporalErr) {
        console.warn("Temporal workflow trigger skipped or failed:", temporalErr);
    }
    return result;
}
// Update an availability rule
export async function updateAvailabilityRuleService(id, userId, data) {
    const rule = await getAvailabilityRuleById(id);
    if (!rule) {
        throw notFound("Availability rule not found");
    }
    if (rule.userId !== userId) {
        throw forbidden("Unauthorized");
    }
    const result = await updateAvailabilityRuleRepo(id, data);
    try {
        await regenerateHostSlotsWorkflow({ hostId: userId });
    }
    catch (temporalErr) {
        console.warn("Temporal workflow trigger skipped or failed:", temporalErr);
    }
    return result;
}
// Delete an availability rule
export async function deleteAvailabilityRuleService(id, userId) {
    const rule = await getAvailabilityRuleById(id);
    if (!rule) {
        throw notFound("Availability rule not found");
    }
    if (rule.userId !== userId) {
        throw forbidden("Unauthorized");
    }
    const result = await removeAvailabilityRuleRepo(id);
    try {
        await regenerateHostSlotsWorkflow({ hostId: userId });
    }
    catch (temporalErr) {
        console.warn("Temporal workflow trigger skipped or failed:", temporalErr);
    }
    return result;
}
// Get all exceptions for a user
export async function getExceptionsByUserService(userId) {
    await verifyUserExists(userId);
    return await findExceptionByUser(userId);
}
// Create an exception
export async function createExceptionService(userId, data) {
    await verifyUserExists(userId);
    const result = await createException(userId, data);
    try {
        await regenerateHostSlotsWorkflow({ hostId: userId });
    }
    catch (temporalErr) {
        console.warn("Temporal workflow trigger skipped or failed:", temporalErr);
    }
    return result;
}
// Update an exception
export async function updateExceptionService(id, userId, data) {
    const exception = await findExceptionById(id);
    if (!exception) {
        throw notFound("Exception not found");
    }
    if (exception.userId !== userId) {
        throw forbidden("Unauthorized");
    }
    const result = await updateException(id, data);
    try {
        await regenerateHostSlotsWorkflow({ hostId: userId });
    }
    catch (temporalErr) {
        console.warn("Temporal workflow trigger skipped or failed:", temporalErr);
    }
    return result;
}
// Delete an exception
export async function deleteExceptionService(id, userId) {
    const exception = await findExceptionById(id);
    if (!exception) {
        throw notFound("Exception not found");
    }
    if (exception.userId !== userId) {
        throw forbidden("Unauthorized");
    }
    const result = await removeException(id);
    try {
        await regenerateHostSlotsWorkflow({ hostId: userId });
    }
    catch (temporalErr) {
        console.warn("Temporal workflow trigger skipped or failed:", temporalErr);
    }
    return result;
}
// Get exceptions in range
export async function getExceptionsByUserInRangeService(userId, startDate, endDate) {
    await verifyUserExists(userId);
    return await findExceptionByUserInRange(userId, startDate, endDate);
}
//# sourceMappingURL=availability.service.js.map