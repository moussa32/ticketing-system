"use client"
import React, { useState, useEffect, useContext } from 'react'
import AgentTicketsTable from '../../../features/agent-dashboard/v2/AgentTicketsTable';
import { AgentProvider, AgentContext } from '../../../features/agent-dashboard/v2/AgentProvider'
import TicketStatusCards from '../../../features/admin-dashboard/tickets/components/TicketStatusCards';

function PageContent() {
  const { stats, loading } = useContext(AgentContext)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Stats Cards */}
        {!loading && <TicketStatusCards stats={stats} />}
        {/* Tickets Table */}
        <div className="mt-8">
          <AgentTicketsTable />
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <AgentProvider>
      <PageContent />
    </AgentProvider>
  )
}