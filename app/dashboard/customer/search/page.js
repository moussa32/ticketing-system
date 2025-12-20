"use client"
import { useSearchParams } from "next/navigation";

export default function SearchHome() {
const searchParams = useSearchParams();
const search = searchParams.get("query"); 


// get search results (mock data for now)
const results = [
    {
      title: "Liferay DXP 7.1 End of Life",
      description:
        "This is a reminder that Liferay DXP 7.1 reached end of life on November 13, 2025. Extended Premium Support (EPS) If you have an active EPS subscription, you will continue to receive extended...",
      date: "Nov 19, 2025 1:43 PM",
    },
    {
      title: "2025.11.20 - Service Release Updates",
      description:
        "Service Updates for Liferay Cloud The services update for 2025-11-20 includes a minor update for the backup and database services. DXP Cloud Stack Service Name Previous Release Current Release...",
      date: "Nov 11, 2025 10:36 AM",
    },
    {
      title: "2020.06.25 Services Update 2020.26.1",
      description:
        "Service Updates for Liferay Cloud Version 3 and 4 The services update to 2020.26.1 includes updates to Backup, CI, and Liferay services. Version Compatibility between 3 and 4 For details on service...",
      date: "Jun 26, 2020 4:49 AM",
    },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      
      {/* Banner */}
      <div
  className="w-full h-96 flex flex-col items-center justify-center gap-6
             bg-[url('/img/customer-banner.png')] bg-cover bg-center bg-no-repeat"
>
  <span className="text-white font-medium text-3xl">
    Search Results
  </span>

  <div className="relative w-full max-w-3xl">
    <input
      type="text"
      placeholder="Search..."
      className="w-full py-4 pl-14 pr-6 rounded-full
                 text-gray-800 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-white/60 bg-white" 
                 value={search}
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
         <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
           {results.map((item, index) => (
            <div key={index} className="space-y-2">
              <h2 className="text-xl font-semibold text-blue-600">
                {item.title}
              </h2>

              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>

              <p className="text-gray-500 text-sm">
                <strong>Published Date:</strong> {item.date}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
