export function getWelcomeEmailTemplate(firstName: string, verificationLink: string) {
  return {
    subject: 'Welcome to VetFlow - Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to VetFlow!</h1>
        <p>Hello ${firstName},</p>
        <p>Thank you for signing up with VetFlow. To get started, please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Verify Email Address
          </a>
        </div>
        <p>If you didn't create this account, you can safely ignore this email.</p>
        <p>Best regards,<br>The VetFlow Team</p>
      </div>
    `,
    text: `
      Welcome to VetFlow!
      
      Hello ${firstName},
      
      Thank you for signing up with VetFlow. To get started, please verify your email address by clicking the link below:
      
      ${verificationLink}
      
      If you didn't create this account, you can safely ignore this email.
      
      Best regards,
      The VetFlow Team
    `,
  };
}
