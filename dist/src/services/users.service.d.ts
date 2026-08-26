import { createUserDto, updateUserDto } from "../dtos/user.dto.js";
export declare function getAllUsersService(): Promise<{
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function getUserByIdService(id: number): Promise<{
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const createUserService: (data: createUserDto) => Promise<{
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateUserService: (id: number, data: updateUserDto) => Promise<{
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteUserService: (id: number) => Promise<{
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=users.service.d.ts.map