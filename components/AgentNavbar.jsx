'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/lib/auth/useAuth';

export default function AgentNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();



  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-gray-900">Agent Dashboard</h1>
        </div>

        <div className="relative">
          <button
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <Avatar className="w-8 h-8 border border-gray-200">
              <AvatarImage src={user?.avatar} alt={user?.firstName} />
              <AvatarFallback className="bg-gray-100 text-gray-600 font-medium text-sm">
                {(user?.firstName || '').split(' ').map(n => n?.[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-gray-700">{user?.firstName}</p>
            </div>

            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showDropdown && (
            <div
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              className="absolute right-0 mt-1 w-56 bg-white rounded-md border border-gray-200 shadow-sm py-1"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.firstName}</p>
                <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
              </div>

              <Link href="/profile" className="w-full block px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                Profile
              </Link>

              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <Settings className="w-4 h-4 text-gray-400" />
                Settings
              </button>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button onClick={() => logout()} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
