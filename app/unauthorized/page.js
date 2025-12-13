'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/useAuth';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>

          {user && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Logged in as:</strong> {user.firstName} ({user.role})
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => router.back()}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Go Back
            </button>
            <button
              onClick={logout}
              className="flex-1 py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
