export declare function isGoogleCalendarConfigured(): boolean;
export declare function getOauthClient(): import("googleapis-common").OAuth2Client;
export declare function getSetupAuthUrl(frontendOrigin?: string): string;
export declare function exchangeSetupCode(code: string): Promise<{
    email: string;
    avatar: string;
    name: string;
}>;
export declare function getGoogleCalendarClient(userId?: number): Promise<import("googleapis-common").OAuth2Client>;
export declare function createGoogleCalenderEvent(bookingId: number): Promise<import("googleapis").calendar_v3.Schema$Event>;
//# sourceMappingURL=googleCalneder.service.d.ts.map