import { exchangeSetupCode } from "../services/googleCalneder.service.js"
import { Request, Response } from "express";



export async function handleGoogleCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    console.log("The code is: ",code)
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
