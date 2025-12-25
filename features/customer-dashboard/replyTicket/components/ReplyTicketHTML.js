"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { replyTicket, fetchTicketDetails,deleteTicketAction } from "../actions/action";
import { useRouter } from "next/navigation";
import { TICKET_STATUSES } from "@/app/constants/constants";

export default function ReplyTicketHTML({ replyMessages }) {
  const [ticket, setTicket] = useState(null);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const route = useRouter();

  useEffect(() => {
    const ticketData = sessionStorage.getItem("selectedticket");
    if (ticketData) {
      const parsedTicket = JSON.parse(ticketData);
      setTicket(parsedTicket);
      setStatus(parsedTicket.status);
    }

    const userInfo = localStorage.getItem("user");
    const parsedUser = JSON.parse(userInfo);
    if (parsedUser) setUser(parsedUser);
  }, []);

  if (!ticket) return null;

  const ticketId = ticket?.ticketno;
  const subject = ticket?.subject;
  const description = ticket?.description;

  async function handleSubmitReply(formData) {
    formData.append("userId", user?.id);
    const res = await replyTicket(formData);
    sessionStorage.removeItem("selectedticket");

    const ticketDetails = await fetchTicketDetails(formData.get("ticketId"));
    if (ticketDetails.ok) {
      setTicket(ticketDetails.data);
      sessionStorage.setItem("selectedticket", JSON.stringify(ticketDetails.data));
    }
     ticketDetails.data.status===TICKET_STATUSES.OPEN ? setStatus(TICKET_STATUSES.OPEN) : setStatus(TICKET_STATUSES.AWAITING_AGENT_REPLY);

    if (res.ok) {
      toast.success(res.message);
      setTimeout(() => route.refresh(), 500);
    } else {
      toast.error(res.message);
    }
  }

  async function handleDeleteTicket(ticket){
    if (!confirm("Are you sure you want to delete this ticket?")) return;

      const res =await deleteTicketAction(ticket);
    if (res.ok) {
      toast.success(res.message);
      setTimeout(() => {
        route.push('/dashboard/customer/viewTicket/');
      }, 500);
    }
    else toast.error(res.message);
    
  } 


  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* PAGE HEADER */}
      <header className="flex items-center justify-center p-4 bg-white border-b border-gray-300">
        <h1 className="text-xl font-semibold">Reply Ticket</h1>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-6 items-stretch">

          {/* RIGHT COLUMN — TICKET INFO */}
          <div className="bg-gray-100 p-4 rounded-lg border w-full md:w-1/3 h-[500px] overflow-y-auto space-y-3">
  <h2 className="text-lg font-semibold mb-3">Ticket Information</h2>
  <p className="text-md"><span className="font-medium">Ticket ID:</span> {ticketId}</p>
  <p className="text-md"><span className="font-medium">Subject:</span> {subject}</p>
  <p className="text-md"><span className="font-medium">Description:</span> {description}</p>
  <p className="text-md"><span className="font-medium">Status:</span> {status}</p>
  {ticket.attachurl ? (
  <p className="text-md">
    <span className="font-medium">Attachments:</span>
    <a href={`${ticket.attachurl}`} target="_blank" className="p-2 underline mt-6 text-blue-700">{"View Attachment"}
    </a>
  </p>
) : (
  <p className="text-center text-gray-500">No attachments yet.</p>
)}
</div>

          {/* LEFT COLUMN — CHAT + REPLY */}
          <div className="flex-1 flex flex-col gap-6">

            {/* CHAT HISTORY */}
            <div className="space-y-4">
              {replyMessages && replyMessages.length > 0 ? (
                replyMessages.map((msg, index) => (
                  <div key={index} className="flex gap-3 items-start">

                    {/* ICON */}
                    <div>
                      {msg.from?.toLowerCase() === "customer" ? (
                        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">C</div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">A</div>
                      )}
                    </div>

                    {/* MESSAGE BOX */}
                    <div>
                      <div>
                        {msg.replymessage}

                        {/* ATTACHMENT */}
                        {msg.url && (
                          <a href={`${msg.url}`} target="_blank" className="text-sm underline mt-2 block text-blue-700">
                             {"View Attachment"}
                          </a>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 mt-1">{msg.createdat}</p>
                    </div>

                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No messages yet.</p>
              )}
            </div>

            {/* REPLY FORM */}
            {status !== TICKET_STATUSES.CLOSED && (
              <form action={handleSubmitReply} className="space-y-6 p-4 bg-white shadow rounded-md">
                <input type="hidden" name="ticketId" value={ticketId} />
                <input type="hidden" name="userId" value={user?.id} />
                <input type="hidden" name="status" value={status} />

                <div>
                  <label className="mb-1 font-medium">Your Reply <span className="text-red-500">*</span></label>
                  <textarea name="replyMessage" className="border rounded-md p-2 h-32 w-full" placeholder="Write your reply..." required></textarea>
                </div>

                <div>
                  <label className="mb-1 font-medium">Attachment (optional)</label>
                  <input name="file" type="file" className="border rounded-md p-2 w-full" />
                  {/* Disclaimer */}
                  <p className="text-xs text-gray-500 mt-1">
                    Max size: <span className="font-semibold">5MB</span> — Allowed types:
                    <span className="font-semibold"> PNG, JPG, JPEG, PDF, ZIP</span>.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">Submit Reply</button>
                  {TICKET_STATUSES.OPEN === status && (<button type="button" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-gray-400 cursor-pointer" onClick={() => handleDeleteTicket(ticket)}>Delete</button>)}
                  <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer" onClick={() => route.push('/dashboard/customer/viewTicket/')}>Cancel</button>
                </div>
              </form>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
