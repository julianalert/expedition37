'use client'

import { useState, useEffect } from 'react'
import getCityByName from '@/lib/getCityByName'

interface BestTimeToVisitProps {
  placeName: string
}

export default function BestTimeToVisit({ placeName }: BestTimeToVisitProps) {
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
              <div className="text-lg text-gray-600">Loading travel information...</div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
              <p className="text-gray-600">Unable to load travel information.</p>
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Best time to visit {city.name}
              </h2>
              <p className="text-gray-600">
                Plan your perfect trip with our seasonal guide and weather insights
              </p>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Weather overview */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Climate Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-900">Peak Season</span>
                    <span className="text-blue-700">Dec - Feb</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-900">Shoulder Season</span>
                    <span className="text-green-700">Mar - May, Sep - Nov</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium text-yellow-900">Low Season</span>
                    <span className="text-yellow-700">Jun - Aug</span>
                  </div>
                </div>
              </div>

              {/* Monthly breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Monthly Guide</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">January - March</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Best weather</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">April - June</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Good prices</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">July - September</span>
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Rainy season</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">October - December</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Shoulder season</span>
                  </div>
                </div>
              </div>

              {/* Travel tips */}
              <div className="lg:col-span-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Travel Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🌟 Peak Season (Dec - Feb)</h4>
                    <p className="text-sm text-gray-600">Perfect weather, but higher prices and crowds. Book accommodation early.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">💰 Shoulder Season (Mar - May, Sep - Nov)</h4>
                    <p className="text-sm text-gray-600">Great balance of good weather and reasonable prices. Ideal for most travelers.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🌧️ Low Season (Jun - Aug)</h4>
                    <p className="text-sm text-gray-600">Lowest prices but expect rain. Good for budget travelers who don't mind weather.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">📅 Book in Advance</h4>
                    <p className="text-sm text-gray-600">For peak season, book 2-3 months ahead. Shoulder season: 1-2 months is usually fine.</p>
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
