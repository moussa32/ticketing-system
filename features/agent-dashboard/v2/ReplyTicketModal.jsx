"use client"
import React, { useState } from 'react'
import { X, Send, AlertCircle, Upload, File, Trash2 } from 'lucide-react'
import { useAgentState } from './AgentProvider'
import { submitReplyWithFiles } from './action'

export default function ReplyTicketModal({ ticket, onClose }) {
  const { addReply } = useAgentState()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [attachedFiles, setAttachedFiles] = useState([])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    setAttachedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setError('')
    setLoading(true)
    try {
      // Convert files to base64 for serialization
      const filesData = [];
      for (const file of attachedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const binaryString = String.fromCharCode(...uint8Array);
        const base64String = btoa(binaryString);
        
        filesData.push({
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64String
        });
      }

      const result = await submitReplyWithFiles(ticket.ticket_id, message, 1, filesData) // TODO: Get userId from session/auth context
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send reply')
      }

      addReply(ticket.ticket_id, {
        message,
        createdAt: new Date().toISOString(),
        userId: 1,
        files: attachedFiles.map(f => f.name),
        attachmentCount: attachedFiles.length
      })
      setMessage('')
      setAttachedFiles([])
      onClose()
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
            onClick={onClose}
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

          {/* File Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
              </label>
            </div>
          </div>

          {/* Attached Files List */}
          {attachedFiles.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Attached Files ({attachedFiles.length})</p>
              <div className="space-y-2">
                {attachedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-700 transition"
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
