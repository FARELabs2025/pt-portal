import { NextRequest } from 'next/server';
import { connectDB } from '@/app/api/config/database';
import { register } from '@/app/api/controllers/auth.controller';

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Validate request
    const body = await req.json();
    const errors = [];
    
    // Basic validation
    if (!body.name || body.name.trim().length < 2 || body.name.trim().length > 100) {
      errors.push({ field: 'name', message: 'Name must be between 2 and 100 characters' });
    }
    if (!body.labName || body.labName.trim().length < 2 || body.labName.trim().length > 100) {
      errors.push({ field: 'labName', message: 'Lab name must be between 2 and 100 characters' });
    }
    if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
      errors.push({ field: 'email', message: 'Please provide a valid email address' });
    }
    if (!body.mobileNo || body.mobileNo.trim().length < 10 || body.mobileNo.trim().length > 15) {
      errors.push({ field: 'mobileNo', message: 'Mobile number must be between 10 and 15 characters' });
    }
    if (!body.postalZipCode || !body.postalZipCode.trim()) {
      errors.push({ field: 'postalZipCode', message: 'Postal/Zip code is required' });
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

    // Call register controller with parsed body
    return await register(body);
  } catch (error: any) {
    console.error('Register route error:', error);
    return Response.json(
      {
        success: false,
        message: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}

