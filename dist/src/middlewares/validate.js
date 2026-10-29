import { badRequest } from "../utils/api-error.js";
export const validate = (schema) => (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        throw badRequest("Validation failed", result.error.issues);
    }
    // validation passes
    req.body = result.data;
    next();
};
//# sourceMappingURL=validate.js.map