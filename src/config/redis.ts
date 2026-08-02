import { createClient } from "redis";
// import { REDIS_HOST, REDIS_PORT } from "./env.js";
import { REDIS_URI } from "./env.js";

export const redis = await createClient({
    url: REDIS_URI,
})

redis.on("error", (err) => {
    console.error("Redis Client Error:", err);
});

export async function connectRedis() {
    await redis.connect();
    console.log("[Redis] Redis Connected");
}