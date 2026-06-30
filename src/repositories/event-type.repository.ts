import { prisma } from "../config/database.js";
import {CreateEventTypeDto,UpdateEventTypeDto} from "../dtos/event-type.dto.js"

export async function getEventTypesByUserIdRepo(hostId: number) {
    const response = await prisma.eventTypes.findMany({
        where: {
            hostId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return response;
}

export async function findEventTypeByEventIdRepo(id: number) {
    const eventType = await prisma.eventTypes.findUnique({
        where: {
            id
        }
       
    })
     return eventType;
}

export async function createEventTypeRepo(hostId:number, data: CreateEventTypeDto) {
    const newEvent = await prisma.eventTypes.create({
      data : {
        ...data,hostId
      }
    })
    return newEvent;
 }

export async function updateEventTypeRepo(eventId:number,data: UpdateEventTypeDto) {
    const updateEvent = await prisma.eventTypes.update({
        where:{id:eventId},
        data:data
    })
    return updateEvent
 }

export async function deleteEventTypeRepo(eventId: number) { 
    const deleteEvent = await prisma.eventTypes.delete({
        where:{id:eventId}
    })
    return deleteEvent;
}

export async function findByHostAndSlug(hostId: number, slug: string) {
    const response = await prisma.eventTypes.findFirst({
        where : {
            hostId,
            slug
        }
    })
    return response;
}

export async function findActiveByHostIdAndEventSlug(hostId: number, slug: string) { }

export async function slugExistsForHost(hostId: number, slug: string) { 
    
}

export async function findActiveEventTypesByHost(hostId: number) { }
