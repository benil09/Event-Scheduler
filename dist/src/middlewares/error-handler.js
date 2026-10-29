import { ApiError } from "../utils/api-error.js";
import { NODE_ENV } from "../config/env.js";
import fs from "fs";
import path from "path";
// the main thing to determine an error-handling middleware is that it should always have 4 args instead of normal middleware
// which have 3 .
export function errorHandler(err, _req, res, _next) {
    const logMsg = `[${new Date().toISOString()}] ${_req.method} ${_req.originalUrl}\nPayload: ${JSON.stringify(_req.body)}\nError: ${err.message}\nDetails: ${JSON.stringify(err.details || err.stack)}\n-------------------\n`;
    try {
        fs.appendFileSync(path.join(process.cwd(), "debug.log"), logMsg);
    }
    catch (e) {
        console.error("Failed to write to debug.log", e);
    }
    if (err instanceof ApiError) {
        const body = {
            success: false,
            message: err.message,
        };
        if (err.details)
            body.details = err.details;
        res.status(err.statusCode).json(body);
        return;
    }
    console.error('[error]', err);
    const body = {
        success: false,
        message: "Something went wrong",
    };
    if (NODE_ENV === 'development')
        body.details = err.stack;
    res.status(500).json(body);
}
//# sourceMappingURL=error-handler.js.map