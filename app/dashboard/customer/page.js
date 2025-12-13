"use client"

export default function DashboardHome() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">

      {/* Banner */}
      <div className="w-full h-48 flex items-center justify-center text-lg bg-white">
        <span className="text-black font-medium text-3xl">Welcome to Customer Portal</span>
      </div>

      {/* Main Section */}
      <main className="flex-1 p-6">

        {/* Main Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          <a
            href="/dashboard/customer/addTicket"
            className="h-24 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 text-lg rounded-lg"
          >
            Create a New Ticket
          </a>

          <a
            href="/dashboard/customer/viewTicket"
            className="h-24 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 text-lg rounded-lg"
          >
            View Tickets
          </a>

        </div>

        {/* Lower Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <a
            href="#"
            className="h-20 flex items-center justify-center border border-gray-400 bg-white hover:bg-gray-50 text-lg rounded-lg"
          >
            FAQ
          </a>

          <a
            href="#"
            className="h-20 flex items-center justify-center border border-gray-400 bg-white hover:bg-gray-50 text-lg rounded-lg"
          >
            Help
          </a>

          <a
            href="#"
            className="h-20 flex items-center justify-center border border-gray-400 bg-white hover:bg-gray-50 text-lg rounded-lg"
          >
            Help
          </a>

        </div>

      </main>
    </div>
  );
}
