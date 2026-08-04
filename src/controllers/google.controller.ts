import { redis } from "../config/redis.js";
import { exchangeSetupCode } from "../services/googleCalneder.service.js"
import { Request, Response } from "express";



export async function handleGoogleCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    const { email, name, avatar } = await exchangeSetupCode(code);
    const refresh_token =await redis.get('GOOGLE_REFRESH_TOKEN')
    console.log(refresh_token)

    res.status(200).json({
        success: true,
        data: {
            email,
            name,
            avatar
        }

    })
}
