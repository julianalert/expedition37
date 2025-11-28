'use client'

import { useState } from 'react'

const tabs = [
  { id: 'itinerary', name: 'Itinerary Generator', enabled: true },
  { id: 'budget', name: 'Budget Calculator', enabled: true },
  { id: 'nearme', name: 'Near Me', enabled: true },
  { id: 'quiz', name: 'Where Should I Go?', enabled: true },
  { id: 'roadtrip', name: 'Road Trip Calculator', enabled: false },
  { id: 'flight', name: 'Flight Time Calculator', enabled: false },
  { id: 'packing', name: 'Packing List', enabled: false },
  { id: 'currency', name: 'Currency Converter', enabled: false },
  { id: 'timezone', name: 'Time Difference', enabled: false },
]

interface TravelToolsTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function TravelToolsTabs({ activeTab, onTabChange }: TravelToolsTabsProps) {

  return (
    <section className="border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => tab.enabled && onTabChange(tab.id)}
                disabled={!tab.enabled}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex-shrink-0 flex items-center gap-2
                  ${isActive && tab.enabled
                    ? 'border-indigo-500 text-indigo-600 cursor-pointer'
                    : tab.enabled
                    ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                    : 'border-transparent text-gray-400 cursor-not-allowed'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{tab.name}</span>
                {!tab.enabled && (
                  <span className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-md border border-purple-200">
                    Coming Soon
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
