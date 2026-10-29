import dns from 'node:dns/promises';
import bcrypt from 'bcryptjs';
import slug from 'slug';
import { SignupDto, VerifyOtpDto, ResendOtpDto, LoginDto } from '../dtos/auth.dto.js';
import {
  findUserByEmail,
  createVerifiedHostUser,
  updateUserOtpAndCredentials,
  markUserVerified,
} from '../repositories/auth.repository.js';
import { prisma } from '../config/database.js';
import { redis } from '../config/redis.js';
import { sendOtpVerificationEmail } from '../mailer/auth.mailer.js';
import { badRequest, conflict, notFound, unauthorized } from '../utils/api-error.js';

interface PendingSignup {
  name: string;
  email: string;
  passwordHash: string;
  otpCode: string;
  otpExpiresAt: number; // epoch ms
  createdAt: number;
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getOtpExpiration(): Date {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
}

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'throwawaymail.com',
  'yopmail.com',
  'sharklasers.com',
  'getairmail.com',
]);

/**
 * Validates that an email's domain actually has active Mail Exchange (MX) DNS records.
 * Catches typos and fake/non-existent domains upfront before generating or sending an OTP.
 */
async function verifyEmailDomain(email: string): Promise<void> {
  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) {
    throw badRequest("Invalid email address format.");
  }

  // Instant block for known disposable / burner email domains
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    throw badRequest("Disposable or temporary email addresses are not permitted. Please use a valid email.");
  }

  // Allow local, test, or example domains in development/testing
  const devAllowedDomains = ['localhost', 'example.com', 'test.com'];
  if (devAllowedDomains.includes(domain) || domain.endsWith('.local') || domain.endsWith('.test')) {
    return;
  }

  try {
    const lookupPromise = dns.resolveMx(domain);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('DNS_TIMEOUT')), 8000)
    );
    const mxRecords = await Promise.race([lookupPromise, timeoutPromise]);
    if (!Array.isArray(mxRecords) || mxRecords.length === 0) {
      throw badRequest(`The email domain "@${domain}" has no mail exchange (MX) servers and cannot receive emails.`);
    }
  } catch (err: any) {
    if (err.message === 'DNS_TIMEOUT') {
      // If DNS lookup takes longer than 8s, proceed gracefully without blocking legitimate users
      return;
    }
    if (err.code === 'ENOTFOUND' || err.code === 'ENODATA' || err.code === 'EREFUSED') {
      throw badRequest(`The email domain "@${domain}" does not exist or cannot receive emails. Please check for typos.`);
    }
    console.warn(`[AuthService] DNS check warning for domain ${domain}:`, err.message);
  }
}

/**
 * Sign up a new host.
 * ARCHITECTURAL RULE: The user is NOT pushed to PostgreSQL before email verification.
 * Instead, pending registration data + OTP are safely staged in Redis with a 10-minute TTL.
 */
export async function signupHostService(data: SignupDto) {
  const email = data.email.toLowerCase().trim();

  // 1. Verify that this email is not already registered and verified in PostgreSQL
  const existingUser = await findUserByEmail(email);
  if (existingUser && existingUser.isVerified) {
    throw conflict("An account with this email already exists. Please log in.");
  }

  // 2. Check that the email's domain actually exists and can receive email
  await verifyEmailDomain(email);

  // 3. Prepare credentials and OTP
  const passwordHash = await bcrypt.hash(data.password, 10);
  const otpCode = generateOtp();
  const otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  // 4. Save pending registration in Redis with 10-minute expiration (600s)
  // ZERO database rows are created in PostgreSQL here!
  const pendingData: PendingSignup = {
    name: data.name.trim(),
    email,
    passwordHash,
    otpCode,
    otpExpiresAt,
    createdAt: Date.now(),
  };

  await redis.set(`pending:signup:${email}`, JSON.stringify(pendingData), {
    EX: 600, // 10 minutes
  });

  // 5. Send OTP verification email
  try {
    await sendOtpVerificationEmail(email, data.name, otpCode);
  } catch (err) {
    console.error('[AuthService] Failed to send OTP email:', err);
  }

  return {
    message: 'Verification code sent to your email.',
    email,
    name: data.name,
  };
}

