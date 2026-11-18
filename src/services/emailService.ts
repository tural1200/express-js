import { mailer, getTestMessageUrl } from "../lib/mailer";

interface SendMailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

class EmailService {
  static async send(input: SendMailInput) {
    const info = await mailer.sendMail({
      ...input,
      from: process.env.EMAIL_FROM,
    });
    const previewUrl = getTestMessageUrl(info);
    if (previewUrl) {
      console.log("Ethereal preview:", previewUrl);
    }
    return info;
  }

  static async sendPasswordResetEmail(to: string, rawToken: string) {
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${rawToken}`;
    return EmailService.send({
      to,
      subject: "Reset your password",
      text: `Reset your password: ${resetUrl}`,
      html: `
        <p>You requested a password reset.</p>
        <p><a href="${resetUrl}">Reset password</a></p>
        <p>This link expires in 15 minutes.</p>
      `,
    });
  }
}

export { EmailService };
