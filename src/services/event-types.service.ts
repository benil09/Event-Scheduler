import { createEventTypeRepo, deleteEventTypeRepo, findActiveByHostIdAndEventSlug, findEventTypeByEventIdRepo, getEventTypesByUserIdRepo, slugExistsGlobal, updateEventTypeRepo } from "../repositories/event-type.repository.js";
import { CreateEventTypeDto, UpdateEventTypeDto } from "../dtos/event-type.dto.js";
import slug from "slug";
import { conflict, forbidden, notFound } from "../utils/api-error.js";
import { getUserById } from "../repositories/user.repository.js";
import { regenerateHostSlotsWorkflow } from "../temporal/client.js";
import { regenerateHostSlots } from "./slot.service.js";
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

async function autoGenerateSlotsIfEmpty(userId: number, eventTypeId: number, durationMin: number) {
    const rules = await prisma.availabilityRule.findMany({
        where: { userId, isActive: true },
    });

    const activeRules = rules.length > 0 ? rules : [
        { weekday: 1, startTime: "09:00", endTime: "17:00" },
        { weekday: 2, startTime: "09:00", endTime: "17:00" },
        { weekday: 3, startTime: "09:00", endTime: "17:00" },
        { weekday: 4, startTime: "09:00", endTime: "17:00" },
        { weekday: 5, startTime: "09:00", endTime: "17:00" },
    ];

    const exceptions = await prisma.availabilityException.findMany({
        where: { userId },
    });

    const blockedDates = new Set(
        exceptions
            .filter(e => e.type === "UNAVAILABLE" || e.type === "BLOCK_FULL_DAY")
            .map(e => e.date.toISOString().split("T")[0])
    );

    const now = new Date();
    const newSlots = [];

    for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
        const currentDate = new Date();
        currentDate.setDate(now.getDate() + dayOffset);

        const dateStr = currentDate.toISOString().split("T")[0];
        if (blockedDates.has(dateStr)) continue;

        const weekday = currentDate.getDay(); // 0 = Sunday, 1 = Monday...
        const matchingRules = activeRules.filter(r => r.weekday === weekday);

        for (const rule of matchingRules) {
            const [startH, startM] = rule.startTime.split(":").map(Number);
            const [endH, endM] = rule.endTime.split(":").map(Number);

            let slotStart = new Date(currentDate);
            slotStart.setHours(startH, startM, 0, 0);

            const windowEnd = new Date(currentDate);
            windowEnd.setHours(endH, endM, 0, 0);

            while (slotStart.getTime() + durationMin * 60000 <= windowEnd.getTime()) {
                const slotEnd = new Date(slotStart.getTime() + durationMin * 60000);
                if (slotStart > now) {
                    newSlots.push({
                        hostId: userId,
                        eventTypeId,
                        startAt: slotStart,
                        endAt: slotEnd,
                        status: "AVAILABLE",
                    });
                }
                slotStart = slotEnd;
            }
        }
    }

    if (newSlots.length > 0) {
        await prisma.slot.createMany({
            data: newSlots,
            skipDuplicates: true,
        });
    }
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

    // Fetch all future slots for public booking page (both AVAILABLE and BOOKED/BLOCKED)
    let slots = await prisma.slot.findMany({
        where: {
            eventTypeId: eventType.id,
            startAt: {
                gte: new Date(),
            },
        },
        orderBy: {
            startAt: "asc",
        },
    });

    // Auto-generate slots if empty
    if (slots.length === 0) {
        await autoGenerateSlotsIfEmpty(userId, eventType.id, eventType.durationMin);
        slots = await prisma.slot.findMany({
            where: {
                eventTypeId: eventType.id,
                startAt: {
                    gte: new Date(),
                },
            },
            orderBy: {
                startAt: "asc",
            },
        });
    }

    // Cross-reference active non-cancelled bookings for the HOST across all event types to prevent double-booking
    const activeBookings = await prisma.booking.findMany({
        where: {
            hostId: userId,
            status: { notIn: ["CANCELLED"] },
        },
        include: {
            slot: true,
        },
    });

    const updatedSlots = slots.map(slot => {
        const slotStart = new Date(slot.startAt).getTime();
        const slotEnd = new Date(slot.endAt).getTime();

        const isConflict = activeBookings.some(b => {
            if (!b.slot) return false;
            const bStart = new Date(b.slot.startAt).getTime();
            const bEnd = new Date(b.slot.endAt).getTime();
            return slotStart < bEnd && slotEnd > bStart;
        });

        if (isConflict || slot.status === "BOOKED" || slot.status === "BLOCKED") {
            return { ...slot, status: "BOOKED" };
        }
        return slot;
    });

    return {
        ...eventType,
        host: {
            id: user.id,
            name: user.name,
            Email: user.Email,
            timezone: user.timezone,
        },
        availableSlots: updatedSlots,
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
        
        // Auto-generate slots right after creation
        await autoGenerateSlotsIfEmpty(hostId, eventType.id, eventType.durationMin);

        try {
            await regenerateHostSlotsWorkflow({ hostId });
        } catch (temporalErr) {
            console.warn("Temporal workflow skipped/failed, running direct slot regeneration:", temporalErr);
            await regenerateHostSlots({ hostId });
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
    await autoGenerateSlotsIfEmpty(hostId, updatedEvent.id, updatedEvent.durationMin);

    try {
        await regenerateHostSlotsWorkflow({ hostId });
    } catch (temporalErr) {
        console.warn("Temporal workflow skipped/failed, running direct slot regeneration:", temporalErr);
        await regenerateHostSlots({ hostId });
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
        console.warn("Temporal workflow skipped/failed, running direct slot regeneration:", temporalErr);
        await regenerateHostSlots({ hostId });
    }
    return deletedEvent;
}
