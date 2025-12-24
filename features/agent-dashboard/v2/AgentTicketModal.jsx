"use client"
import React, { useState, useEffect } from 'react'
import { X, MessageCircle, Loader, MessageSquare, CheckCircle, Lock, Download, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { fetchTicketWithReplies, closeTicket, startProgress } from './action'
import { useAgentState } from './AgentProvider'
import ReplyTicketModal from './ReplyTicketModal'

export default function AgentTicketModal({ ticket, onClose }) {
  const { refreshTickets, updateTicket} = useAgentState()
  const [currentTicket, setCurrentTicket] = useState(ticket)
  const [replies, setReplies] = useState([])
  const [loadingReplies, setLoadingReplies] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [actionError, setActionError] = useState('')

  useEffect(() => {
    setCurrentTicket(ticket)
  }, [ticket])

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoadingReplies(true)
        const result = await fetchTicketWithReplies(ticket.ticket_id)
        if (result.success) {
          setReplies(result.data.rep_tickets || [])
        } else {
          console.error('Error fetching ticket details:', result.error)
        }
      } catch (error) {
        console.error('Error fetching replies:', error)
      } finally {
        setLoadingReplies(false)
      }
    }

    if (ticket.ticket_id) {
      fetchDetails()
    }
  }, [ticket.ticket_id])

  const getPriorityLabel = (urgencyId) => {
    const map = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Urgent' }
    return map[urgencyId] || 'Unknown'
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  const handleCloseButton = async () => {
    setActionLoading(true)
    setActionError('')
    try {
      
      const result = await closeTicket(currentTicket.ticket_id)
      if (result.success) {
        const updatedData = { status: 'Closed' }
        updateTicket(currentTicket.ticket_id, updatedData)
        setCurrentTicket(prev => ({ ...prev, ...updatedData }))
        onClose()
      } else {
        setActionError(result.error)
      }
    } catch (error) {
      setActionError('Failed to close ticket')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReplyClick = () => {
    // Set status to In Progress when replying, but not if Closed
    if (currentTicket.status !== 'Closed') {
      const updatedData = { status: 'In Progress' }
      setCurrentTicket(prev => ({ ...prev, ...updatedData }))
      updateTicket(currentTicket.ticket_id, updatedData)
    }
    setShowReplyModal(true)
  }

  const handleStartProgress = async () => {
    // Only set to In Progress if not already Closed
    if (currentTicket.status !== 'Closed') {     
      setActionLoading(true)
      setActionError('')
    try {
   const result = await startProgress(currentTicket.ticket_id);
      if (result.success) {
        const updatedData = { status: 'In Progress' }
        updateTicket(currentTicket.ticket_id, updatedData)
        setCurrentTicket(prev => ({ ...prev, ...updatedData }))
      } else {
        setActionError(result.error)
      }
    } catch (error) {
        setActionError('Failed to close ticket')
    } finally {
        setActionLoading(false)
    }

    }
  }




  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ticket #{currentTicket.ticket_id}</h2>
            <p className="text-gray-600 mt-1">{currentTicket.subject}</p>
          </div>
          <button
            onClick={() => {
              onClose()
            }}
            className="text-gray-400 hover:text-gray-600 transition p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
              <Badge className="bg-blue-100 text-blue-800">
                {currentTicket.status}
              </Badge>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Priority</label>
              <Badge className="bg-orange-100 text-orange-800">
                {getPriorityLabel(currentTicket.urgency_id)}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
              {currentTicket.description || 'No description provided'}
            </div>
          </div>

          {/* Attachments */}
          {currentTicket.attachments && currentTicket.attachments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Attachments</label>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {currentTicket.attachments.map((attachment, idx) => (
                  <a
                    key={idx}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded hover:bg-gray-100 transition"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 hover:underline flex-1">
                      {attachment.url.split('/').pop() || 'Attachment'}
                    </span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Customer Info */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Customer</label>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 font-medium">
                {currentTicket.User?.first_name} {currentTicket.User?.last_name}
              </p>
            </div>
          </div>

          {/* Created Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Created Date</label>
            <p className="text-gray-700">{formatDate(currentTicket.created_at)}</p>
          </div>

          {/* Replies Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Replies ({replies.length})</h3>
            </div>

            {loadingReplies ? (
              <div className="text-center py-6 text-gray-500 flex items-center justify-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Loading replies...
              </div>
            ) : replies.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                No replies yet
              </div>
            ) : (
              <div className="space-y-4">
                {replies.map((reply,i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {reply.User?.first_name} {reply.User?.last_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(reply.created_at)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{reply.reply_message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {actionError && (
          <div className="mx-6 mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">{actionError}</p>
          </div>
        )}

        {/* Footer - Action Buttons */}
        <div className="bg-gray-50 border-t border-gray-200 p-6 flex flex-wrap gap-3">
          <button
            onClick={handleReplyClick}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition flex items-center gap-2 disabled:bg-gray-300"
            disabled={actionLoading}
          >
            <MessageSquare className="w-4 h-4" />
            Reply
          </button>
          {currentTicket.status === 'Open' && (
            <button
              onClick={handleStartProgress}
              className="px-4 py-2 text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition disabled:bg-gray-300"
              disabled={actionLoading}
            >
              Mark In Progress
            </button>
          )}

          {currentTicket.status !== 'Closed' && (
            <button
              onClick={handleCloseButton}
              className="px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition flex items-center gap-2 disabled:bg-gray-300"
              disabled={actionLoading}
            >
              <Lock className="w-4 h-4" />
              Close
            </button>
          )}
        </div>
      </div>

      {/* Reply Ticket Modal */}
      {showReplyModal && (
        <ReplyTicketModal 
          ticket={currentTicket} 
          onClose={() => {
            setShowReplyModal(false)}}
        />
      )}
    </div>
  )
}
