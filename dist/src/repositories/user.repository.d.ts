import { createUserDto, updateUserDto } from "../dtos/user.dto.js";
export declare function getAllUsers(): Promise<{
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
}[]>;
export declare function getUserById(id: number): Promise<{
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
export declare function findByEmail(email: string): Promise<{
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
export declare function createUserRep(data: createUserDto & {
    slug: string;
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
export declare function updateUserRep(id: number, data: updateUserDto): Promise<{
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
export declare function deleteUserRep(id: number): Promise<{
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
//# sourceMappingURL=user.repository.d.ts.map