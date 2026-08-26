import { prisma } from "../config/database.js";
export async function getAvailabilityRulesByUserRepo(userId) {
    const rules = await prisma.availabilityRule.findMany({
        where: {
            userId: userId
        },
        orderBy: [{ weekday: "asc" }, { startTime: "asc" }],
    });
    return rules;
}
export async function getActiveAvailabilityRulesByUser(userId) {
    const rules = await prisma.availabilityRule.findMany({
        where: {
            userId: userId,
            isActive: true,
        },
        orderBy: [{ weekday: "asc" }, { startTime: "asc" }],
    });
    return rules;
}
export async function getAvailabilityRuleById(id) {
    const rule = await prisma.availabilityRule.findUnique({
        where: {
            id
        }
    });
    return rule;
}
export async function createAvailabilityRuleRepo(userId, data) {
    const response = await prisma.availabilityRule.create({
        data: {
            userId,
            ...data,
        }
    });
    return response;
}
export async function updateAvailabilityRuleRepo(id, data) {
    const response = await prisma.availabilityRule.update({
        where: {
            id
        },
        data: data
    });
    return response;
}
export async function removeAvailabilityRuleRepo(id) {
    const response = await prisma.availabilityRule.delete({
        where: {
            id
        }
    });
    return response;
}
export async function findExceptionByUser(userId) {
    return prisma.availabilityException.findMany({
        where: { userId },
        orderBy: { date: "asc" },
    });
}
export async function findExceptionById(id) {
    const response = await prisma.availabilityException.findUnique({
        where: {
            id
        }
    });
    return response;
}
export async function createException(userId, data) {
    const { date, ...rest } = data;
    const response = await prisma.availabilityException.create({
        data: {
            userId,
            ...rest,
            date: new Date(`${date}T00:00:00.000Z`),
        }
    });
    return response;
}
export async function updateException(id, data) {
    const { date, ...rest } = data;
    const response = await prisma.availabilityException.update({
        where: {
            id
        }, data: {
            ...rest,
            ...(date !== undefined && { date: new Date(`${date}T00:00:00.000Z`) }),
        }
    });
    return response;
}
export async function removeException(id) {
    const response = await prisma.availabilityException.delete({
        where: {
            id
        }
    });
    return response;
}
export async function findExceptionByUserInRange(userId, startDate, endDate) {
    const response = await prisma.availabilityException.findMany({
        where: {
            userId: userId,
            date: {
                gte: startDate,
                lte: endDate
            }
        },
        orderBy: {
            date: 'asc'
        }
    });
    return response;
}
//# sourceMappingURL=availabilityRule.repository.js.map