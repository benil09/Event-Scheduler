import { sendEmail } from "../config/nodemailer.js";
export async function sendOtpVerificationEmail(email, name, otp) {
    const subject = `Your Verification Code: ${otp} - Event Scheduler`;
    const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #09090b; font-size: 24px; font-weight: 800; margin: 0 0 8px 0; tracking: -0.025em;">Welcome to Event Scheduler</h1>
        <p style="color: #71717a; font-size: 14px; margin: 0;">Host Account Email Verification</p>
      </div>

      <div style="padding: 24px; background-color: #f4f4f5; border-radius: 12px; margin-bottom: 24px;">
        <p style="color: #18181b; font-size: 15px; margin: 0 0 16px 0;">Hello <strong>${name}</strong>,</p>
        <p style="color: #3f3f46; font-size: 14px; margin: 0 0 20px 0; line-height: 1.5;">
          Thank you for registering as a host. Please use the following 6-digit One-Time Password (OTP) to complete your signup and verify your email address:
        </p>

        <div style="text-align: center; margin: 28px 0;">
          <span style="display: inline-block; font-size: 32px; font-weight: 800; font-family: monospace; letter-spacing: 8px; color: #09090b; background: #ffffff; padding: 12px 28px; border-radius: 10px; border: 2px dashed #d4d4d8;">
            ${otp}
          </span>
        </div>

        <p style="color: #71717a; font-size: 13px; margin: 0; text-align: center;">
          This code is valid for <strong>10 minutes</strong>. If you did not request this code, please ignore this email.
        </p>
      </div>

      <div style="border-t: 1px solid #f4f4f5; padding-top: 16px; text-align: center;">
        <p style="color: #a1a1aa; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Event Scheduler. All rights reserved.</p>
      </div>
    </div>
  `;
    await sendEmail(email, subject, html);
}
//# sourceMappingURL=auth.mailer.js.map