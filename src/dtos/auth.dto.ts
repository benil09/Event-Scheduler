import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupDto = z.infer<typeof signupSchema>;

export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP code must be 6 digits"),
});

export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;

export const resendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ResendOtpDto = z.infer<typeof resendOtpSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginDto = z.infer<typeof loginSchema>;
