import { SignupDto, VerifyOtpDto, ResendOtpDto, LoginDto } from '../dtos/auth.dto.js';
export declare function signupHostService(data: SignupDto): Promise<{
    message: string;
    email: string;
    name: string;
}>;
export declare function verifyOtpService(data: VerifyOtpDto): Promise<{
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        slug: string;
        isVerified: boolean;
    };
}>;
export declare function resendOtpService(data: ResendOtpDto): Promise<{
    message: string;
    email: string;
}>;
export declare function loginHostService(data: LoginDto): Promise<{
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        slug: string;
        isVerified: true;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map