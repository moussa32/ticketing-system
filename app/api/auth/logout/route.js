import { NextResponse } from 'next/server';

/**
 * POST /api/auth/logout
 * Logs out the user by clearing the token cookie
 */
export async function POST(request) {
  const response = NextResponse.json(
    { message: 'Logout successful' },
    { status: 200 }
  );

  // Clear token cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
