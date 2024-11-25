import nodemailer from 'nodemailer';
import { getWelcomeEmailTemplate } from './email-templates/welcome';
import { getResetPasswordEmailTemplate } from './email-templates/reset-password';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendWelcomeEmail(to: string, firstName: string, verificationLink: string) {
  const { subject, html, text } = getWelcomeEmailTemplate(firstName, verificationLink);
  
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
    text,
  });
}

export async function sendPasswordResetEmail(to: string, firstName: string, resetLink: string) {
  const { subject, html, text } = getResetPasswordEmailTemplate(firstName, resetLink);
  
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
    text,
  });
}
