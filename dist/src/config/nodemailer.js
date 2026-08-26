import nodemailer from "nodemailer";
import { EMAIL_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "./env.js";
let transporter = null;
function getTransporter() {
    if (transporter)
        return transporter;
    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: SMTP_USER && SMTP_PASSWORD ? {
            user: SMTP_USER,
            pass: SMTP_PASSWORD
        } : undefined
    });
    return transporter;
}
export async function sendEmail(to, subject, html) {
    const transporter = getTransporter();
    await transporter.sendMail({
        from: EMAIL_FROM,
        to,
        subject,
        html
    });
    console.log("[Email] email sent", { to });
}
//# sourceMappingURL=nodemailer.js.map