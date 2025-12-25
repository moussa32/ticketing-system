
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/useAuth';
import AgentNavbar from "@/components/AgentNavbar";
const ROLES = {
  AGENT: 'agent',
};



export default function AgentLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Top Navbar */}
      <AgentNavbar />
    
      
      {/* Main Content Area */}
      <main className="mt-16 p-8">
        {children}
      </main>
    </div>
  );
}
