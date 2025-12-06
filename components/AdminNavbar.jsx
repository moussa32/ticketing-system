'use client';

import { useState } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Placeholder user data - replace with actual auth data
  const user = {
    name: 'Admin User',
    email: 'admin@ticketing.com',
    avatar: null
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">
            Ticketing System
          </h1>
        </div>

        {/* User Avatar and Dropdown */}
        <div className="relative">
          <button
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Avatar */}
            <Avatar className="w-8 h-8 border border-gray-200">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gray-100 text-gray-600 font-medium text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            {/* User Name */}
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
            </div>
            
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              className="absolute right-0 mt-1 w-56 bg-white rounded-md border border-gray-200 shadow-sm py-1 animate-in fade-in slide-in-from-top-1 duration-100"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 mt-1">{user.email}</p>
              </div>
              
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <User className="w-4 h-4 text-gray-400" />
                Profile
              </button>
              
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                <Settings className="w-4 h-4 text-gray-400" />
                Settings
              </button>
              
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
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
