"use client"
import React, { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { TICKET_STATUSES } from '../../../app/constants/constants.js';

export default function TicketFilter({ onFilterChange, activeFilters }) {
  const [isOpen, setIsOpen] = useState(false)

  const filters = [
    {
      id: 'status-open',
      label: `${TICKET_STATUSES.OPEN}`,
      category: 'Status',
      value: `${TICKET_STATUSES.OPEN}`
    },
    {
      id: 'status-inprogress',
      label: `${TICKET_STATUSES.IN_PROGRESS}`,
      category: 'Status',
      value: `${TICKET_STATUSES.IN_PROGRESS}`
    },
    {
      id: 'status-awaitingcustomer',
      label: `${TICKET_STATUSES.AWAITING_CUSTOMER_REPLY}`,
      category: 'Status',
      value: `${TICKET_STATUSES.AWAITING_CUSTOMER_REPLY}`
    },
    {
      id: 'status-awaitingagent',
      label: `${TICKET_STATUSES.AWAITING_AGENT_REPLY}`,
      category: 'Status',
      value: `${TICKET_STATUSES.AWAITING_AGENT_REPLY}`
    },
    {
      id: 'status-closed',
      label: `${TICKET_STATUSES.CLOSED}`,
      category: 'Status',
      value: `${TICKET_STATUSES.CLOSED}`
    },
    {
      id: 'sort-latest',
      label: 'Latest',
      category: 'Sort',
      value: 'latest'
    },
    {
      id: 'sort-oldest',
      label: 'Oldest',
      category: 'Sort',
      value: 'oldest'
    },
    {
      id: 'sort-updated',
      label: 'Last Updated',
      category: 'Sort',
      value: 'updated'
    }
  ]

  const handleFilterClick = (filter) => {
    const isActive = activeFilters.some(f => f.id === filter.id)
    
    if (filter.category === 'Sort') {
      // For sort filters, replace previous sort
      const newFilters = activeFilters.filter(f => f.category !== 'Sort')
      if (!isActive) {
        newFilters.push(filter)
      }
      onFilterChange(newFilters)
    } else {
      // For status filters, toggle
      if (isActive) {
        onFilterChange(activeFilters.filter(f => f.id !== filter.id))
      } else {
        onFilterChange([...activeFilters, filter])
      }
    }
  }

  const handleClearAll = () => {
    onFilterChange([])
  }

  const handleRemoveFilter = (filterId) => {
    onFilterChange(activeFilters.filter(f => f.id !== filterId))
  }

  return (
    <div className="space-y-3">
      {/* Filter Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <span className="text-sm font-medium text-gray-700">Filters</span>
            <ChevronDown className={`w-4 h-4 transition ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 space-y-3">
                {/* Status Filters */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Status</p>
                  <div className="space-y-2">
                    {filters.filter(f => f.category === 'Status').map(filter => (
                      <label key={filter.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilters.some(f => f.id === filter.id)}
                          onChange={() => handleFilterClick(filter)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{filter.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort Filters */}
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Sort By</p>
                  <div className="space-y-2">
                    {filters.filter(f => f.category === 'Sort').map(filter => (
                      <label key={filter.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          checked={activeFilters.some(f => f.id === filter.id)}
                          onChange={() => handleFilterClick(filter)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{filter.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear All Button */}
                {activeFilters.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="w-full mt-3 px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Active Filter Tags */}
        {activeFilters.map(filter => (
          <div
            key={filter.id}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full"
          >
            <span className="text-sm text-blue-700 font-medium">{filter.label}</span>
            <button
              onClick={() => handleRemoveFilter(filter.id)}
              className="p-0.5 hover:bg-blue-100 rounded transition"
            >
              <X className="w-3 h-3 text-blue-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
