'use client'

import { useState, useEffect } from 'react'
import getCountryByName from '@/lib/getCountryByName'
import getCityByName from '@/lib/getCityByName'
import getAllCities from '@/lib/getAllCities'
import getAllCountries from '@/lib/getAllCountries'
import { getSimilarCities } from '@/lib/similarityUtils'
import CityItem from '@/app/(default)/city-item'

interface SimilarPlacesProps {
  placeName: string
  countryName: string
  initialCity?: City | null
  initialCountry?: Country | null
}

export default function SimilarPlaces({ placeName, countryName, initialCity, initialCountry }: SimilarPlacesProps) {
  const [city, setCity] = useState<City | null>(initialCity || null)
  const [country, setCountry] = useState<Country | null>(initialCountry || null)
  const [loading, setLoading] = useState(!initialCity || !initialCountry)
  const [similarCities, setSimilarCities] = useState<Array<{city: City, country: Country, similarity: number}>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch city and country data if not provided
        let currentCity = initialCity
        let currentCountry = initialCountry

        if (!currentCity || !currentCountry) {
          const [fetchedCity, fetchedCountry] = await Promise.all([
            currentCity ? Promise.resolve(currentCity) : getCityByName(placeName),
            currentCountry ? Promise.resolve(currentCountry) : getCountryByName(countryName)
          ])
          
          if (fetchedCity) setCity(fetchedCity)
          if (fetchedCountry) setCountry(fetchedCountry)
          
          currentCity = fetchedCity
          currentCountry = fetchedCountry
        }

        if (currentCity && currentCountry) {
          // Get all cities and countries for similarity calculation
          try {
            const [allCities, allCountries] = await Promise.all([
              getAllCities(),
              getAllCountries()
            ])
            
            console.log(`Loaded ${allCities.length} cities and ${allCountries.length} countries for similarity calculation`)
            
            const similar = getSimilarCities(currentCity, currentCountry, allCities, allCountries, 12)
            setSimilarCities(similar)
          } catch (dataError) {
            console.error('Error loading cities/countries data:', dataError)
            // Set empty array so component doesn't break
            setSimilarCities([])
          }
        }
      } catch (error) {
        console.error('Error fetching similar places:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [placeName, countryName, initialCity, initialCountry])

  if (loading) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-600">Loading similar places...</div>
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
