import { z } from 'zod';
export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must not exceed 100 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export const verifyOtpSchema = z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string().length(6, "OTP code must be 6 digits"),
});
export const resendOtpSchema = z.object({
    email: z.string().email("Invalid email address"),
});
export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});
//# sourceMappingURL=auth.dto.js.map