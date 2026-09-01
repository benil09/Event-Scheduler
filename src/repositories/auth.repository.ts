import { prisma } from "../config/database.js";

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { Email: email },
  });
}

export async function createUnverifiedHostUser(data: {
  name: string;
  email: string;
  slug: string;
  passwordHash: string;
  otpCode: string;
  otpExpiresAt: Date;
}) {
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

export async function updateUserOtpAndCredentials(
  id: number,
  data: {
    name?: string;
    passwordHash?: string;
    otpCode: string;
    otpExpiresAt: Date;
  }
) {
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

export async function markUserVerified(id: number) {
  return await prisma.user.update({
    where: { id },
    data: {
      isVerified: true,
      otpCode: null,
      otpExpiresAt: null,
    },
  });
}
