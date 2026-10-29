import express from 'express';
import { validate } from '../middlewares/validate.js';
import { authenticate } from '../middlewares/auth.js';
import { signupSchema, verifyOtpSchema, resendOtpSchema, loginSchema, } from '../dtos/auth.dto.js';
import { signupController, verifyOtpController, resendOtpController, loginController, getMeController, } from '../controllers/auth.controller.js';
const authRouter = express.Router();
authRouter.post('/signup', validate(signupSchema), signupController);
authRouter.post('/verify-otp', validate(verifyOtpSchema), verifyOtpController);
authRouter.post('/resend-otp', validate(resendOtpSchema), resendOtpController);
authRouter.post('/login', validate(loginSchema), loginController);
authRouter.get('/me', authenticate, getMeController);
export default authRouter;
//# sourceMappingURL=auth.routes.js.map