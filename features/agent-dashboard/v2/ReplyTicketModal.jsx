"use client"
import React, { useState } from 'react'
import { X, Send, AlertCircle } from 'lucide-react'
import { useAgentState } from './AgentProvider'
import { submitReply,updateTicketStatus } from './action'

export default function ReplyTicketModal({ ticket, onClose }) {
  const {updateTicket } = useAgentState()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { 
      openModal, 
      closeModal, 
    } = useAgentState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setError('')
    setLoading(true)
    try {
      const userInfo = localStorage.getItem('user');
      const parsedUser = JSON.parse(userInfo);
      if(!parsedUser){
        throw new Error('User not found. Please log in again.')
      }
                     await updateTicketStatus(ticket.ticket_id, 'Awaiting Customer Reply');
      const result = await submitReply(ticket.ticket_id, message, parsedUser.id) // TODO: Get userId from session/auth context  
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send reply')
      }
      // Optionally, update ticket status to 'Awaiting Customer Reply' after agent reply
      const updatedData = { status: 'Awaiting Customer Reply' }
      await updateTicket(ticket.ticket_id, updatedData);

      setMessage('')
      onClose()
      closeModal();
    } catch (error) {
      console.error('Error sending reply:', error)
      setError(error.message || 'Failed to send reply. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Reply to Ticket #{ticket.ticket_id}</h2>
            <p className="text-sm text-gray-600 mt-1">{ticket.subject}</p>
          </div>
          <button
            onClick={()=>{
               onClose()

            }}
            className="text-gray-400 hover:text-gray-600 transition p-1"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your response here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
              disabled={loading}
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-500 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : <>
                <Send className="w-4 h-4" />
                Send Reply
              </>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
