'use client'

import { useState, useEffect } from 'react'
import getCityByName from '@/lib/getCityByName'

interface OverviewProps {
  placeName: string
  countryName: string
}

export default function Overview({ placeName, countryName }: OverviewProps) {
  const [city, setCity] = useState<City | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCityByName(placeName).then((data) => {
      setCity(data)
      setLoading(false)
    })
  }, [placeName])

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

  if (!city) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">City not found</h2>
              <p className="text-gray-600">Unable to load city information.</p>
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
                {city.name} Overview
              </h2>
              <p className="text-gray-600">
                Your complete guide to visiting {city.name}, {countryName}
              </p>
            </div>

            {/* Overview content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* About section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {city.name}</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    {city.name} is one of the most captivating destinations in {countryName}. 
                    This vibrant city offers visitors an incredible mix of attractions, culture, 
                    and experiences that make it a must-visit destination for travelers.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">🏛️</div>
                      <div className="text-sm text-gray-600 mt-1">Historic Sites</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">🌆</div>
                      <div className="text-sm text-gray-600 mt-1">City Views</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">🍽️</div>
                      <div className="text-sm text-gray-600 mt-1">Local Cuisine</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">🎭</div>
                      <div className="text-sm text-gray-600 mt-1">Arts & Culture</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick facts */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">{countryName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Best known for</span>
                    <span className="font-medium text-gray-900">Culture & History</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Ideal visit duration</span>
                    <span className="font-medium text-gray-900">2-4 days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Transportation</span>
                    <span className="font-medium text-gray-900">Public transport</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Budget level</span>
                    <span className="font-medium text-gray-900">Moderate</span>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="lg:col-span-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect in {city.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🏛️ Must-See Attractions</h4>
                    <p className="text-sm text-gray-600">Discover iconic landmarks, museums, and historic sites that define the city's character.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🍕 Local Food Scene</h4>
                    <p className="text-sm text-gray-600">Experience authentic local cuisine at traditional restaurants and street food markets.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🚶‍♂️ Getting Around</h4>
                    <p className="text-sm text-gray-600">Navigate the city easily with public transport, walking tours, or bike rentals.</p>
                  </div>
                </div>
              </div>

              {/* Top experiences */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Experiences</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🏛️</div>
                    <div className="text-sm font-medium text-gray-900">Historic Tours</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🎨</div>
                    <div className="text-sm font-medium text-gray-900">Art Galleries</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🛍️</div>
                    <div className="text-sm font-medium text-gray-900">Shopping</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🌃</div>
                    <div className="text-sm font-medium text-gray-900">Nightlife</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🥘</div>
                    <div className="text-sm font-medium text-gray-900">Food Tours</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🚶‍♂️</div>
                    <div className="text-sm font-medium text-gray-900">Walking Tours</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">📸</div>
                    <div className="text-sm font-medium text-gray-900">Photography</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-2">🏞️</div>
                    <div className="text-sm font-medium text-gray-900">Day Trips</div>
                  </div>
                </div>
              </div>

              {/* Travel tips */}
              <div className="lg:col-span-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mt-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Travel Tips for {city.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">🚇</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Public Transport</h4>
                      <p className="text-sm text-gray-600">Get a city pass for convenient travel</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">🏨</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Best Areas</h4>
                      <p className="text-sm text-gray-600">Stay in the city center for easy access</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm">💰</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Budget Tips</h4>
                      <p className="text-sm text-gray-600">Many attractions offer student discounts</p>
                    </div>
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
