'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/useAuth';

/**
 * Higher-order component to protect routes based on authentication and role
 * @param {React.ComponentType} Component - The component to protect
 * @param {Object} options - Configuration options
 * @param {string[]} options.requiredRoles - Array of roles allowed to access this route
 * @returns {React.ComponentType} Protected component
 */
export function withProtectedRoute(Component, options = {}) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const { isAuthenticated, user, loading, hasRole } = useAuth();

    useEffect(() => {
      // Wait for auth check to complete
      if (loading) return;

      // Redirect to login if not authenticated
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // Check role if required
      if (options.requiredRoles && options.requiredRoles.length > 0) {
        if (!hasRole(options.requiredRoles)) {
          router.push('/unauthorized');
          return;
        }
      }
    }, [isAuthenticated, loading, user, router]);

    // Show loading state while checking authentication
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    // Don't render component if not authenticated
    if (!isAuthenticated) {
      return null;
    }

    // Check role access
    if (options.requiredRoles && !hasRole(options.requiredRoles)) {
      return null;
    }

    return <Component {...props} user={user} />;
  };
}
