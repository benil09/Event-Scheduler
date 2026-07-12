import {app} from "./app.js"
import dotenv from 'dotenv'
import { PORT } from './config/env.js';
// import { connect } from "node:http2";
import { connectDB } from "./config/database.js";

dotenv.config()

// const port = process.env.PORT

async function startServer() {
    await connectDB();
    app.listen(PORT, async () => {
        console.log(`[Server]  server is  running on port ${PORT}`);
    });
}

startServer().catch((error)=>{
        console.log("[Server] Error connecting the server : ",error);
        process.exit(1);
})