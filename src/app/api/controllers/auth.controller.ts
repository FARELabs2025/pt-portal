import { NextRequest, NextResponse } from 'next/server';
import User from '../models/User.model';
import {
  hashPassword,
  comparePassword,
  generateToken,
  generateUsername,
  generatePassword,
} from '../utils/auth.utils';
import {
  sendRegistrationCredentials,
  notifyAdminNewRegistration,
} from '../config/email';

interface RegisterBody {
  name: string;
  labName: string;
  email: string;
  mobileNo: string;
  postalZipCode: string;
  accreditationNo?: string;
  county?: string;
  city?: string;
  address?: string;
}

interface LoginBody {
  username: string;
  password: string;
}

/**
 * Register a new user
 */
export const register = async (body: RegisterBody): Promise<NextResponse> => {
  try {
    const {
      name,
      labName,
      email,
      mobileNo,
      postalZipCode,
      accreditationNo,
      county,
      city,
      address,
    } = body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email already exists',
        },
        { status: 400 }
      );
    }

    // Generate username and password
    const username = generateUsername(email, labName);
    
    // Check if username already exists, if so, add a number
    let finalUsername = username;
    let counter = 1;
    while (await User.findOne({ username: finalUsername })) {
      finalUsername = `${username}${counter}`;
      counter++;
    }

    const password = generatePassword(12);

    // Generate lab code (format: MT-XXXX or similar)
    const labCode = `MT-${Date.now().toString().slice(-4)}`;

    // Create user with pending status (requires admin approval)
    const user = new User({
      username: finalUsername,
      email: email.toLowerCase(),
      name,
      labName,
      accreditationNo: accreditationNo || 'Not available',
      mobileNo,
      postalZipCode,
      county,
      city,
      address,
      labCode,
      registrationStatus: 'pending',
      role: 'user',
      isEmailSent: false,
      temporaryPassword: password,
    });
    
    await user.save();

    try {
      // Notify admin about new registration
      console.log('Attempting to send admin notification email...');
      console.log('   To:', process.env.ADMIN_EMAIL || 'abhinavsingh2530@gmail.com');
      await notifyAdminNewRegistration({
        userId: String(user._id),
        name: user.name,
        labName: user.labName,
        email: user.email,
        mobileNo: user.mobileNo,
        accreditationNo: user.accreditationNo,
        username: finalUsername,
        password: password,
      });
      console.log('Admin notification email sent successfully!');
    } catch (adminEmailError: any) {
      console.error('Failed to send admin notification email:');
      console.error('   Error:', adminEmailError.message);
      // Continue even if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration submitted successfully! Your application is pending admin approval. You will receive login credentials via email once approved.',
        data: {
          userId: user._id,
          email: user.email,
          registrationStatus: user.registrationStatus,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        {
          success: false,
          message: `${field} already exists`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Registration failed. Please try again.',
      },
      { status: 500 }
    );
  }
};

/**
 * Login user
 */
export const login = async (body: LoginBody): Promise<NextResponse> => {
  try {
    const { username, password } = body;

    // Find user by username (include password and temporaryPassword fields)
    const user = await User.findOne({ username: username.toLowerCase() }).select('+password +temporaryPassword');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid username',
        },
        { status: 401 }
      );
    }

    // Check if account is approved
    if (user.registrationStatus !== 'approved') {
      return NextResponse.json(
        {
          success: false,
          message: 'Your account is pending approval. Please wait for admin approval.',
        },
        { status: 403 }
      );
    }

    // Verify password using temporaryPassword (plain text comparison)
    // Since we're not storing hashed password, compare directly with temporaryPassword
    if (!user.temporaryPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Account error. Please contact administrator. Your account may need to be re-approved.',
        },
        { status: 500 }
      );
    }

    // Compare plain text password with temporaryPassword
    const isPasswordValid = password === user.temporaryPassword;

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid password',
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(String(user._id));

    // Return user data (without password)
    const userData = {
      id: String(user._id),
      username: user.username,
      email: user.email,
      name: user.name,
      labName: user.labName,
      labCode: user.labCode,
      role: user.role,
      registrationStatus: user.registrationStatus,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: userData,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Login failed. Please try again.',
      },
      { status: 500 }
    );
  }
};

/**
 * Approve user registration
 */
