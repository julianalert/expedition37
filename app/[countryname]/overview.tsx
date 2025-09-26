'use client'

import { useState, useEffect } from 'react'
import getCountryByName from '@/lib/getCountryByName'

interface OverviewProps {
  countryName: string
  initialCountry?: Country | null
}

export default function Overview({ countryName, initialCountry }: OverviewProps) {
  const [country, setCountry] = useState<Country | null>(initialCountry || null)
  const [loading, setLoading] = useState(!initialCountry)

  useEffect(() => {
    // Only fetch if we don't have initial data
    if (!initialCountry) {
      getCountryByName(countryName).then((data) => {
        setCountry(data)
        setLoading(false)
      })
    }
  }, [countryName, initialCountry])

  // Helper function to parse overview data
  const parseOverviewData = (overview: OverviewData | string | null | undefined): OverviewData | null => {
    if (!overview) return null
    
    if (typeof overview === 'string') {
      try {
        return JSON.parse(overview)
      } catch (error) {
        console.error('Error parsing overview data:', error)
        return null
      }
    }
    
    return overview
  }

  // Helper function to get color based on rating score (same as thumbnail)
  const getRatingColor = (score: number): string => {
    if (score >= 75) return 'bg-green-500'    // Good: green (75+)
    if (score >= 50) return 'bg-yellow-500'   // Middle: yellow (50-74)
    if (score >= 30) return 'bg-orange-500'   // Low: orange (30-49)
    return 'bg-red-500'                       // Very low: red (below 30)
  }

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

  const overviewData = parseOverviewData(country.overview)

  return (
    <>      
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
                Your complete guide to visiting {country.name}
              </p>
            </div>

            {/* Overview content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* About section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {country.name}</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    {overviewData?.short_desc || `${country.name} is one of the most captivating destinations in the world. This incredible country offers visitors an amazing mix of attractions, culture, and experiences that make it a must-visit destination for travelers.`}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">🌍</div>
                      <div className="text-sm text-gray-600 mt-1">Continent</div>
                      <div className="text-lg font-semibold text-gray-900 mt-1">{country.continent}</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">💰</div>
                      <div className="text-sm text-gray-600 mt-1">Weekly Budget</div>
                      <div className="text-lg font-semibold text-gray-900 mt-1">{country.weeklyBudget ? `$${country.weeklyBudget}` : 'Varies'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating bars */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ratings</h3>
                <div className="space-y-4">
                  {/* Overall Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">Overall</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getRatingColor(country.overallRating || 0)} h-2 rounded-full`}
                          style={{ width: `${country.overallRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{country.overallRating || 0}</span>
                  </div>
                  
                  {/* Cost Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">Cost</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getRatingColor(country.costRating || 0)} h-2 rounded-full`}
                          style={{ width: `${country.costRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{country.costRating || 0}</span>
                  </div>
                  
                  {/* Safety Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">Safety</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getRatingColor(country.safetyRating || 0)} h-2 rounded-full`}
                          style={{ width: `${country.safetyRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{country.safetyRating || 0}</span>
                  </div>
                  
                  {/* Fun Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">Fun</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getRatingColor(country.funRating || 0)} h-2 rounded-full`}
                          style={{ width: `${country.funRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{country.funRating || 0}</span>
                  </div>
                  
                  {/* Food Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">Food</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getRatingColor(country.foodRating || 0)} h-2 rounded-full`}
                          style={{ width: `${country.foodRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{country.foodRating || 0}</span>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="lg:col-span-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect in {country.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {overviewData?.what_to_expect?.length ? (
                    overviewData.what_to_expect.map((item, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">🏛️ Must-See Destinations</h4>
                        <p className="text-sm text-gray-600">Discover iconic cities, landmarks, and historic sites that define the country's character.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">🍕 Culinary Journey</h4>
                        <p className="text-sm text-gray-600">Experience authentic local cuisine and regional specialties across different areas.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">🚗 Getting Around</h4>
                        <p className="text-sm text-gray-600">Navigate the country with various transport options from trains to rental cars.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Top experiences */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Experiences</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {overviewData?.top_experiences?.length ? (
                    overviewData.top_experiences.map((experience, index) => (
                      <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">{experience.emoji}</div>
                        <div className="text-sm font-medium text-gray-900">{experience.name}</div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">🏛️</div>
                        <div className="text-sm font-medium text-gray-900">Historic Tours</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">🌄</div>
                        <div className="text-sm font-medium text-gray-900">Nature Tours</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">🛍️</div>
                        <div className="text-sm font-medium text-gray-900">Shopping</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-2">🌃</div>
                        <div className="text-sm font-medium text-gray-900">City Life</div>
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
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}