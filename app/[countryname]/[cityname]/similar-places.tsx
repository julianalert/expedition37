'use client'

import { useState, useEffect } from 'react'
import getAllCities from '@/lib/getAllCities'
import getAllCountries from '@/lib/getAllCountries'
import { getSimilarCities } from '@/lib/similarityUtils'
import CityItem from '@/app/(default)/city-item'

interface SimilarPlacesProps {
  city: City | null
  country: Country | null
}

export default function SimilarPlaces({ city, country }: SimilarPlacesProps) {
  const [loading, setLoading] = useState(true)
  const [similarCities, setSimilarCities] = useState<Array<{city: City, country: Country, similarity: number}>>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!city || !country) {
        setLoading(false)
        return
      }
      
      setLoading(true)
      try {
        // Get all cities and countries for similarity calculation
        const [allCities, allCountries] = await Promise.all([
          getAllCities(),
          getAllCountries()
        ])
        
        const similar = getSimilarCities(city, country, allCities, allCountries, 12)
        setSimilarCities(similar)
      } catch (error) {
        setSimilarCities([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [city, country])

  if (loading) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              {/* Spinner Icon */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              {/* Loading Message */}
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 mb-1">Finding similar places...</div>
                <div className="text-sm text-gray-600">Analyzing matching cities based on vibe, budget, and experiences</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!city || !country) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
              <p className="text-gray-600">Unable to load destination information.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>      
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="max-w-6xl">
            {/* Section title */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Alternatives To {city.name}
              </h1>
              <p className="text-gray-600">
                Discover destinations with similar vibes, budgets, and experiences.
              </p>
            </div>

            {/* Section subtitle */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Top 12 matching places
              </h2>
            </div>

            {/* Similar places grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCities.map(({ city: similarCity, country: similarCountry, similarity }) => (
                <div key={similarCity.id} className="relative">
                  {/* Use existing CityItem component */}
                  <CityItem 
                    {...similarCity}
                    countryNameProp={similarCountry.name}
                    thumbnail={similarCity.thumbnail || similarCity.image}
                    hideCountryTag={true}
                  />
                  
                  {/* Similarity Badge - positioned where country tag was */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-white/90 backdrop-blur-sm text-indigo-600 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                      {Math.round(similarity * 100)}% match
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
