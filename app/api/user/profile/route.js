import { updateUserProfile } from '@/lib/services/userService';
import { NextResponse } from 'next/server';

/**
 * PATCH /api/user/profile
 * Updates the user's profile information
 */
export async function PATCH(request) {
  try {
    const { firstName, lastName, userId } = await request.json();

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!firstName || !lastName) {
      return NextResponse.json(
        { message: 'First name and last name are required' },
        { status: 400 }
      );
    }

    // Update profile
    const updatedUser = await updateUserProfile(userId, {
      firstName,
      lastName,
    });

    return NextResponse.json(
      {
        message: 'Profile updated successfully',
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to update profile' },
      { status: 400 }
    );
  }
}
