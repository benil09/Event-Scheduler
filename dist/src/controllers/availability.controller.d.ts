import { Request, Response } from "express";
export declare function getAvailabilityRulesByUser(req: Request, res: Response): Promise<void>;
export declare function getActiveAvailabilityRulesByUser(req: Request, res: Response): Promise<void>;
export declare function createAvailabilityRule(req: Request, res: Response): Promise<void>;
export declare function updateAvailabilityRule(req: Request, res: Response): Promise<void>;
export declare function deleteAvailabilityRule(req: Request, res: Response): Promise<void>;
export declare function getExceptionsByUser(req: Request, res: Response): Promise<void>;
export declare function createException(req: Request, res: Response): Promise<void>;
export declare function updateException(req: Request, res: Response): Promise<void>;
export declare function deleteException(req: Request, res: Response): Promise<void>;
export declare function getExceptionsByUserInRange(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=availability.controller.d.ts.map