'use client'
import { useState,useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import{ TICKET_STATUSES } from '../../../../app/constants/constants.js';
 
export default function TicketTableHTML({ ticketsList }) {

  const [filterStatus, setfilterStatus] = useState("all")
  const [searchSubject, setSearchSubject] = useState("")
  const [isPending, startTransition] = useTransition();


  const list = Array.isArray(ticketsList) ? ticketsList : [];

  const route = useRouter();

  const filtered = list.filter((t) => {
    const matchesStatus =
      filterStatus === "all"? true: t.status === filterStatus;

    const matchesSubject =
      t.subject.toLowerCase().includes(searchSubject.toLowerCase());

    return matchesStatus && matchesSubject;
  });

  const getPriorityColor=(priority)=>{
    if(priority==="Critical") return "text-red-600 font-semibold";
    if(priority==="High") return "text-orange-600 font-semibold";
    if(priority==="Medium") return "text-yellow-600 font-semibold";
    if(priority==="Low") return "text-green-600 font-semibold";
    return "";
  }

  const handleAddTicket = () => {
    location.href="/dashboard/customer/addTicket";
  }

  const handleViewTicket =(selectedTicketObj)=>{
    // Save ticket in sessionStorage
       const ticketId=selectedTicketObj.ticketno;
       sessionStorage.setItem("selectedticket", JSON.stringify(selectedTicketObj));
       location.href=`/dashboard/customer/replyTicket/${ticketId}`; 
    }


  return (
    <div className="flex flex-col min-h-screen bg-white p-20">
      <div className="relative flex items-center mb-8">
  <h2 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
    Tickets List
  </h2>
     <div className="ml-auto flex gap-4">
        <button
          onClick={handleAddTicket}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          + Add New Ticket
        </button>
        <button
            type="button"
           className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
           onClick={()=>{route.push('/dashboard/customer/')}}
          >
           Cancel
        </button>
      </div>

    </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setfilterStatus(e.target.value)}
          className="border p-2 rounded w-60"
        >
          <option value="all">All</option>
          <option value={TICKET_STATUSES.OPEN}>{TICKET_STATUSES.OPEN}</option>
          <option value={TICKET_STATUSES.IN_PROGRESS}>{TICKET_STATUSES.IN_PROGRESS}</option>
          <option value={TICKET_STATUSES.AWAITING_CUSTOMER_REPLY}>{TICKET_STATUSES.AWAITING_CUSTOMER_REPLY}</option>
          <option value={TICKET_STATUSES.AWAITING_AGENT_REPLY}>{TICKET_STATUSES.AWAITING_AGENT_REPLY}</option>
          <option value={TICKET_STATUSES.CLOSED}>{TICKET_STATUSES.CLOSED}</option>
        </select>

        <input
          type="text"
          placeholder="Search by Subject"
          value={searchSubject}
          onChange={(e) => setSearchSubject(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <caption className="text-left p-2 font-medium">Manage your tickets.</caption>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created At</th>
              
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No tickets found.
                </td>
              </tr>
            ) : (
              filtered.map((data) => (
                <tr key={data.ticketno} className="hover:bg-gray-50 transition">
                  <td className="p-3">{data.ticketno}</td>
                  <td className="p-3"><a href="#" onClick={()=>handleViewTicket(data)} className="text-blue-600 hover:underline">{data.subject}</a></td>
                  <td className="p-3">{data.departmentname}</td>
                  <td className="p-3">{data.categoryname}</td>
                  <td className={`p-3 ${getPriorityColor(data.pirority || data.priority)}`}>{data.priority}</td>
                  <td className="p-3">{data.status}</td>
                  <td className="p-3">{data.createdat}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
