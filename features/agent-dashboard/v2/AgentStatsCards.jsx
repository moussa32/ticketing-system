"use client"
import React from 'react'
import { AlertCircle, CheckCircle, Clock, Zap, AlertTriangle } from 'lucide-react'
import TicketStatusCard from './TicketStatusCard'
import { useAgentState } from './AgentProvider'

export default function AgentStatsCards() {
  const { stats } = useAgentState()

  const cards = [
    {
      icon: AlertCircle,
      label: 'Assigned to Me',
      value: stats.assigned,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Zap,
      label: 'In Progress',
      value: stats.inProgress,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Clock,
      label: 'Pending Response',
      value: stats.pending,
      color: 'bg-amber-100 text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: CheckCircle,
      label: 'Resolved This Month',
      value: stats.closed,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: AlertTriangle,
      label: 'Urgent Tickets',
      value: stats.urgent,
      color: 'bg-red-100 text-red-600',
      bgColor: 'bg-red-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => (
        <TicketStatusCard
          key={index}
          icon={card.icon}
          label={card.label}
          value={card.value}
          color={card.color}
          bgColor={card.bgColor}
        />
      ))}
    </div>
  )
}
