import express from "express";
import { createBooking, getBookingsByHost } from "../controllers/booking.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { bookingSchema } from "../dtos/booking.dto.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authenticate, validate(bookingSchema), createBooking);
bookingRouter.get("/", authenticate, getBookingsByHost);

export default bookingRouter;
