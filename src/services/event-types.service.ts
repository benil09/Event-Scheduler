import { createEventTypeRepo, deleteEventTypeRepo, findActiveByHostIdAndEventSlug, findEventTypeByEventIdRepo, getEventTypesByUserIdRepo, slugExistsGlobal, updateEventTypeRepo } from "../repositories/event-type.repository.js";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dtos/event-type.dto.js";
import slug from "slug";
import { conflict, forbidden, notFound } from "../utils/api-error.js";
import { getUserById } from "../repositories/user.repository.js";
import { regenerateHostSlotsWorkflow } from "../temporal/client.js";
import { prisma } from "../config/database.js";

export async function getEventTypesByUserIdService(hostId: number) {
    const response = await getEventTypesByUserIdRepo(hostId);
    return response;
}

export async function getEventTypeByEventIdService(eventId: number) {
    const eventType = await findEventTypeByEventIdRepo(eventId);
    if (!eventType) {
        throw notFound("Event not found");
    }
    return eventType;
}

export async function getEventTypePublic(userId: number, eventSlug: string) {
    const user = await getUserById(userId);
    if (!user) {
        throw notFound("User not found");
    }

    const eventType = await findActiveByHostIdAndEventSlug(userId, eventSlug);
    if (!eventType) {
        throw notFound("Event type not found or inactive");
    }

    // Fetch available slots for public booking page
    const slots = await prisma.slot.findMany({
        where: {
            eventTypeId: eventType.id,
            status: "AVAILABLE",
            startAt: {
                gte: new Date(),
            },
        },
        orderBy: {
            startAt: "asc",
        },
    });

    return {
        ...eventType,
        host: {
            id: user.id,
            name: user.name,
            Email: user.Email,
            timezone: user.timezone,
        },
        availableSlots: slots,
    };
}

export async function createEventTypeService(hostId: number, data: CreateEventTypeDto) {
    let slugPassed = data.slug ?? slug(data.title, { lower: true });

    if (!slugPassed) {
        throw conflict("Could not generate slug for event type");
    }

    // Check if slug is taken globally
    let isSlugTaken = await slugExistsGlobal(slugPassed);
    if (isSlugTaken) {
        if (!data.slug) {
            // Auto-append host ID to auto-generated slug to make it unique
            slugPassed = `${slugPassed}-${hostId}`;
            isSlugTaken = await slugExistsGlobal(slugPassed);
        }
        if (isSlugTaken) {
            throw conflict("An event type with this URL slug already exists. Please use a different title or slug.");
        }
    }

    try {
        const eventType = await createEventTypeRepo(hostId, { ...data, slug: slugPassed });
        
        try {
            await regenerateHostSlotsWorkflow({ hostId });
        } catch (temporalErr) {
            console.warn("Temporal workflow trigger skipped or failed:", temporalErr);
        }

        return eventType;
    } catch (err: any) {
        if (err.code === 'P2002') {
            throw conflict("An event type with this URL slug already exists. Please choose a different slug.");
        }
        throw err;
    }
}

export async function updateEventTypeService(eventId: number, data: UpdateEventTypeDto, hostId: number) {
    const eventType = await findEventTypeByEventIdRepo(eventId);
    if (!eventType) {
        throw notFound("Event not found");
    }

    if (eventType.hostId !== hostId) {
        throw forbidden("Unauthorized");
    }

    if (data.slug && data.slug !== eventType.slug) {
        const isSlugTaken = await slugExistsGlobal(data.slug);
        if (isSlugTaken) {
            throw conflict('An event type with this slug already exists, please use a different slug');
        }
    }

    const updatedEvent = await updateEventTypeRepo(eventId, data);
    try {
        await regenerateHostSlotsWorkflow({ hostId });
    } catch (temporalErr) {
        console.warn("Temporal workflow trigger skipped or failed:", temporalErr);
    }
    return updatedEvent;
}

export async function deleteEventTypeService(eventId: number, hostId: number) {
    const eventType = await findEventTypeByEventIdRepo(eventId);
    if (!eventType) {
        throw notFound("Event not found");
    }

    if (eventType.hostId !== hostId) {
        throw forbidden("Unauthorized");
    }

    const deletedEvent = await deleteEventTypeRepo(eventId);
    try {
        await regenerateHostSlotsWorkflow({ hostId });
    } catch (temporalErr) {
        console.warn("Temporal workflow trigger skipped or failed:", temporalErr);
    }
    return deletedEvent;
}
