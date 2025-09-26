'use client'

import { useState, useEffect } from 'react'
import getCountryByName from '@/lib/getCountryByName'
import getAllCountries from '@/lib/getAllCountries'
import { getSimilarCountries } from '@/lib/similarityUtils'
import PostItem from '@/app/(default)/post-item'

interface SimilarCountriesProps {
  countryName: string
  initialCountry?: Country | null
}

export default function SimilarCountries({ countryName, initialCountry }: SimilarCountriesProps) {
  const [country, setCountry] = useState<Country | null>(initialCountry || null)
  const [loading, setLoading] = useState(!initialCountry)
  const [similarCountries, setSimilarCountries] = useState<Array<{country: Country, similarity: number}>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch country data if not provided
        let currentCountry = initialCountry
        if (!currentCountry) {
          currentCountry = await getCountryByName(countryName)
          setCountry(currentCountry)
        }

        if (currentCountry) {
          // Get all countries and calculate similarities
          try {
            const allCountries = await getAllCountries()
            console.log(`Loaded ${allCountries.length} countries for similarity calculation`)
            
            const similar = getSimilarCountries(currentCountry, allCountries, 12)
            setSimilarCountries(similar)
          } catch (dataError) {
            console.error('Error loading countries data:', dataError)
            // Set empty array so component doesn't break
            setSimilarCountries([])
          }
        }
      } catch (error) {
        console.error('Error fetching similar countries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [countryName, initialCountry])

  if (loading) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-600">Loading similar countries...</div>
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
                  Alternatives To {country.name}
                </h1>
                <p className="text-gray-600">
                  Discover destinations with similar vibes, budgets, and experiences.
                </p>
              </div>

            {/* Section subtitle */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Top 12 matching countries
              </h2>
            </div>

            {/* Similar countries grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCountries.map(({ country: similarCountry, similarity }) => (
                <div key={similarCountry.id} className="relative">
                  {/* Use existing PostItem component */}
                  <PostItem 
                    {...similarCountry}
                    name={similarCountry.name}
                    thumbnail={similarCountry.thumbnail || similarCountry.image}
                    hideContinentTag={true}
                  />
                  
                  {/* Similarity Badge - positioned where continent tag was */}
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
