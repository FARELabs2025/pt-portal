import { NextRequest } from 'next/server';
import { connectDB } from '@/app/api/config/database';
import { getPendingUsers } from '@/app/api/controllers/auth.controller';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    return await getPendingUsers(req);
  } catch (error: any) {
    console.error('Pending users route error:', error);
    return Response.json(
      {
        success: false,
        message: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}


