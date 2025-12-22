"use client"

import "../globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/useAuth';
import CustomerNavbar from "@/components/CustomerNavbar";
const ROLES = {
  CUSTOMER: 'customer',
};

export default function Layout({ children }) {
const router = useRouter();
/*
  const { isAuthenticated, user, loading, hasRole } = useAuth();

  useEffect(() => {
    // Wait for auth check to complete
    if (loading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check if user has CUSTOMER role
    if (!hasRole(ROLES.CUSTOMER)) {
      router.push('/unauthorized');
      return;
    }
  }, [isAuthenticated, loading, user, router]);

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

  // Don't render if not authenticated or doesn't have customer role
  if (!isAuthenticated || !hasRole(ROLES.CUSTOMER)) {
    return null;
  }*/



  return (
    <div className="min-h-screen bg-[#F5F6FA]">

      {/* Header */}
      <CustomerNavbar/>

      {/* MAIN AREA */}
      <div>
        {children}
        <Toaster />
      </div>
      {/* FOOTER */}
      <footer className="flex justify-center gap-10 p-4 text-sm bg-black text-white">
        <a href="#">About</a>
        <a href="#">Help</a>
        <span>Copyright © 2026</span>
      </footer>

    </div>
  );
}
