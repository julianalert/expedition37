'use client'

import { useState, useEffect } from 'react'
import getCitiesByCountryName from '@/lib/getCitiesByCountryName'
import PostItem from './post-item'
import Newsletter from '@/components/newsletter'
import Testimonials from '@/components/testimonials'
import { useFilters } from '@/contexts/FilterContext'

interface PostsListProps {
  countryName: string
}

export default function PostsList({ countryName }: PostsListProps) {
  const [cities, setCities] = useState<City[]>([])
  const { filters } = useFilters()

  useEffect(() => {
    getCitiesByCountryName(countryName).then(setCities)
  }, [countryName])

  // Filter cities based on selected filters
  const filteredCities = cities.filter(city => {
    // Filter by moods
    if (filters.moods.length > 0) {
      const hasMatchingMood = filters.moods.some(mood => city.mood.includes(mood))
      if (!hasMatchingMood) return false
    }

    // Filter by criteria
    if (filters.criteria.length > 0) {
      const hasMatchingCriteria = filters.criteria.some(criteria => city.mood.includes(criteria))
      if (!hasMatchingCriteria) return false
    }

    return true
  })

  if (cities.length === 0) {
    return (
      <div className="pb-8 md:pb-16" id="cities">
        <div className="text-center py-16">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cities available</h3>
          <p className="text-gray-600">
            We haven't added any cities for this country yet. Check back later!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8 md:pb-16" id="cities">
      {/* Cards grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city, index) => {
          const items = [];
          
          // Add the city item
          items.push(
            <PostItem key={city.id} {...city} />
          );
          
          {/* // Add testimonials after the 6th city (index 5)
          if (index === 5 && filteredCities.length > 6) {
            items.push(
              <div key="testimonials" className="md:col-span-2 lg:col-span-3">
                <Testimonials />
              </div>
            );
          }*/}
          
           {/*// Add newsletter after the 9th city (index 8)
          if (index === 8 && filteredCities.length > 9) {
            items.push(
              <div key="newsletter" className="md:col-span-2 lg:col-span-3">
                <Newsletter />
              </div>
            );
          }*/}
          
          return items;
        }).flat()}
      </div>
    </div>
  )
}