/**
 * Verify OTP submitted by the user.
 * ONLY upon successful verification is the user committed to PostgreSQL!
 */
export async function verifyOtpService(data: VerifyOtpDto) {
  const email = data.email.toLowerCase().trim();

  // 1. Check Redis for active pending signup
  const pendingRaw = await redis.get(`pending:signup:${email}`);

  if (pendingRaw) {
    const pending: PendingSignup = JSON.parse(pendingRaw);

    if (pending.otpCode !== data.otp) {
      throw badRequest("Invalid OTP code. Please check and try again.");
    }

    if (Date.now() > pending.otpExpiresAt) {
      throw badRequest("OTP code has expired. Please click 'Resend OTP' to get a new code.");
    }

    // Check if user was already verified in the meantime
    const existingUser = await findUserByEmail(email);
    if (existingUser && existingUser.isVerified) {
      await redis.del(`pending:signup:${email}`);
      return {
        message: "Email is already verified.",
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.Email,
          slug: existingUser.slug,
          isVerified: true,
        },
      };
    }

    // Generate unique slug for new host
    const baseSlug = slug(pending.name, { lower: true }) || 'host';
    let uniqueSlug = baseSlug;
    const existingSlug = await prisma.user.findUnique({ where: { slug: uniqueSlug } });
    if (existingSlug) {
      uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    let verifiedUser;
    // If an unverified row exists from a legacy signup attempt, update and verify it
    if (existingUser && !existingUser.isVerified) {
      verifiedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: pending.name,
          passwordHash: pending.passwordHash,
          isVerified: true,
          otpCode: null,
          otpExpiresAt: null,
        },
      });
    } else {
      // ONLY NOW: Insert the verified user into PostgreSQL!
      verifiedUser = await createVerifiedHostUser({
        name: pending.name,
        email: pending.email,
        slug: uniqueSlug,
        passwordHash: pending.passwordHash,
      });
    }

    // Evict pending registration from Redis
    await redis.del(`pending:signup:${email}`);

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

  // 2. Fallback for any legacy unverified user records in database
  const user = await findUserByEmail(email);
  if (!user) {
    throw notFound("No pending signup found for this email address. Please sign up first.");
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

/**
 * Resend OTP code for pending signups.
 */
export async function resendOtpService(data: ResendOtpDto) {
  const email = data.email.toLowerCase().trim();

  // Check if account is already verified in DB
  const existingUser = await findUserByEmail(email);
  if (existingUser && existingUser.isVerified) {
    throw badRequest("Account is already verified. You can log in directly.");
  }

  // Check Redis for active pending signup
  const pendingRaw = await redis.get(`pending:signup:${email}`);
  if (!pendingRaw) {
    // Check if legacy DB user exists
    if (existingUser && !existingUser.isVerified) {
      const otpCode = generateOtp();
      const otpExpiresAt = getOtpExpiration();
      await updateUserOtpAndCredentials(existingUser.id, {
        otpCode,
        otpExpiresAt,
      });

      try {
        await sendOtpVerificationEmail(email, existingUser.name, otpCode);
      } catch (err) {
        console.error('[AuthService] Failed to send OTP email:', err);
      }

      return {
        message: "A new verification code has been sent to your email.",
        email: existingUser.Email,
      };
    }

    throw notFound("No pending signup found or the verification session expired. Please sign up again.");
  }

  const pending: PendingSignup = JSON.parse(pendingRaw);
  const newOtpCode = generateOtp();
  pending.otpCode = newOtpCode;
  pending.otpExpiresAt = Date.now() + 10 * 60 * 1000;

  // Refresh Redis with new OTP and reset 10-minute TTL
  await redis.set(`pending:signup:${email}`, JSON.stringify(pending), {
    EX: 600,
  });

  try {
    await sendOtpVerificationEmail(email, pending.name, newOtpCode);
  } catch (err) {
    console.error('[AuthService] Failed to send OTP email:', err);
  }

  return {
    message: "A new verification code has been sent to your email.",
    email,
  };
}

/**
 * Host Login.
 */
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
    throw unauthorized("Your email is not verified yet. Please complete verification or sign up again.", {
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
