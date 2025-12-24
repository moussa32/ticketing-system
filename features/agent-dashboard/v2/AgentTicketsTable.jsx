"use client"
import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MoreVertical, Edit, Trash2, Eye } from 'lucide-react'
import AgentTicketModal from './AgentTicketModal'
import UpdateTicketModal from './UpdateTicketModal'
import TicketFilter from './TicketFilter'
import { useAgentState } from './AgentProvider'
import { TICKET_STATUSES } from '../../../app/constants/constants.js';


export default function AgentTicketsTable() {
  const { 
    tickets, 
    loading, 
    selectedTicket, 
    modalType, 
    openDropdown,
    openModal, 
    closeModal, 
    toggleDropdown,
    deleteTicket,
    updateTicket
  } = useAgentState()

  const [activeFilters, setActiveFilters] = useState([])

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString || 'N/A'
    }
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      [TICKET_STATUSES.OPEN]: 'bg-blue-100 text-blue-800',
      [TICKET_STATUSES.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800',
      [TICKET_STATUSES.AWAITING_CUSTOMER_REPLY]: 'bg-purple-100 text-purple-800',
      [TICKET_STATUSES.AWAITING_AGENT_REPLY]: 'bg-green-100 text-green-800',
      [TICKET_STATUSES.CLOSED]: 'bg-gray-100 text-gray-800'
    }
    return (
      <Badge className={`font-medium border-0 ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </Badge>
    )
  }

  const getPriorityBadge = (urgencyId) => {
    const priorityMap = {
      1: { label: 'Low', color: 'bg-gray-100 text-gray-700' },
      2: { label: 'Medium', color: 'bg-blue-100 text-blue-700' },
      3: { label: 'High', color: 'bg-orange-100 text-orange-700' },
      4: { label: 'Urgent', color: 'bg-red-100 text-red-700' }
    }
    const priority = priorityMap[urgencyId] || { label: 'Unknown', color: 'bg-gray-100' }
    return (
      <Badge className={`font-medium border-0 ${priority.color}`}>
        {priority.label}
      </Badge>
    )
  }

  const handleDelete = (ticketId) => {
    deleteTicket(ticketId)
    closeModal()
  }

  // Filter and sort tickets
  const filteredTickets = useMemo(() => {
    let result = [...tickets]

    // Apply status filters
    const statusFilters = activeFilters.filter(f => f.category === 'Status')
    if (statusFilters.length > 0) {
      const statusValues = statusFilters.map(f => f.value)
      result = result.filter(ticket => statusValues.includes(ticket.status))
    }

    // Apply sorting
    const sortFilter = activeFilters.find(f => f.category === 'Sort')
    if (sortFilter) {
      if (sortFilter.value === 'latest') {
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      } else if (sortFilter.value === 'oldest') {
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      } else if (sortFilter.value === 'updated') {
        result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      }
    } else {
      // Default: sort by latest
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }

    return result
  }, [tickets, activeFilters])

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <p className="text-gray-500">Loading tickets...</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">My Tickets</h2>
              <p className="text-sm text-gray-500">Manage and track all tickets assigned to you</p>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredTickets.length} of {tickets.length} tickets
            </div>
          </div>
          <TicketFilter onFilterChange={setActiveFilters} activeFilters={activeFilters} />
        </div>

        <div className="h-full">
          <table className="w-full ">
            <thead>
              <tr className="border-b border-gray-100 hover:bg-transparent">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    {activeFilters.length > 0 ? 'No tickets match your filters' : 'No tickets assigned to you yet'}
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr 
                    key={ticket.ticket_id} 
                    onClick={() => openModal('view', ticket)}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td className="px-6 py-4 font-mono text-gray-600">#{ticket.ticket_id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 max-w-xs truncate">{ticket.subject}</p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(ticket.status)}</td>
                    <td className="px-6 py-4">{getPriorityBadge(ticket.urgency_id)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">
                            {ticket.User?.first_name?.[0]}{ticket.User?.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700">
                          {ticket.User?.first_name} {ticket.User?.last_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(ticket.created_at)}</td>
                    <td className="px-6 py-4">
                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleDropdown(ticket.ticket_id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>

                        {openDropdown === ticket.ticket_id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => openModal('view', ticket)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                            {
                              ticket.status !== TICKET_STATUSES.CLOSED && (
                                 <button
                              onClick={() => openModal('update', ticket)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                              Update
                            </button>
                              )

                            }
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedTicket && modalType === 'view' && (
        <AgentTicketModal ticket={selectedTicket} onClose={closeModal} />
      )}

      {selectedTicket && modalType === 'update' && (
        <UpdateTicketModal ticket={selectedTicket} onClose={closeModal} />
      )}

    </>
  )
}
