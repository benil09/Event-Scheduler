import express,{Express} from 'express'
const app:Express = express();
import userRouter from './routes/user.routes.js';
import eventTypesRouter from './routes/event-types.route.js';
import availabilityRouter from './routes/availability.route.js';
import { publicEventRouter } from './routes/public-event.route.js';
import { errorHandler } from './middlewares/error-handler.js';




app.use(express.json()); // <-- this will help express to deserialize the request body (JSON) into a JavaScript object (i.e. helps express to read the data that what type of data is coming)
app.use(express.text());
app.use(express.urlencoded());


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
app.use(errorHandler);
export { app };