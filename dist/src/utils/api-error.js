export class ApiError extends Error {
    statusCode;
    details;
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = "ApiError";
        Error.captureStackTrace(this, this.constructor);
    }
}
export const badRequest = (message, details) => new ApiError(400, message, details);
export const notFound = (message, details) => new ApiError(404, message, details);
export const internalServerError = (message = "Internal server error") => new ApiError(500, message);
export const unauthorized = (message, details) => new ApiError(401, message, details);
export const forbidden = (message, details) => new ApiError(403, message, details);
export const conflict = (message, details) => new ApiError(409, message, details);
//# sourceMappingURL=api-error.js.map