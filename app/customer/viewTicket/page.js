"use client"

import { useState } from "react"

export default function TicketTableHTML() {
  const tickets = [
    { id: 1, subject: "System Down", department: "IT", status: "Open" },
    { id: 2, subject: "Access Issue", department: "HR", status: "In Progress" },
    { id: 3, subject: "Payment Error", department: "Finance", status: "Closed" },
    { id: 4, subject: "VPN Issue", department: "Network", status: "Open" },
  ]

  const [filterDept, setFilterDept] = useState("all")
  const [searchSubject, setSearchSubject] = useState("")
  const [selectedRows, setSelectedRows] = useState([])

  const filtered = tickets.filter((t) => {
    const matchesDept = filterDept === "all" || t.department === filterDept
    const matchesSubject = t.subject.toLowerCase().includes(searchSubject.toLowerCase())
    return matchesDept && matchesSubject
  })

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selectedRows.length === filtered.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filtered.map((t) => t.id))
    }
  }

  const handleAddTicket = () => {
    location.href="/customer/addTicket";
  }

  const handleViewTicket =()=>{
    location.href="/customer/replyTicket";
  }

  const handleReplyTicket=()=>{
   location.href="/customer/replyTicket"
  }

  const handleDeleteTicket= ()=>{
    console.log("action delete");
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tickets List</h2>

               <button onClick={handleAddTicket}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                 + Add New Ticket
               </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="border p-2 rounded w-60"
        >
          <option value="all">All</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Network">Network</option>
        </select>

        <input
          type="text"
          placeholder="Search by Subject"
          value={searchSubject}
          onChange={(e) => setSearchSubject(e.target.value)}
          className="border p-2 rounded flex-1"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <caption className="text-left p-2 font-medium">Manage your tickets.</caption>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left w-12">
                <input
                  type="checkbox"
                  checked={selectedRows.length > 0 && selectedRows.length === filtered.length}
                  onChange={toggleAll}
                />
              </th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No tickets found.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(t.id)}
                      onChange={() => toggleRow(t.id)}
                    />
                  </td>
                  <td className="p-3">{t.id}</td>
                  <td className="p-3">{t.subject}</td>
                  <td className="p-3">{t.department}</td>
                  <td className="p-3">{t.status}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button onClick={handleViewTicket} className="border px-2 py-1 rounded hover:bg-gray-100">View</button>
                    <button onClick={handleReplyTicket} className="border px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">Edit</button>
                    <button onClick={handleDeleteTicket} className="border px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
