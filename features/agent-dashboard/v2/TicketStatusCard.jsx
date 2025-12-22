"use client"
import React from 'react'
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react'

export default function TicketStatusCard({ icon: Icon, label, value, color, bgColor }) {
  return (
    <div className={`${bgColor} rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
