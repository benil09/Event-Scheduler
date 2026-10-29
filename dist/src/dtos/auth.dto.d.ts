import { z } from 'zod';
export declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type SignupDto = z.infer<typeof signupSchema>;
export declare const verifyOtpSchema: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
}, z.core.$strip>;
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;
export declare const resendOtpSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type ResendOtpDto = z.infer<typeof resendOtpSchema>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginDto = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.dto.d.ts.map