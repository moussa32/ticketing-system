'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Hook to manage authentication state and provide auth utilities
 * @returns {Object} Auth state and methods
 */
export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has a token stored
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('user');

    if (token && userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user info:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  /**
   * Logs in a user and stores token and user info
   * @param {string} token - JWT token from server
   * @param {Object} userInfo - User information to store
   */
  const login = (token, userInfo) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userInfo));
    // Also set cookie for server-side middleware
    document.cookie = `token=${token}; path=/`;
    setUser(userInfo);
    setIsAuthenticated(true);
  };

  /**
   * Logs out the current user and clears authentication data
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  /**
   * Checks if user has specific role
   * @param {string|string[]} roles - Role or array of roles to check
   * @returns {boolean} True if user has one of the specified roles
   */
  const hasRole = (roles) => {
    if (!user) return false;
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    return rolesArray.includes(user.role);
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    hasRole,
  };
}
