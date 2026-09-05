import { prisma } from "../config/database.js";
export async function getEventTypesByUserIdRepo(hostId) {
    const response = await prisma.eventTypes.findMany({
        where: {
            hostId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return response;
}
export async function findEventTypeByEventIdRepo(id) {
    const eventType = await prisma.eventTypes.findUnique({
        where: {
            id
        }
    });
    return eventType;
}
export async function createEventTypeRepo(hostId, data) {
    const newEvent = await prisma.eventTypes.create({
        data: {
            ...data,
            hostId
        }
    });
    return newEvent;
}
export async function updateEventTypeRepo(eventId, data) {
    const updateEvent = await prisma.eventTypes.update({
        where: { id: eventId },
        data: data
    });
    return updateEvent;
}
export async function deleteEventTypeRepo(eventId) {
    const deleteEvent = await prisma.eventTypes.delete({
        where: { id: eventId }
    });
    return deleteEvent;
}
export async function findByHostAndSlug(hostId, slug) {
    const eventType = await prisma.eventTypes.findFirst({
        where: {
            hostId,
            slug
        }
    });
    return eventType;
}
export async function findActiveByHostIdAndEventSlug(hostId, slug) {
    return await prisma.eventTypes.findFirst({
        where: {
            hostId,
            slug,
            isActive: true
        }
    });
}
export async function slugExistsGlobal(slug) {
    const count = await prisma.eventTypes.count({
        where: {
            slug
        }
    });
    return count > 0;
}
export async function slugExistsForHost(hostId, slug) {
    const count = await prisma.eventTypes.count({
        where: {
            hostId,
            slug
        }
    });
    return count > 0;
}
export async function findActiveEventTypesByHost(hostId) {
    const eventTypes = await prisma.eventTypes.findMany({
        where: {
            hostId,
            isActive: true,
        }
    });
    return eventTypes;
}
//# sourceMappingURL=event-type.repository.js.map