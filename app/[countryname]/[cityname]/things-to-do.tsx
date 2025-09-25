'use client'

import { useState, useEffect } from 'react'
import getCityByName from '@/lib/getCityByName'

interface ThingsToDoProps {
  placeName: string
  countryName: string
}

export default function ThingsToDo({ placeName, countryName }: ThingsToDoProps) {
  const [city, setCity] = useState<City | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCityByName(placeName).then((cityData) => {
      setCity(cityData)
      setLoading(false)
    })
  }, [placeName])

  // Helper function to parse things to do data
  const parseThingsToDoData = (thingsToDo: ThingsToDoData | string | null | undefined): ThingsToDoData | null => {
    if (!thingsToDo) return null
    
    if (typeof thingsToDo === 'string') {
      try {
        return JSON.parse(thingsToDo)
      } catch (error) {
        console.error('Error parsing things to do data:', error)
        return null
      }
    }
    
    return thingsToDo
  }

  if (loading) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-600">Loading things to do...</div>
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

  const thingsToDoData = parseThingsToDoData(city.thingstodo)

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Things to do in {city.name}
              </h2>
              <p className="text-gray-600">
                Discover the best attractions and experiences {city.name} has to offer
              </p>
            </div>

            {/* Category Grid */}
            <div className="mb-12">
              
              {thingsToDoData?.categories ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {thingsToDoData.categories.map((category, index) => (
                    <a
                      key={category.key}
                      href={`#${category.key}`}
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.getElementById(category.key)
                        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                      className="group p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                          {category.emoji}
                        </div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {category.title}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                // Default fallback categories
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🏛️</div>
                      <div className="text-sm font-medium text-gray-900">Historic Monuments</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🖼️</div>
                      <div className="text-sm font-medium text-gray-900">Museums</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">⛪</div>
                      <div className="text-sm font-medium text-gray-900">Religious Monuments</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🌳</div>
                      <div className="text-sm font-medium text-gray-900">National & Theme Parks</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🏘️</div>
                      <div className="text-sm font-medium text-gray-900">Neighborhoods</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">💸</div>
                      <div className="text-sm font-medium text-gray-900">Free Things to Do</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🍷</div>
                      <div className="text-sm font-medium text-gray-900">Gastronomy</div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🌃</div>
                      <div className="text-sm font-medium text-gray-900">Nightlife</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Categories Content */}
            {thingsToDoData?.categories && (
              <div className="space-y-16">
                {thingsToDoData.categories.map((category) => (
                  <div key={category.key} id={category.key} className="scroll-mt-24">
                    {/* Category Header */}
                    <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border border-indigo-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white rounded-full p-3 shadow-sm">
                          <span className="text-4xl">{category.emoji}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{category.title}</h3>
                      </div>
                      <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">{category.intro}</p>
                    </div>
                    
                    {/* Category Items */}
                    {category.items && category.items.length > 0 ? (
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {category.items.map((item, index) => (
                          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 group-hover:bg-indigo-600 transition-colors"></div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-3 text-lg group-hover:text-indigo-600 transition-colors">{item.name}</h4>
                                <p className="text-gray-600 leading-relaxed">{item.short_desc}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
                        <div className="text-6xl mb-4 opacity-50">{category.emoji}</div>
                        <h4 className="text-lg font-medium text-gray-700 mb-2">Coming Soon!</h4>
                        <p className="text-gray-500 max-w-md mx-auto">
                          We're currently working on adding {category.title.toLowerCase()} recommendations for {city.name}. 
                          Check back soon for curated suggestions in this category.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Fallback message if no data */}
            {!thingsToDoData?.categories && (
              <div className="text-center py-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We're working on adding detailed things to do for {city.name}. 
                  Check back soon for curated recommendations and local insights.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
