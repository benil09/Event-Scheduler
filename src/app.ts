import express,{Express} from 'express'
const app:Express = express();
import userRouter from "./router/user.routes.js"




app.use(express.json()); // <-- this will help express to deserialize the request body (JSON) into a JavaScript object (i.e. helps express to read the data that what type of data is coming)
app.use(express.text());
app.use(express.urlencoded());


app.get("/health",(_req,res)=>{
        res.json({
            status:'ok',
            timestamp:new Date().toISOString()
        })
})

app.use("/users",userRouter);// if the route starts with users the express app will handle it 
export { app };