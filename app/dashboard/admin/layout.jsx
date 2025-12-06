import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
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
