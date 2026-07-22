import { createBookingOptimistically, getBookingsByHostService, cancelBookingService } from "../services/booking.service.js";
import { Request, Response } from "express";
import { sendSuccess } from "../utils/api-response.js";



export async function createBooking(req: Request, res: Response) {
    const userId = req.userId as number; // we will get it from headers
    const response = await createBookingOptimistically(userId, req.body); // sending userid and details to the service layer
    sendSuccess(res, response, 201, "Booking created successfully");
}

export async function getBookingsByHost(req: Request, res: Response) {
    const userId = req.userId as number;
    const response = await getBookingsByHostService(userId);
    sendSuccess(res, response, 200, "Bookings retrieved successfully");
}


export async function deleteBooking(req: Request, res: Response) {
    const userId = req.userId as number;
    const bookingId = Number(req.params.id);
    const response = await cancelBookingService(bookingId, userId);
    sendSuccess(res, response, 200, "Booking deleted successfully");
}
