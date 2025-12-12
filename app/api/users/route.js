import { getUsers } from '@/lib/services/userService';
import { NextResponse } from 'next/server';

/**
 * GET /api/users
 * Returns a list of all users (sanitized)
 */
export async function GET() {
  try {
    const users = await getUsers();

    const sanitized = users.map((u) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role,
    }));

    return NextResponse.json({ users: sanitized }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
