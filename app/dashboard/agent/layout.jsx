// import AgentSidebar from "@/components/AgentSidebar";
import AgentNavbar from "../../../features/agent-dashboard/v2/Navebar";
import AdminSidebar from "./../../../components/AdminSidebar";

export default function AgentLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Top Navbar */}
      <AgentNavbar />

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="ml-64 mt-16 p-8">{children}</main>
    </div>
  );
}
