
import { createEventTypeRepo, deleteEventTypeRepo, findActiveByHostIdAndEventSlug, findEventTypeByEventIdRepo, getEventTypesByUserIdRepo, slugExistsForHost, updateEventTypeRepo } from "../repositories/event-type.repository.js";
import { CreateEventTypeDto,UpdateEventTypeDto } from "../dtos/event-type.dto.js";
import slug from "slug";
import { conflict, forbidden, notFound } from "../utils/api-error.js";
import { getUserById } from "../repositories/user.repository.js";
import { regenerateHostSlotsWorkflow } from "../temporal/client.js";


export async function getEventTypesByUserIdService (hostId: number){
    const response = await getEventTypesByUserIdRepo(hostId);
    return response;
}

export async function getEventTypeByEventIdService(eventId:number){
    const eventType = await findEventTypeByEventIdRepo(eventId);
    if(!eventType){
        throw notFound("Event not found");
    }
    return eventType;
}

export async function createEventTypeService(hostId:number,data:CreateEventTypeDto){
    const slugPassed = data.slug ?? slug(data.title,{lower:true})

    if(!slugPassed){
        throw conflict("could not generate slug");
    }
    const isSlugTaken = await slugExistsForHost(hostId , slugPassed)

    if(isSlugTaken){
        throw conflict("slug is already taken , please try another")
    }
    const eventType =  createEventTypeRepo(hostId,{...data ,slug:slugPassed})
    await regenerateHostSlotsWorkflow({hostId})
    
    return eventType;

}

export async function updateEventTypeService(eventId:number , data:UpdateEventTypeDto , hostId:number){
    const eventType = await findEventTypeByEventIdRepo(eventId);
    if(!eventType){
        throw notFound("Event not found");
    }

    if(eventType.hostId !== hostId){
        throw forbidden("Unauthorized");
    }

    if(data.slug && data.slug !== eventType.slug) {
        const isSlugTaken = await slugExistsForHost(hostId, data.slug);
        if(isSlugTaken) {
            throw conflict('A event type with this slug already exists, please use a different slug');
        }
    }

    return updateEventTypeRepo(eventId,data);

}

export async function deleteEventTypeService(hostId:number , eventId:number){
    const eventType = await findEventTypeByEventIdRepo(eventId);

    if(!eventType){
        throw notFound("event not found with the given id");
    }

    if(eventType.hostId !== hostId) {
        throw forbidden('You are not authorized to view this event type');
    }
    return await deleteEventTypeRepo(eventId);
}

export async function getEventTypePublic(EventSlug:string , hostId:number){
        
    const eventType = await findActiveByHostIdAndEventSlug(hostId , EventSlug);

    if(!eventType){
        throw notFound("Event Type not found");
    }
    const host = await getUserById(hostId);
    if(!host){
         throw notFound("Host not found");
    }
    return {
        eventType:{
            id:eventType.id,
            title:eventType.title,
            description:eventType.description,
            locationType:eventType.locationType,
            durationMin:eventType.durationMin,
        },
        host:{
            name:host.name,
            email:host.Email
        }
    }

}
