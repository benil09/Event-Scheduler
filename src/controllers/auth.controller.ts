import { Request, Response, NextFunction } from 'express';
import {
  signupHostService,
  verifyOtpService,
  resendOtpService,
  loginHostService,
} from '../services/auth.service.js';
import { SignupDto, VerifyOtpDto, ResendOtpDto, LoginDto } from '../dtos/auth.dto.js';

export async function signupController(req: Request, res: Response, next: NextFunction) {
  try {
    const data: SignupDto = req.body;
    const result = await signupHostService(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function verifyOtpController(req: Request, res: Response, next: NextFunction) {
  try {
    const data: VerifyOtpDto = req.body;
    const result = await verifyOtpService(data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function resendOtpController(req: Request, res: Response, next: NextFunction) {
  try {
    const data: ResendOtpDto = req.body;
    const result = await resendOtpService(data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const data: LoginDto = req.body;
    const result = await loginHostService(data);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getMeController(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    res.status(200).json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.Email || req.user.email,
        slug: req.user.slug,
        isVerified: req.user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
}
