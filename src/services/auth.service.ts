import bcrypt from 'bcryptjs';
import slug from 'slug';
import { SignupDto, VerifyOtpDto, ResendOtpDto, LoginDto } from '../dtos/auth.dto.js';
import {
  findUserByEmail,
  createUnverifiedHostUser,
  updateUserOtpAndCredentials,
  markUserVerified,
} from '../repositories/auth.repository.js';
import { sendOtpVerificationEmail } from '../mailer/auth.mailer.js';
import { badRequest, conflict, notFound, unauthorized } from '../utils/api-error.js';

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getOtpExpiration(): Date {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
}

export async function signupHostService(data: SignupDto) {
  const email = data.email.toLowerCase().trim();
  const existingUser = await findUserByEmail(email);

  if (existingUser && existingUser.isVerified) {
    throw conflict("An account with this email already exists. Please log in.");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const otpCode = generateOtp();
  const otpExpiresAt = getOtpExpiration();

  let user;
  if (existingUser && !existingUser.isVerified) {
    user = await updateUserOtpAndCredentials(existingUser.id, {
      name: data.name,
      passwordHash,
      otpCode,
      otpExpiresAt,
    });
  } else {
    const baseSlug = slug(data.name, { lower: true }) || 'host';
    const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

    user = await createUnverifiedHostUser({
      name: data.name,
      email,
      slug: uniqueSlug,
      passwordHash,
      otpCode,
      otpExpiresAt,
    });
  }

  // Send verification email
  try {
    await sendOtpVerificationEmail(email, data.name, otpCode);
  } catch (err) {
    console.error('[AuthService] Failed to send OTP email:', err);
  }

  return {
    message: 'Verification code sent to your email.',
    email: user.Email,
    name: user.name,
  };
}

export async function verifyOtpService(data: VerifyOtpDto) {
  const email = data.email.toLowerCase().trim();
  const user = await findUserByEmail(email);

  if (!user) {
    throw notFound("No user found with this email address.");
  }

  if (user.isVerified) {
    return {
      message: "Email is already verified.",
      user: {
        id: user.id,
        name: user.name,
        email: user.Email,
        slug: user.slug,
        isVerified: true,
      },
    };
  }

  if (!user.otpCode || !user.otpExpiresAt) {
    throw badRequest("No active OTP request found. Please request a new code.");
  }

  if (user.otpCode !== data.otp) {
    throw badRequest("Invalid OTP code. Please check and try again.");
  }

  if (new Date() > new Date(user.otpExpiresAt)) {
    throw badRequest("OTP code has expired. Please click 'Resend OTP' to get a new code.");
  }

  const verifiedUser = await markUserVerified(user.id);

  return {
    message: "Email verified successfully!",
    user: {
      id: verifiedUser.id,
      name: verifiedUser.name,
      email: verifiedUser.Email,
      slug: verifiedUser.slug,
      isVerified: true,
    },
  };
}

export async function resendOtpService(data: ResendOtpDto) {
  const email = data.email.toLowerCase().trim();
  const user = await findUserByEmail(email);

  if (!user) {
    throw notFound("No user found with this email address.");
  }

  if (user.isVerified) {
    throw badRequest("Account is already verified. You can log in directly.");
  }

  const otpCode = generateOtp();
  const otpExpiresAt = getOtpExpiration();

  await updateUserOtpAndCredentials(user.id, {
    otpCode,
    otpExpiresAt,
  });

  try {
    await sendOtpVerificationEmail(email, user.name, otpCode);
  } catch (err) {
    console.error('[AuthService] Failed to send OTP email:', err);
  }

  return {
    message: "A new verification code has been sent to your email.",
    email: user.Email,
  };
}

export async function loginHostService(data: LoginDto) {
  const email = data.email.toLowerCase().trim();
  const user = await findUserByEmail(email);

  if (!user) {
    throw unauthorized("Invalid email or password.");
  }

  if (!user.passwordHash) {
    throw badRequest("This account was created with Google Sign-In. Please sign in using Google.");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
  if (!isPasswordValid) {
    throw unauthorized("Invalid email or password.");
  }

  if (!user.isVerified) {
    throw unauthorized("Your email is not verified yet. Please verify the OTP sent to your email.", {
      isUnverified: true,
      email: user.Email,
    });
  }

  return {
    message: "Login successful.",
    user: {
      id: user.id,
      name: user.name,
      email: user.Email,
      slug: user.slug,
      isVerified: user.isVerified,
    },
  };
}
