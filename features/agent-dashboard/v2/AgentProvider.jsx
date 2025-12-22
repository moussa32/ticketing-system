"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchAgentTickets } from './action'

export const AgentContext = createContext()

export function useAgentState() {
  const context = useContext(AgentContext)
  if (!context) {
    throw new Error('useAgentState must be used within AgentProvider')
  }
  return context
}

export function AgentProvider({ children }) {
  // Tickets state
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal states
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)

  // Stats state
  const [stats, setStats] = useState({
    assigned: 0,
    inProgress: 0,
    pending: 0,
    closed: 0,
    urgent: 0
  })

  // Fetch tickets on mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await fetchAgentTickets()
        if (result.success) {
          setTickets(result.data || [])
          updateStats(result.data || [])
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching tickets:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  // Calculate stats from tickets
  const updateStats = (ticketsList) => {
    const newStats = {
      open: ticketsList.filter(t => t.status === 'Open').length,
      inProgress: ticketsList.filter(t => t.status === 'In Progress').length,
      pending: ticketsList.filter(t => t.status === 'Pending').length,
      resolved: ticketsList.filter(t => t.status === 'Resolved').length,
      closed: ticketsList.filter(t => t.status === 'Closed').length
    }
    setStats(newStats)
  }

  // Ticket actions
  const updateTicket = (ticketId, updates) => {
    setTickets(prev => {
      const updated = prev.map(t =>
        t.ticket_id === ticketId ? { ...t, ...updates } : t
      )
      updateStats(updated)
      return updated
    })
  }

  const deleteTicket = (ticketId) => {
    setTickets(prev => {
      const updated = prev.filter(t => t.ticket_id !== ticketId)
      updateStats(updated)
      return updated
    })
  }

  const addReply = (ticketId, reply) => {
    // This would typically append to a replies array
    console.log(`Reply added to ticket ${ticketId}:`, reply)
  }

  // Modal actions
  const openModal = (type, ticket) => {
    setSelectedTicket(ticket)
    setModalType(type)
    setOpenDropdown(null)
  }

  const closeModal = () => {
    setSelectedTicket(null)
    setModalType(null)
  }

  const toggleDropdown = (ticketId) => {
    setOpenDropdown(openDropdown === ticketId ? null : ticketId)
  }

  const refreshTickets = async () => {
    try {
      setLoading(true)
      const result = await fetchAgentTickets()
      if (result.success) {
        setTickets(result.data || [])
        updateStats(result.data || [])
      }
    } catch (err) {
      console.error('Error refreshing tickets:', err)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    // Tickets
    tickets,
    loading,
    error,
    
    // Stats
    stats,
    
    // Modal state
    selectedTicket,
    modalType,
    openDropdown,
    
    // Actions
    updateTicket,
    deleteTicket,
    addReply,
    openModal,
    closeModal,
    toggleDropdown,
    refreshTickets
  }

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  )
}
