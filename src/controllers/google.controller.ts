import { Request, Response } from "express";
import { redis } from "../config/redis.js";
import { exchangeSetupCode, getSetupAuthUrl } from "../services/googleCalneder.service.js";
import { findByEmail, createUserRep } from "../repositories/user.repository.js";

export async function getGoogleAuthUrl(req: Request, res: Response) {
  try {
    const origin = (req.headers.origin || req.query.origin as string || "http://localhost:5173").replace(/\/$/, "");
    const url = getSetupAuthUrl(origin);
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
    const state = req.query.state as string;

    if (!code) {
      return res.status(400).json({ success: false, message: "Authorization code missing" });
    }

    // Determine exact frontend URL from state
    let frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    if (state && state !== "setup") {
      try {
        const decoded = Buffer.from(state, "base64").toString("utf-8");
        if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
          frontendUrl = decoded.replace(/\/$/, "");
        }
      } catch (e) {
        console.warn("Could not decode state parameter:", e);
      }
    }

    const { email, name, avatar } = await exchangeSetupCode(code);
    if (!email || email === "-") {
      return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent("Could not retrieve Google profile email")}`);
    }

    // Upsert host user in PostgreSQL
    let user = await findByEmail(email);
    if (!user) {
      const baseSlug = name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "host";
      const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      user = await createUserRep({
        name,
        Email: email,
        slug: uniqueSlug,
      });
    }

    // Save refresh token for user session if returned
    const refresh_token = await redis.get("GOOGLE_REFRESH_TOKEN");
    if (refresh_token) {
      await redis.set(`user:${user.id}:refresh_token`, refresh_token);
    }

    // Redirect host back to the exact initiating frontend port with host user context
    const redirectUrl = `${frontendUrl}/dashboard?userId=${user.id}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.Email)}`;
    console.log(`[Google Auth Callback] Successfully authenticated host #${user.id} (${user.Email}). Redirecting to: ${redirectUrl}`);
    
    return res.redirect(redirectUrl);
  } catch (error: any) {
    console.error("Google OAuth callback error:", error);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(error.message || "Google Auth Failed")}`);
  }
}
