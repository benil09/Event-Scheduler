import express from 'express';
const app = express();
import userRouter from './routes/user.routes.js';
import eventTypesRouter from './routes/event-types.routes.js';
import availabilityRouter from './routes/availability.routes.js';
import { publicEventRouter } from './routes/public-event.routes.js';
import bookingRouter from './routes/booking.routes.js';
import { errorHandler } from './middlewares/error-handler.js';
import googleRouter from './routes/google.routes.js';
import authRouter from './routes/auth.routes.js';
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
// Dynamic CORS Middleware for dev Vite ports
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-user-id");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});
app.get("/health", (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/event-types", eventTypesRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/public", publicEventRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/auth/google", googleRouter);
app.use("/api/integrations/google", googleRouter);
app.use(errorHandler);
export { app };
//# sourceMappingURL=app.js.map