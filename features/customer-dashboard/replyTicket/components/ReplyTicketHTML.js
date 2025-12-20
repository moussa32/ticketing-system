"use client";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";
import { replyTicket } from "../actions/action";
import { useRouter } from "next/navigation";

export default function ReplyTicketHTML({replyMessages}) {
  const [ticket, setTicket] = useState(null);
  const route = useRouter();

  useEffect(()=>{
    const ticketData=sessionStorage.getItem("selectedticket");
    if(ticketData){
      setTicket(JSON.parse(ticketData));
    }
  },[]);

   if (!ticket) return null; 

  // Read ticket info from state
  const ticketId = ticket?.ticketno;
  const subject = ticket?.subject;
  const status = ticket?.status;
  const description = ticket?.description;


async function handleSubmitReply(formData) {
    const res = await replyTicket(formData); 
    if (res.ok) {
      toast.success(res.message);
      setTimeout(() => {
        window.location.reload(); // Reload to show the new reply
      }, 1500); // Delay to allow user to see the toast
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

        {/* TICKET INFO SECTION */}
        <div className="max-w-3xl mx-auto bg-gray-100 p-4 rounded-lg border mb-6">
          <h2 className="text-lg font-semibold mb-2">Ticket Information</h2>

          <p className="text-sm">
            <span className="font-medium">Ticket ID:</span> {ticketId}
          </p>

          <p className="text-sm mt-1">
            <span className="font-medium">Subject:</span> {subject}
          </p>

          <p className="text-sm mt-1">
            <span className="font-medium">Description:</span> {description}
          </p>

          {/* SHOW STATUS */}
          <p className="text-sm mt-1">
            <span className="font-medium">Status:</span> {status}
          </p>
          
        </div>

        {/* CHAT HISTORY */}
         <div className="max-w-3xl mx-auto space-y-4 mb-8">
          {replyMessages && replyMessages.length > 0 ? (
            replyMessages.map((msg, index) => (
              
               <div key={index} className="flex gap-3 items-start">

              {/* ICON */}
              <div>
                {msg.from?.toLowerCase() === "customer" ? (
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                    C
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                    A
                  </div>
                )}
              </div>

              {/* MESSAGE BOX */}
              <div>
                <div
                  className={`p-3 rounded-xl max-w-sm ${
                    msg.from?.toLowerCase() === "customer"
                      ? "bg-white border"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.replymessage}
                </div>

                {/* DATE & TIME */}
                <p className="text-xs text-gray-500 mt-1">{msg.createdat}</p>
              </div>

            </div>

            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </div>

        {/* REPLY FORM */}
        <form
          action={handleSubmitReply}
          className="max-w-3xl mx-auto space-y-6 p-4 bg-white shadow rounded-md"
        >
          <div>
            <input type="hidden" name="ticketId" value={ticketId} />
            <input type="hidden" name="userId" value="1" />
            <input type="hidden" name="status" value={status} />
             {/* Replace with actual user ID */}
            <label className="mb-1 font-medium">
              Your Reply <span className="text-red-500">*</span>
            </label>
            <textarea name="replyMessage"
              className="border rounded-md p-2 h-32 w-full"
              placeholder="Write your reply..."
            ></textarea>
          </div>

          <div>
            <label className="mb-1 font-medium">Attachment (optional)</label>
            <input name="file" type="file" className="border rounded-md p-2 w-full" />
          </div>

          <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Submit Reply
          </button>
          <button
            type="button"
           className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
           onClick={()=>{route.push('/dashboard/customer/viewTicket/')}}
          >
           Cancel
          </button>
          </div>


        </form>

      </main>
    </div>
  );
}
