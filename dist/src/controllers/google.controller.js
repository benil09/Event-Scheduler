import { redis } from "../config/redis.js";
import { exchangeSetupCode, getSetupAuthUrl } from "../services/googleCalneder.service.js";
import { findByEmail, createUserRep } from "../repositories/user.repository.js";
export async function getGoogleAuthUrl(req, res) {
    try {
        const origin = (req.headers.origin || req.query.origin || "http://localhost:5173").replace(/\/$/, "");
        const url = getSetupAuthUrl(origin);
        res.status(200).json({
            success: true,
            url,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to generate Google Auth URL",
        });
    }
}
export async function handleGoogleCallback(req, res) {
    try {
        const code = req.query.code;
        const state = req.query.state;
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
            }
            catch (e) {
                console.warn("Could not decode state parameter:", e);
            }
        }
        const { email, name, avatar } = await exchangeSetupCode(code);
        if (!email || email === "-") {
            return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent("Could not retrieve Google profile email")}`);
        }
        // Upsert host user in PostgreSQL
        let user = await findByEmail(email);
        const googleName = name && name !== "-" ? name : email.split("@")[0];
        if (!user) {
            const baseSlug = googleName.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "host";
            const uniqueSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
            user = await createUserRep({
                name: googleName,
                Email: email,
                slug: uniqueSlug,
            });
        }
        // Save refresh token for user session if returned
        const refresh_token = await redis.get("GOOGLE_REFRESH_TOKEN");
        if (refresh_token) {
            await redis.set(`user:${user.id}:refresh_token`, refresh_token);
        }
        const avatarUrl = avatar && avatar !== "-" ? avatar : "";
        // Redirect host back to the exact initiating frontend port with full Google profile metadata
        const redirectUrl = `${frontendUrl}/dashboard?userId=${user.id}&name=${encodeURIComponent(googleName)}&email=${encodeURIComponent(user.Email)}&avatar=${encodeURIComponent(avatarUrl)}`;
        console.log(`[Google Auth Callback] Successfully authenticated host #${user.id} (${user.Email}). Redirecting to: ${redirectUrl}`);
        return res.redirect(redirectUrl);
    }
    catch (error) {
        console.error("Google OAuth callback error:", error);
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(error.message || "Google Auth Failed")}`);
    }
}
//# sourceMappingURL=google.controller.js.map