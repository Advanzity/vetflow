export function getResetPasswordEmailTemplate(firstName: string, resetLink: string) {
  return {
    subject: 'Reset Your VetFlow Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Reset Your Password</h1>
        <p>Hello ${firstName},</p>
        <p>We received a request to reset your VetFlow password. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </div>
        <p>This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Best regards,<br>The VetFlow Team</p>
      </div>
    `,
    text: `
      Reset Your Password
      
      Hello ${firstName},
      
      We received a request to reset your VetFlow password. Click the link below to set a new password:
      
      ${resetLink}
      
      This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
      
      Best regards,
      The VetFlow Team
    `,
  };
}
