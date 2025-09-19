'use client'

import { useState, useEffect } from 'react'
import getCountryByName from '@/lib/getCountryByName'

interface OverviewProps {
  countryName: string
}

export default function Overview({ countryName }: OverviewProps) {
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCountryByName(countryName).then((data) => {
      setCountry(data)
      setLoading(false)
    })
  }, [countryName])

  if (loading) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-600">Loading overview...</div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!country) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h2>
              <p className="text-gray-600">Unable to load country information.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {country.name} Overview
              </h2>
              <p className="text-gray-600">
                Everything you need to know about traveling to {country.name}
              </p>
            </div>

            {/* Overview content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* About section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {country.name}</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    {country.name} is a fascinating destination that offers travelers a unique blend of culture, 
                    history, and natural beauty. From vibrant cities to stunning landscapes, this country has 
                    something for every type of traveler.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">🏛️</div>
                      <div className="text-sm text-gray-600 mt-1">Rich History</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">🌿</div>
                      <div className="text-sm text-gray-600 mt-1">Natural Beauty</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">🍽️</div>
                      <div className="text-sm text-gray-600 mt-1">Amazing Cuisine</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">🎨</div>
                      <div className="text-sm text-gray-600 mt-1">Vibrant Culture</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick facts */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Continent</span>
                    <span className="font-medium text-gray-900">{country.continent || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Rank</span>
                    <span className="font-medium text-gray-900">#{country.rank || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Weekly Budget</span>
                    <span className="font-medium text-gray-900">{country.weeklyBudget ? `$${country.weeklyBudget}` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Overall Rating</span>
                    <span className="font-medium text-gray-900">{country.overallRating ? `${country.overallRating}/100` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Safe for Travel</span>
                    <span className="font-medium text-gray-900">{country.safe ? 'Yes' : 'Check advisories'}</span>
                  </div>
                </div>
              </div>

              {/* Travel essentials */}
              <div className="lg:col-span-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Travel Essentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">📋 Visa Requirements</h4>
                    <p className="text-sm text-gray-600">Check visa requirements based on your nationality before traveling.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">💉 Health & Safety</h4>
                    <p className="text-sm text-gray-600">Consult your doctor about recommended vaccinations and health precautions.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🔌 Power Plugs</h4>
                    <p className="text-sm text-gray-600">Check the local plug type and voltage to bring appropriate adapters.</p>
                  </div>
                </div>
              </div>

              {/* Popular activities */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Activities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🏛️</div>
                    <div className="text-sm font-medium text-gray-900">Sightseeing</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🥾</div>
                    <div className="text-sm font-medium text-gray-900">Adventure</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🍽️</div>
                    <div className="text-sm font-medium text-gray-900">Food Tours</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">📸</div>
                    <div className="text-sm font-medium text-gray-900">Photography</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
