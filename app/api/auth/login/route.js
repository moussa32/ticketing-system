import { loginUser } from '@/lib/services/authService';
import { NextResponse } from 'next/server';

/**
 * POST /api/auth/login
 * Authenticates a user and returns a JWT token
 */
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log(email, password)
    // Call the auth service to log in
    const result = await loginUser({ email, password });

    if (!result) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Create response with token
    const response = NextResponse.json(
      {
        message: 'Login successful',
        access_token: result.access_token,
        firstName: result.firstName,
        id: result.id,
        role: result.role,
      },
      { status: 200 }
    );

    // Set token in cookie for server-side middleware
    response.cookies.set('token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}
