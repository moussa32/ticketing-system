"use client"

export default function DashboardHome() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      
      {/* Banner */}
      <div
  className="w-full h-96 flex flex-col items-center justify-center gap-6
             bg-[url('/img/customer-banner.png')] bg-cover bg-center bg-no-repeat"
>
  <span className="text-white font-medium text-3xl">
    Welcome to Customer Portal
  </span>

  <div className="relative w-full max-w-3xl">
    <input
      type="text"
      placeholder="Search..."
      className="w-full py-4 pl-14 pr-6 rounded-full
                 text-gray-800 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-white/60 bg-white" 
    />

    {/* Search Icon */}
    <svg
      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </div>
</div>

      {/* Main Section */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto px-6 py-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  
      <a href="/dashboard/customer/addTicket"
        className="bg-blue-50 rounded-2xl p-8 text-center
                   hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex justify-center mb-4">
          <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 12a8 8 0 0116 0" />
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 12v4a2 2 0 002 2h2v-6H6a2 2 0 00-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M20 12v4a2 2 0 01-2 2h-2v-6h2a2 2 0 012 2z" />
        </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Submit a Ticket
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          Need help? Log an issue or ask a question.
        </p>
      </a>

      <a href="/dashboard/customer/viewTicket"
        className="bg-blue-50 rounded-2xl p-8 text-center
                   hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex justify-center mb-4">
          <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 7h16v4a2 2 0 010 4v4H4v-4a2 2 0 010-4V7z" />
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 7v10" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          My Tickets
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          Track open and closed support requests.
        </p>
      </a>

      <div
        className="bg-blue-50 rounded-2xl p-8 text-center
                   hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex justify-center mb-4">
          <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16v12H7l-3 3V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 10h6M9 14h4"
              />
          </svg>

        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          FAQs
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          You can find answers to common questions here.
        </p>
      </div>
  </div>
</div>
      </main>
    </div>
  );
}
