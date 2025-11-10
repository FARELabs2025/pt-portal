import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    // Check if email is configured
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com') {
      throw new Error('EMAIL_USER is not configured. Please set EMAIL_USER in .env file.');
    }
    
    if (!process.env.EMAIL_PASSWORD || process.env.EMAIL_PASSWORD === 'your-app-password') {
      throw new Error('EMAIL_PASSWORD is not configured. Please set EMAIL_PASSWORD in .env file.');
    }

    const transporter = createTransporter();

    // Verify connection first
    await transporter.verify();
    console.log('SMTP connection verified');

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'ptprovider@farelabs.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    console.log('   To:', options.to);
  } catch (error: any) {
    console.error('Error sending email:');
    console.error('   To:', options.to);
    console.error('   Error:', error.message);
    if (error.code) {
      console.error('   Error Code:', error.code);
    }
    if (error.command) {
      console.error('   Command:', error.command);
    }
    throw error;
  }
};

// Email template for registration credentials
export const sendRegistrationCredentials = async (
  email: string,
  username: string,
  password: string,
  name: string
): Promise<void> => {
  const subject = 'Welcome to PT Portal - Your Login Credentials';
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || process.env.FRONTEND_URL || 'http://localhost:3000';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PT Portal - Registration Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #003087; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0;">PT Portal</h1>
        <p style="color: white; margin: 5px 0 0 0;">FARE Labs</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
        <h2 style="color: #003087; margin-top: 0;">Welcome, ${name}!</h2>
        
        <p>Thank you for registering with PT Portal. Your registration has been approved and your account is now active.</p>
        
        <div style="background-color: white; padding: 20px; border-radius: 5px; border-left: 4px solid #003087; margin: 20px 0;">
          <h3 style="color: #003087; margin-top: 0;">Your Login Credentials:</h3>
          <p style="margin: 10px 0;"><strong>Username:</strong> <code style="background-color: #f0f0f0; padding: 5px 10px; border-radius: 3px; font-family: monospace;">${username}</code></p>
          <p style="margin: 10px 0;"><strong>Password:</strong> <code style="background-color: #f0f0f0; padding: 5px 10px; border-radius: 3px; font-family: monospace;">${password}</code></p>
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <p style="margin: 0; color: #856404;"><strong>Important:</strong> Please keep these credentials secure and change your password after your first login.</p>
        </div>
        
        <p style="margin-top: 30px;">You can now log in to the portal using these credentials:</p>
        <a href="${frontendUrl}/auth/login" 
           style="display: inline-block; background-color: #003087; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Login to PT Portal
        </a>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #666; margin: 0;">
          If you have any questions or need assistance, please contact us at 
          <a href="mailto:ptprovider@farelabs.com" style="color: #003087;">ptprovider@farelabs.com</a>
        </p>
        
        <p style="font-size: 12px; color: #666; margin-top: 10px;">
          © ${new Date().getFullYear()} FARE Labs. All rights reserved.
        </p>
      </div>
    </body>
    </html>
  `;

  await sendEmail({ to: email, subject, html });
};

// Email template to notify admin about new registration
export const notifyAdminNewRegistration = async (
  userData: {
    userId: string;
    name: string;
    labName: string;
    email: string;
    mobileNo: string;
    accreditationNo?: string;
    username: string;
    password: string;
  }
): Promise<void> => {
  const subject = 'New Registration Request - PT Portal - Action Required';
  const adminEmail = process.env.ADMIN_EMAIL || 'abhinavsingh2530@gmail.com';
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:3000';
  
  // Use GET endpoint for email links (shows approval page)
  const approveUrl = `${baseUrl}/api/auth/approve/${userData.userId}`;
  const rejectUrl = `${baseUrl}/api/auth/reject/${userData.userId}`;
  // POST endpoint for API calls (shown in email for reference)
  const approveApiUrl = `${baseUrl}/api/auth/approve/${userData.userId}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Registration - PT Portal</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #003087; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0;">New Registration Request</h1>
        <p style="color: white; margin: 5px 0 0 0;">PT Portal - Admin Approval Required</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
        <p style="font-size: 16px; font-weight: bold; color: #003087;">A new user has registered on the PT Portal:</p>
        
        <div style="background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #003087;">
          <p><strong>Name:</strong> ${userData.name}</p>
          <p><strong>Lab Name:</strong> ${userData.labName}</p>
          <p><strong>Email:</strong> ${userData.email}</p>
          <p><strong>Mobile No:</strong> ${userData.mobileNo}</p>
          <p><strong>Accreditation No:</strong> ${userData.accreditationNo || 'Not available'}</p>
          <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
          <p><strong>Generated Username:</strong> <code style="background-color: #f0f0f0; padding: 3px 8px; border-radius: 3px;">${userData.username}</code></p>
          <p><strong>Generated Password:</strong> <code style="background-color: #f0f0f0; padding: 3px 8px; border-radius: 3px;">${userData.password}</code></p>
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0;">
          <p style="margin: 0; color: #856404; font-weight: bold;">Action Required:</p>
          <p style="margin: 5px 0 0 0; color: #856404;">Please review and approve/reject this registration. Upon approval, login credentials will be sent to the user.</p>
        </div>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${approveUrl}" 
             style="display: inline-block; background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px; font-weight: bold;">
            Approve Registration
          </a>
          <a href="${rejectUrl}" 
             style="display: inline-block; background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px; font-weight: bold;">
            Reject Registration
          </a>
        </div>
        
        <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0; font-size: 12px; color: #0066cc;">
            <strong>Quick Links:</strong><br>
            <a href="${approveUrl}" style="color: #0066cc;">Click to Approve</a> | 
            <a href="${rejectUrl}" style="color: #0066cc;">Click to Reject</a><br><br>
            <strong>Or use API in Postman:</strong><br>
            <code style="background-color: white; padding: 5px; border-radius: 3px; display: block; margin-top: 5px;">POST ${approveApiUrl}</code>
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #666; margin: 0;">
          This is an automated notification from PT Portal.
        </p>
      </div>
    </body>
    </html>
  `;

  await sendEmail({ to: adminEmail, subject, html });
};


