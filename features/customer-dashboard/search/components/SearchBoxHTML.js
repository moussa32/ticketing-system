"use client";
export async function SearchBoxHTML({ search, results = [] }) {


  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Implement search functionality here
      location.href="/dashboard/customer/search?query="+e.target.value;
    }
  };

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
                onKeyDown={onKeyPress}
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
                {item.question}
              </h2>

              <p className="text-gray-700 leading-relaxed">
                {item.answer}
              </p>

              <p className="text-gray-500 text-sm">
                <strong>Published Date:</strong> {item.createdat}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
    );
}
