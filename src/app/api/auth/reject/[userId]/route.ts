import { NextRequest } from 'next/server';
import { connectDB } from '@/app/api/config/database';
import { rejectUser } from '@/app/api/controllers/auth.controller';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await connectDB();
    
    const resolvedParams = await params;
    
    // Call rejectUser function
    const response = await rejectUser(req, { params: resolvedParams });
    const data = await response.json();
    
    // Render success/error page
    if (data.success) {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>User Rejected - PT Portal</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
              background-color: #f5f5f5;
              text-align: center;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .reject-icon {
              font-size: 64px;
              color: #dc3545;
              margin-bottom: 20px;
            }
            h1 { color: #dc3545; margin: 0; }
            .message {
              color: #666;
              margin: 20px 0;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="reject-icon">Rejected</div>
            <h1>User Rejected</h1>
            <p class="message">${data.message || 'User registration has been rejected.'}</p>
            <p class="message" style="font-size: 14px; color: #999;">You can close this window.</p>
          </div>
        </body>
        </html>
        `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    } else {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Rejection Error - PT Portal</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
              background-color: #f5f5f5;
              text-align: center;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .error-icon {
              font-size: 64px;
              color: #dc3545;
              margin-bottom: 20px;
            }
            h1 { color: #dc3545; margin: 0; }
            .message {
              color: #666;
              margin: 20px 0;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error-icon">Error</div>
            <h1>Rejection Failed</h1>
            <p class="message">${data.message || 'Failed to reject user. Please try again later.'}</p>
            <p class="message" style="font-size: 14px; color: #999;">You can close this window.</p>
          </div>
        </body>
        </html>
        `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }
  } catch (error: any) {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Error - PT Portal</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1 style="color: #dc3545;">Error</h1>
        <p>${error.message || 'An error occurred while rejecting the user.'}</p>
      </body>
      </html>
      `,
      {
        headers: { 'Content-Type': 'text/html' },
        status: 500,
      }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await params;
    return await rejectUser(req, { params: resolvedParams });
  } catch (error: any) {
    console.error('Reject route error:', error);
    return Response.json(
      {
        success: false,
        message: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}

