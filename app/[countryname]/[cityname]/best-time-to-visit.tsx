'use client'

import { useState, useEffect } from 'react'
import getCityByName from '@/lib/getCityByName'
import MonthlyRating from '@/components/monthly-rating'
import TemperatureChart from '@/components/temperature-chart'

interface BestTimeToVisitProps {
  placeName: string
  countryName: string
}

export default function BestTimeToVisit({ placeName, countryName }: BestTimeToVisitProps) {
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
          <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Best time to visit {city.name}
              </h2>
              <p className="text-gray-600">
                Plan your perfect trip with our seasonal guide and weather insights
              </p>
            </div>

            {/* Monthly Rating Component */}
            <MonthlyRating 
              bestTimeToVisit={city.bestTimeToVisit} 
              placeName={city.name}
            />

            {/* Temperature Chart Component */}
            <TemperatureChart 
              temperature={city.temperature} 
              placeName={city.name}
            />

            
          </div>
        </div>
      </div>
    </section>
  )
}
