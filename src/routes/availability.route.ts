import express, { Router } from "express";
import {
    getAvailabilityRulesByUser,
    getActiveAvailabilityRulesByUser,
    createAvailabilityRule,
    updateAvailabilityRule,
    deleteAvailabilityRule,
    getExceptionsByUser,
    createException,
    updateException,
    deleteException,
} from "../controllers/availability.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
    createAvailabilityRuleSchema,
    updateAvailabilityRuleBaseSchema,
    createAvailabilityExceptionBaseSchema,
    updateExceptionSchema
} from "../dtos/availability-rule.dto.js";

const availabilityRouter: Router = express.Router();

availabilityRouter.use(authenticate) // instead of checking everytime , use this

// Rules
availabilityRouter.get("/rules", getAvailabilityRulesByUser);
availabilityRouter.get("/rules/active", getActiveAvailabilityRulesByUser);
availabilityRouter.post("/rules", validate(createAvailabilityRuleSchema), createAvailabilityRule);
availabilityRouter.patch("/rules/:id", validate(updateAvailabilityRuleBaseSchema), updateAvailabilityRule);
availabilityRouter.delete("/rules/:id", deleteAvailabilityRule);


// Exceptions
availabilityRouter.get("/exceptions", getExceptionsByUser);
availabilityRouter.post("/exceptions", validate(createAvailabilityExceptionBaseSchema), createException);
availabilityRouter.patch("/exceptions/:id", validate(updateExceptionSchema), updateException);
availabilityRouter.delete("/exceptions/:id", deleteException);

export default availabilityRouter;
