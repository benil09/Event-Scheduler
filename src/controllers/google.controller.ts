import { Request, Response } from "express";
import { redis } from "../config/redis.js";
import { exchangeSetupCode, getSetupAuthUrl } from "../services/googleCalneder.service.js";
import { findByEmail, createUserRep } from "../repositories/user.repository.js";

export async function getGoogleAuthUrl(_req: Request, res: Response) {
  try {
    const url = getSetupAuthUrl();
    res.status(200).json({
      success: true,
      url,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate Google Auth URL",
    });
  }
}

export async function handleGoogleCallback(req: Request, res: Response) {
  try {
    const code = req.query.code as string;
    if (!code) {
      return res.status(400).json({ success: false, message: "Authorization code missing" });
    }

    const { email, name, avatar } = await exchangeSetupCode(code);
    if (!email || email === '-') {
      return res.status(400).json({ success: false, message: "Could not retrieve Google profile email" });
    }

    // Upsert host user in PostgreSQL
    let user = await findByEmail(email);
    if (!user) {
      const baseSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'host';
      const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      user = await createUserRep({
        name,
        Email: email,
        slug: uniqueSlug,
      });
    }

    // Save refresh token for user session
    const refresh_token = await redis.get("GOOGLE_REFRESH_TOKEN");
    if (refresh_token) {
      await redis.set(`user:${user.id}:refresh_token`, refresh_token);
    }

    // Redirect host back to frontend dashboard with host user context
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5175";
    const redirectUrl = `${frontendUrl}/dashboard?userId=${user.id}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.Email)}`;
    
    return res.redirect(redirectUrl);
  } catch (error: any) {
    console.error("Google OAuth callback error:", error);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5175";
    return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(error.message || 'Google Auth Failed')}`);
  }
}
