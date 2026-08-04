import { redis } from "../config/redis.js";
import { exchangeSetupCode } from "../services/googleCalneder.service.js"
import { Request, Response } from "express";



export async function handleGoogleCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    const { refreshToken, email, name, avatar } = await exchangeSetupCode(code);
    await redis.set('GOOGLE_REFRESH_TOKEN', refreshToken);

    res.status(200).json({
        success: true,
        data: {
            email,
            refreshToken,
            name,
            avatar
        }

    })
}
