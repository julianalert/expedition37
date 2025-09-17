'use client'

import { useState, useEffect } from 'react'
import getAllCountries from '@/lib/getAllCountries'
import PostItem from './post-item'
import Newsletter from '@/components/newsletter'
import Testimonials from '@/components/testimonials'
import { useFilters } from '@/contexts/FilterContext'

export default function PostsList() {
  const [countries, setCountries] = useState<Country[]>([])
  const { filters } = useFilters()

  useEffect(() => {
    getAllCountries().then(setCountries)
  }, [])

  // Filter countries based on selected filters
  const filteredCountries = countries.filter((country) => {
    // Filter by continent
    if (filters.continent !== 'Anywhere' && country.continent !== filters.continent) {
      return false
    }

    // Filter by moods
    if (filters.moods.length > 0) {
      const hasMatchingMood = filters.moods.some(mood => country.mood.includes(mood))
      if (!hasMatchingMood) return false
    }

    // Filter by criteria
    if (filters.criteria.length > 0) {
      const hasMatchingCriteria = filters.criteria.some(criteria => country.mood.includes(criteria))
      if (!hasMatchingCriteria) return false
    }

    return true
  })

  return (
    <div className="pb-8 md:pb-16" id="countries">
      {/* Cards grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCountries.map((country, index) => {
          const items = [];
          
          // Add the country item
          items.push(
            <PostItem key={country.id} {...country} />
          );
          
          {/* Add testimonials after the 9th country (index 8)
          if (index === 8 && filteredCountries.length > 9) {
            items.push(
              <div key="testimonials" className="md:col-span-2 lg:col-span-3">
                <Testimonials />
              </div>
            );
          }
          
          // Add newsletter after the 12th country (index 11)
          if (index === 14 && filteredCountries.length > 15) {
            items.push(
              <div key="newsletter" className="md:col-span-2 lg:col-span-3">
                <Newsletter />
              </div>
            );
          } */}
          
          return items;
        }).flat()}
      </div>
    </div>
  )
}
