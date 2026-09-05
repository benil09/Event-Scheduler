export declare function findUserByEmail(email: string): Promise<{
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    id: number;
    passwordHash: string | null;
    isVerified: boolean;
    otpCode: string | null;
    otpExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare function createUnverifiedHostUser(data: {
    name: string;
    email: string;
    slug: string;
    passwordHash: string;
    otpCode: string;
    otpExpiresAt: Date;
}): Promise<{
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    id: number;
    passwordHash: string | null;
    isVerified: boolean;
    otpCode: string | null;
    otpExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateUserOtpAndCredentials(id: number, data: {
    name?: string;
    passwordHash?: string;
    otpCode: string;
    otpExpiresAt: Date;
}): Promise<{
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    id: number;
    passwordHash: string | null;
    isVerified: boolean;
    otpCode: string | null;
    otpExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function markUserVerified(id: number): Promise<{
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    id: number;
    passwordHash: string | null;
    isVerified: boolean;
    otpCode: string | null;
    otpExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=auth.repository.d.ts.map