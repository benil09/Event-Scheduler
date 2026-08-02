import { exchangeSetupCode } from "../services/googleCalneder.service.js"
import { Request, Response } from "express";
import {redis} from '../config/redis.js'


export async function handleGoogleCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    await redis.set('google-calendar-token',code)
    const { refreshToken, email, name, avatar } = await exchangeSetupCode(code);
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
