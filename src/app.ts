import express, { Express } from 'express';
const app: Express = express();
import userRouter from './routes/user.routes.js';
import eventTypesRouter from './routes/event-types.routes.js';
import availabilityRouter from './routes/availability.routes.js';
import { publicEventRouter } from './routes/public-event.routes.js';
import bookingRouter from './routes/booking.routes.js';
import { errorHandler } from './middlewares/error-handler.js';
import googleRouter from './routes/google.routes.js';
import authRouter from './routes/auth.routes.js';

app.set("trust proxy", 1);

app.use(express.json({ limit: "1mb" }));
app.use(express.text({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

const allowedOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

// Dynamic CORS Middleware (allows configured FRONTEND_URL(s) and local dev origins)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin || "*");
    }
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-user-id");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
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