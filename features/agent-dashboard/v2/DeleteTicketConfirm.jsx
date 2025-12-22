"use client"
import React, { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function DeleteTicketConfirm({ ticket, onClose, onDelete }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      // TODO: Call delete ticket action
      console.log('Delete ticket:', ticket.ticket_id)
      if (onDelete) {
        onDelete(ticket.ticket_id)
      }
      onClose()
    } catch (error) {
      console.error('Error deleting ticket:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full">
        {/* Content */}
        <div className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-red-100 rounded-full p-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">Delete Ticket?</h3>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete ticket #{ticket.ticket_id}? This action cannot be undone.
            </p>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 disabled:bg-gray-300 rounded-lg font-medium transition"
            >
              {loading ? 'Deleting...' : 'Delete Ticket'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
