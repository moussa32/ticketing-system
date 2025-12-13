'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/useAuth';
import { toast } from 'sonner';

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      setLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      toast.error('New password must be different from current password');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Failed to change password');
        return;
      }

      toast.success('Password changed successfully!');
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Redirect after success
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (error) {
      console.error('Password change error:', error);
      toast.error('An error occurred while changing password');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Change Password</h1>
        <p className="text-gray-600 mb-8">
          Keep your account secure by updating your password regularly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showPasswords.current ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter your current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
              >
                {showPasswords.current ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPasswords.new ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter your new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
              >
                {showPasswords.new ? '🙈' : '👁️'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Must be at least 6 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
              >
                {showPasswords.confirm ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Password strength:</strong>{' '}
                {newPassword.length < 6
                  ? '❌ Too short'
                  : newPassword.length < 10
                  ? '⚠️ Weak'
                  : '✅ Strong'}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Security Tips */}
        <div className="border-t mt-8 pt-6">
          <h3 className="font-semibold text-gray-800 mb-4">🔒 Password Security Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ Use a mix of uppercase and lowercase letters</li>
            <li>✓ Include numbers and special characters</li>
            <li>✓ Avoid using personal information</li>
            <li>✓ Don't reuse passwords from other accounts</li>
            <li>✓ Change your password periodically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
