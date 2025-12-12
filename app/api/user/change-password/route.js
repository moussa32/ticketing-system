import { changeUserPassword } from '@/lib/services/userService';
import { NextResponse } from 'next/server';

/**
 * POST /api/user/change-password
 * Changes the user's password
 */
export async function POST(request) {
  try {
    const { userId, currentPassword, newPassword } = await request.json();

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Change password
    await changeUserPassword(userId, currentPassword, newPassword);

    return NextResponse.json(
      { message: 'Password changed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to change password' },
      { status: 400 }
    );
  }
}
