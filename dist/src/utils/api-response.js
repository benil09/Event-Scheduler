export function sendSuccess(res, data, statusCode = 200, message) {
    const body = {
        success: true,
        data
    };
    if (message)
        body.message = message;
    res.status(statusCode).json(body);
}
//# sourceMappingURL=api-response.js.map