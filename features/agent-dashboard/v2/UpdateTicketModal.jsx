"use client"
import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useAgentState } from './AgentProvider'
import { updateTicketData, assignTicket, fetchDepartmentUsers } from './action'

export default function UpdateTicketModal({ ticket, onClose }) {
  const { updateTicket } = useAgentState()
  const [formData, setFormData] = useState({
    subject: ticket.subject,
    description: ticket.description,
    status: ticket.status,
    urgency: ticket.urgency_id,
    assignedTo: ticket.user_id,
  })
  const [departmentUsers, setDepartmentUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [assignError, setAssignError] = useState('')

  // Fetch department users when modal opens
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (ticket.dept_id) {
          const result = await fetchDepartmentUsers(ticket.dept_id)
          if (result && result.success) {
            setDepartmentUsers(result.data || [])
          } else if (result && result.error) {
            console.error('Department users error:', result.error)
            setAssignError(result.error || 'Failed to load department users')
            setDepartmentUsers([])
          } else {
            console.error('Unexpected result:', result)
            setAssignError('Failed to load department users')
            setDepartmentUsers([])
          }
        }
      } catch (error) {
        console.error('Exception fetching department users:', error)
        setAssignError('Failed to load department users')
        setDepartmentUsers([])
      }
    }
    fetchUsers()
  }, [ticket.dept_id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setAssignError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAssignError('')
    try {
      // Update ticket data
      await updateTicketData(ticket.ticket_id, {
        subject: formData.subject,
        description: formData.description,
        status: formData.status,
        urgency_id: parseInt(formData.urgency)
      })

      // Assign ticket if user changed
      if (formData.assignedTo && formData.assignedTo !== ticket.user_id) {
        await assignTicket(ticket.ticket_id, formData.assignedTo)
      }

      updateTicket(ticket.ticket_id, {
        subject: formData.subject,
        description: formData.description,
        status: formData.status,
        urgency_id: parseInt(formData.urgency),
        user_id: formData.assignedTo
      })
      onClose()
    } catch (error) {
      console.error('Error updating ticket:', error)
      setAssignError('Failed to update ticket')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Update Ticket #{ticket.ticket_id}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              >
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
                <option value="4">Urgent</option>
              </select>
            </div>
          </div>

          {/* Assign to User */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Agent</label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="">Select an agent...</option>
              {departmentUsers.map(user => (
                <option key={user.user_id} value={user.user_id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {assignError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {assignError}
            </div>
          )}

          {/* Footer */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-lg font-medium transition"
            >
              {loading ? 'Updating...' : 'Update Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
