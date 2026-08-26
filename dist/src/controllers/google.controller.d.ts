import { Request, Response } from "express";
export declare function getGoogleAuthUrl(req: Request, res: Response): Promise<void>;
export declare function handleGoogleCallback(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=google.controller.d.ts.map