export const approveUser = async (req: NextRequest, { params }: { params: { userId: string } }): Promise<NextResponse> => {
  try {
    const { userId } = params;

    // Find user and include temporaryPassword and password
    const user = await User.findById(userId).select('+temporaryPassword +password');

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    // If already approved but email not sent, allow re-approval to fix
    if (user.registrationStatus === 'approved') {
      if (user.isEmailSent) {
        return NextResponse.json(
          {
            success: false,
            message: 'User is already approved and credentials have been sent.',
          },
          { status: 400 }
        );
      }
      
      console.log('User already approved in DB, but email not sent. Fixing...');
      
      // Don't set password field, keep only temporaryPassword
      
      if (!user.isEmailSent && user.temporaryPassword) {
        try {
          const plainPassword = user.temporaryPassword;
          await sendRegistrationCredentials(
            user.email,
            user.username,
            plainPassword,
            user.name
          );
          user.isEmailSent = true;
          // Keep temporaryPassword in database (don't clear it)
          console.log('Email sent and user fixed!');
        } catch (emailError: any) {
          console.error('Failed to send email:', emailError.message);
        }
      }
      
      await user.save();
      
      return NextResponse.json(
        {
          success: true,
          message: 'User approval fixed! Email sent.',
          data: {
            userId: user._id,
            email: user.email,
            username: user.username,
          },
        },
        { status: 200 }
      );
    }

    if (user.registrationStatus === 'rejected') {
      return NextResponse.json(
        {
          success: false,
          message: 'Cannot approve a rejected user',
        },
        { status: 400 }
      );
    }

    // Get the temporary password
    const plainPassword = user.temporaryPassword;

    if (!plainPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password not found. Please contact administrator.',
        },
        { status: 500 }
      );
    }

    // Update user: approve status (don't save hashed password, keep only temporaryPassword)
    user.registrationStatus = 'approved';
    await user.save();

    try {
      // Send credentials email to user
      console.log('Attempting to send credentials email to user...');
      console.log('   To:', user.email);
      await sendRegistrationCredentials(
        user.email,
        user.username,
        plainPassword,
        user.name
      );
      console.log('Credentials email sent successfully to:', user.email);

      // Mark email as sent
      user.isEmailSent = true;
      await user.save();

      return NextResponse.json(
        {
          success: true,
          message: 'User approved successfully! Login credentials have been sent to the user.',
          data: {
            userId: user._id,
            email: user.email,
            username: user.username,
          },
        },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error('Failed to send credentials email:');
      console.error('   Error:', emailError.message);
      return NextResponse.json(
        {
          success: true,
          message: 'User approved, but failed to send email. Please notify user manually.',
          warning: 'Email sending failed',
          data: {
            userId: user._id,
            email: user.email,
            username: user.username,
            password: plainPassword,
          },
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error('Approval error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to approve user',
      },
      { status: 500 }
    );
  }
};

/**
 * Reject user registration
 */
export const rejectUser = async (req: NextRequest, { params }: { params: { userId: string } }): Promise<NextResponse> => {
  try {
    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    if (user.registrationStatus === 'rejected') {
      return NextResponse.json(
        {
          success: false,
          message: 'User is already rejected',
        },
        { status: 400 }
      );
    }

    // Update user status to rejected
    // Keep temporaryPassword in database (don't clear it)
    user.registrationStatus = 'rejected';
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'User registration rejected',
        data: {
          userId: user._id,
          email: user.email,
          registrationStatus: user.registrationStatus,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Rejection error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to reject user',
      },
      { status: 500 }
    );
  }
};

/**
 * Get pending users (for admin approval)
 */
export const getPendingUsers = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const pendingUsers = await User.find({ 
      registrationStatus: 'pending' 
    }).select('-password -temporaryPassword').sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: 'Pending users retrieved successfully',
        data: {
          count: pendingUsers.length,
          users: pendingUsers.map(user => ({
            userId: user._id,
            name: user.name,
            labName: user.labName,
            email: user.email,
            mobileNo: user.mobileNo,
            accreditationNo: user.accreditationNo,
            labCode: user.labCode,
            registrationStatus: user.registrationStatus,
            createdAt: user.createdAt,
            approveUrl: `POST /api/auth/approve/${user._id}`,
          })),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching pending users:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to fetch pending users',
      },
      { status: 500 }
    );
  }
};

