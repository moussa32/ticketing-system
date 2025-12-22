<<<<<<< HEAD
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/useAuth';
import AgentNavbar from "@/components/AgentNavbar";
import AgentSidebar from "@/components/AgentSidebar";
const ROLES = {
  AGENT: 'agent',
};
=======
// import AgentSidebar from "@/components/AgentSidebar";
import AgentNavbar from "../../../features/agent-dashboard/v2/Navebar";
import AdminSidebar from './../../../components/AdminSidebar';
>>>>>>> Branch_Customer_Agent_FAQ

export default function AgentLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Top Navbar */}
      <AgentNavbar />
      
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <main className="ml-64 mt-16 p-8">
        {children}
      </main>
    </div>
  );
}
