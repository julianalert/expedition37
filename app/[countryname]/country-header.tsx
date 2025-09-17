'use client'

import { useState, useEffect } from 'react'
import getCountryByName from '@/lib/getCountryByName'
import Link from 'next/link'

interface CountryHeaderProps {
  countryName: string
}

export default function CountryHeader({ countryName }: CountryHeaderProps) {
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
      <section className="w-full">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-12">
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-600">Loading country details...</div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!country) {
    return (
      <section className="w-full">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-12">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h2>
              <p className="text-gray-600 mb-8">The country you're looking for doesn't exist or has been removed.</p>
              <Link 
                href="/" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12 pb-2 md:pb-4">
          {/* Back navigation */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all countries
            </Link>
          </div>

          {/* Country hero section */}
          <div className="mb-0">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              {/* Background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${country.image})`,
                }}
              />
              
              {/* Semi-transparent overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
              
              {/* Featured indicator */}
              {country.featured && (
                <div className="absolute top-6 right-6 z-10">
                  <div className="flex items-center bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.143 5.143A4.29 4.29 0 0 1 6.857.857a.857.857 0 0 0-1.714 0A4.29 4.29 0 0 1 .857 5.143a.857.857 0 0 0 0 1.714 4.29 4.29 0 0 1 4.286 4.286.857.857 0 0 0 1.714 0 4.29 4.29 0 0 1 4.286-4.286.857.857 0 0 0 0-1.714Z" />
                    </svg>
                    Featured
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                {/* Continent */}
                <div className="flex justify-start">
                  <div className="text-sm md:text-base font-medium text-white/80 bg-white/15 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full">
                    {country.continent}
                  </div>
                </div>
                
                {/* Country name and moods */}
                <div className="text-left">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                    {country.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {country.mood && country.mood.map((mood: string, index: number) => (
                      <span key={index} className="text-xs md:text-sm text-white/80 bg-white/15 backdrop-blur-sm px-2 md:px-3 py-1 md:py-2 rounded-lg">
                        {mood}
                      </span>
                    ))}
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
