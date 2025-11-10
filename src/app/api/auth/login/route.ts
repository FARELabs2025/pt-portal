import { NextRequest } from 'next/server';
import { connectDB } from '@/app/api/config/database';
import { login } from '@/app/api/controllers/auth.controller';

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Parse and validate request body
    const body = await req.json();
    const errors = [];

    if (!body.username || !body.username.trim()) {
      errors.push({ field: 'username', message: 'Username is required' });
    }
    if (!body.password || body.password.length < 6) {
      errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      return Response.json(
        {
          success: false,
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      );
    }

    // Call login controller with parsed body
    return await login(body);
  } catch (error: any) {
    console.error('Login route error:', error);
    return Response.json(
      {
        success: false,
        message: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
