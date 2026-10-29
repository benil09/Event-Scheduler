import { prisma } from "../config/database.js";
export async function findUserByEmail(email) {
    return await prisma.user.findUnique({
        where: { Email: email },
    });
}
export async function createUnverifiedHostUser(data) {
    return await prisma.user.create({
        data: {
            name: data.name,
            Email: data.email,
            slug: data.slug,
            passwordHash: data.passwordHash,
            otpCode: data.otpCode,
            otpExpiresAt: data.otpExpiresAt,
            isVerified: false,
        },
    });
}
export async function updateUserOtpAndCredentials(id, data) {
    return await prisma.user.update({
        where: { id },
        data: {
            ...(data.name ? { name: data.name } : {}),
            ...(data.passwordHash ? { passwordHash: data.passwordHash } : {}),
            otpCode: data.otpCode,
            otpExpiresAt: data.otpExpiresAt,
            isVerified: false,
        },
    });
}
export async function markUserVerified(id) {
    return await prisma.user.update({
        where: { id },
        data: {
            isVerified: true,
            otpCode: null,
            otpExpiresAt: null,
        },
    });
}
//# sourceMappingURL=auth.repository.js.map