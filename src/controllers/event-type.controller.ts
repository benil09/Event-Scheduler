import { 
    createEventTypeService, 
    deleteEventTypeService, 
    getEventTypePublic, 
    getEventTypesByUserIdService, 
    updateEventTypeService,
    getEventTypeByEventIdService
} from "../services/event-types.service.js";
import { Request, Response } from "express";
import { sendSuccess } from "../utils/api-response.js";
import { badRequest } from "../utils/api-error.js";

// Find all event types of a host/user
export async function getEventsByUser(req: Request, res: Response) {
    const hostId = Number(req.params.hostId);
    if (isNaN(hostId)) {
        throw badRequest("Invalid host ID parameter");
    }
    const response = await getEventTypesByUserIdService(hostId);
    sendSuccess(res, response);
}

// get event by id
export async function getEventTypeById(req: Request, res: Response) {
    const eventId = Number(req.params.eventId);
    if (isNaN(eventId)) {
        throw badRequest("Invalid event ID parameter");
    }
    const response = await getEventTypeByEventIdService(eventId);
    sendSuccess(res, response);
}

// Create a new event type for the authenticated user
export async function createEventType(req: Request, res: Response) {
    const userId = req.userId as number;
    const response = await createEventTypeService(userId, req.body);
    sendSuccess(res, response, 201, "Event type created successfully");
}

// Update an existing event type of the user
export async function updateEventType(req: Request, res: Response) {
    const userId = req.userId as number;
    const eventId = Number(req.params.eventId);
    if (isNaN(eventId)) {
        throw badRequest("Invalid event ID parameter");
    }
    const response = await updateEventTypeService(eventId, req.body, userId);
    sendSuccess(res, response, 200, "Event type updated successfully");
}

// Delete an event type of the user
export async function deleteEventType(req: Request, res: Response) {
    const userId = req.userId as number;
    const eventId = Number(req.params.eventId);
    if (isNaN(eventId)) {
        throw badRequest("Invalid event ID parameter");
    }
    const response = await deleteEventTypeService(eventId, userId);
    sendSuccess(res, response, 200, "Event type deleted successfully");
}

// Get public event details by userId and event slug
export async function getPublicEventType(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const slug = req.params.slug as string;
    if (isNaN(userId)) {
        throw badRequest("Invalid user ID parameter");
    }
    const response = await getEventTypePublic(userId, slug);
    sendSuccess(res, response);
}
