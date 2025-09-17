'use client'

import { useState, useEffect } from 'react'
import getCountryByName from '@/lib/getCountryByName'
import PostsList from './posts-list'
import Sidebar from '@/components/sidebar'

interface WhereToGoProps {
  countryName: string
}

export default function WhereToGo({ countryName }: WhereToGoProps) {
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCountryByName(countryName).then((data) => {
      setCountry(data)
      setLoading(false)
    })
  }, [countryName])

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

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="md:flex md:justify-between" data-sticky-container>
            
            <Sidebar />

            {/* Main content */}
            <div className="md:grow">
              {/* Section title for cities */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Where to go in {country.name}
                </h2>
                <p className="text-gray-600">
                  Explore the best destinations and cities to visit in {country.name}.
                </p>
              </div>

              {/* Cities list */}
              <PostsList countryName={countryName} />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
