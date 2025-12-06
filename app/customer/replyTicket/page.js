export default function TicketReplyHTML() {
  // Example messages (latest first)
  const messages = [
    {
      id: 4,
      from: "agent",
      text: "Thank you, we will check it now.",
      time: "2025-12-04 09:15 AM",
    },
    {
      id: 3,
      from: "customer",
      text: "The system goes down every 10 minutes.",
      time: "2025-12-04 09:10 AM",
    },
    {
      id: 2,
      from: "agent",
      text: "Hello! Can you please explain more about the issue?",
      time: "2025-12-04 09:02 AM",
    },
    {
      id: 1,
      from: "customer",
      text: "Hello, I have an issue with my system.",
      time: "2025-12-04 09:00 AM",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="flex items-center justify-center p-4 bg-white border-b border-gray-300 text-black">
        <h1 className="text-xl font-semibold">Reply Ticket</h1>
      </header>

      <main className="flex-1 p-6">

        {/* CHAT HISTORY */}
        <div className="max-w-3xl mx-auto space-y-4 mb-8">

          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 items-start">

              {/* ICON */}
              <div>
                {msg.from === "customer" ? (
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                    👤
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                    🎧
                  </div>
                )}
              </div>

              {/* MESSAGE BOX */}
              <div>
                <div
                  className={`p-3 rounded-xl max-w-sm ${
                    msg.from === "customer"
                      ? "bg-white border"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>

                {/* DATE & TIME */}
                <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
              </div>

            </div>
          ))}

        </div>

        {/* REPLY FORM */}
        <div className="max-w-3xl mx-auto space-y-6 p-4 bg-white shadow rounded-md">
          <div>
            <label className="mb-1 font-medium">
              Your Reply <span className="text-red-500">*</span>
            </label>
            <textarea
              className="border rounded-md p-2 h-32 w-full"
              placeholder="Write your reply..."
            ></textarea>
          </div>

          <div>
            <label className="mb-1 font-medium">Attachment (optional)</label>
            <input type="file" className="border rounded-md p-2 w-full" />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Reply
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
