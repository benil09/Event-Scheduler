import express, { Router } from "express";
import { 
    createEventType, 
    deleteEventType, 
    getEventsByUser, 
    updateEventType,
    getEventTypeById
} from "../controllers/event-type.controller.js";
import { validate } from "../middlewares/validate.js";
import { authenticate } from "../middlewares/auth.js";
import { createEventTypeSchema, updateEventTypeSchema } from "../dtos/event-type.dto.js";

const eventTypesRouter:Router = express.Router();

// Get all event types for a specific user (host)
eventTypesRouter.get("/user/:hostId", getEventsByUser); // ✅

// Get event by id
eventTypesRouter.get("/:eventId", getEventTypeById); // ✅

// Create a new event type
eventTypesRouter.post("/", authenticate, validate(createEventTypeSchema), createEventType); //✅

// Update an existing event type
eventTypesRouter.put("/:eventId", authenticate, validate(updateEventTypeSchema), updateEventType); // ✅

// Delete an event type
eventTypesRouter.delete("/:eventId", authenticate, deleteEventType); // ✅

export default eventTypesRouter;
