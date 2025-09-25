'use client'

import { useState, useEffect } from 'react'
import getCityByName from '@/lib/getCityByName'
import getCountryByName from '@/lib/getCountryByName'
import { CityStructuredData } from '@/components/structured-data'

interface OverviewProps {
  placeName: string
  countryName: string
}

export default function Overview({ placeName, countryName }: OverviewProps) {
  const [city, setCity] = useState<City | null>(null)
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getCityByName(placeName),
      getCountryByName(countryName)
    ]).then(([cityData, countryData]) => {
      setCity(cityData)
      setCountry(countryData)
      setLoading(false)
    })
  }, [placeName, countryName])

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

  const overviewData = parseOverviewData(city.overview)

  return (
    <>
      {/* Structured Data for SEO */}
      {city && country && <CityStructuredData city={city} country={country} />}
      
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
                    {overviewData?.short_desc || `${city.name} is one of the most captivating destinations in ${countryName}. This vibrant city offers visitors an incredible mix of attractions, culture, and experiences that make it a must-visit destination for travelers.`}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">🏳️</div>
                      <div className="text-sm text-gray-600 mt-1">Country</div>
                      <div className="text-lg font-semibold text-gray-900 mt-1">{countryName}</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">⭐</div>
                      <div className="text-sm text-gray-600 mt-1">Overall Rating</div>
                      <div className="text-lg font-semibold text-gray-900 mt-1">{city.overallRating ? `${city.overallRating}/100` : 'N/A'}</div>
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
                          className={`${getRatingColor(city.overallRating || 0)} h-2 rounded-full`}
                          style={{ width: `${city.overallRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{city.overallRating || 0}</span>
                  </div>
                  
                  {/* Cost Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">Cost</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getRatingColor(city.costRating || 0)} h-2 rounded-full`}
                          style={{ width: `${city.costRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{city.costRating || 0}</span>
                  </div>
                  
                  {/* Safety Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">Safety</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getRatingColor(city.safetyRating || 0)} h-2 rounded-full`}
                          style={{ width: `${city.safetyRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{city.safetyRating || 0}</span>
                  </div>
                  
                  {/* Fun Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">Fun</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getRatingColor(city.funRating || 0)} h-2 rounded-full`}
                          style={{ width: `${city.funRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{city.funRating || 0}</span>
                  </div>
                  
                  {/* Food Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 w-20">Food</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getRatingColor(city.foodRating || 0)} h-2 rounded-full`}
                          style={{ width: `${city.foodRating || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{city.foodRating || 0}</span>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="lg:col-span-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect in {city.name}</h3>
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
