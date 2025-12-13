'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/useAuth';
import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

const ROLES = {
  ADMIN: 'ADMIN',
};

export default function AdminLayout({ children }) {
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

    // Check if user has ADMIN role
    if (!hasRole(ROLES.ADMIN)) {
      router.push('/unauthorized');
      return;
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

  // Don't render if not authenticated or doesn't have admin role
  if (!isAuthenticated || !hasRole(ROLES.ADMIN)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Top Navbar */}
      <AdminNavbar />
      
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <main className="ml-64 mt-16 p-8">
        {children}
      </main>
    </div>
  );
}
