import express,{Express} from 'express'
const app:Express = express();
import userRouter from './routes/user.routes.js';
import eventTypesRouter from './routes/event-types.routes.js';
import availabilityRouter from './routes/availability.routes.js';
import { publicEventRouter } from './routes/public-event.routes.js';
import bookingRouter from './routes/booking.routes.js';
import { errorHandler } from './middlewares/error-handler.js';




app.use(express.json()); // <-- this will help express to deserialize the request body (JSON) into a JavaScript object (i.e. helps express to read the data that what type of data is coming)
app.use(express.text());
app.use(express.urlencoded());

// CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-user-id");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});



app.get("/health",(_req,res)=>{
        res.json({
            status:'ok',
            timestamp:new Date().toISOString()
        })
})

app.use("/api/users",userRouter);// if the route starts with users the express app will handle it 
app.use("/api/event-types", eventTypesRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/public", publicEventRouter);
app.use("/api/bookings", bookingRouter);
app.use(errorHandler);
export { app };