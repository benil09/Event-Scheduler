export declare class ApiError extends Error {
    readonly statusCode: number;
    readonly details?: unknown;
    constructor(statusCode: number, message: string, details?: unknown);
}
export declare const badRequest: (message: string, details?: unknown) => ApiError;
export declare const notFound: (message: string, details?: unknown) => ApiError;
export declare const internalServerError: (message?: string) => ApiError;
export declare const unauthorized: (message: string, details?: unknown) => ApiError;
export declare const forbidden: (message: string, details?: unknown) => ApiError;
export declare const conflict: (message: string, details?: unknown) => ApiError;
//# sourceMappingURL=api-error.d.ts.map