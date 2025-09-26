'use client'

import { useState, useEffect } from 'react'
import getCountryByName from '@/lib/getCountryByName'
import PostsList from './posts-list'
import Sidebar from '@/components/sidebar'

interface BestPlacesToVisitProps {
  countryName: string
  initialCountry?: Country | null
}

export default function BestPlacesToVisit({ countryName, initialCountry }: BestPlacesToVisitProps) {
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

  if (loading) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-600">Loading destinations...</div>
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

  const countrySlug = countryName.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <>      
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="md:flex md:justify-between" data-sticky-container>
            
            <Sidebar />

            {/* Main content */}
            <div className="md:grow">
              {/* Section title for cities */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Best places to visit in {country.name}
                </h1>
                <p className="text-gray-600">
                  Discover the top destinations and cities to visit in {country.name}.
                </p>
              </div>

              {/* Cities list */}
              <PostsList countryName={countryName} />
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}
