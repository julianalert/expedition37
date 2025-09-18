'use client'

import { useState, useEffect } from 'react'
import getAllCountries from '@/lib/getAllCountries'
import getAllCities from '@/lib/getAllCities'
import PostItem from './post-item'
import CityItem from './city-item'
import Newsletter from '@/components/newsletter'
import Testimonials from '@/components/testimonials'
import { useFilters } from '@/contexts/FilterContext'

export default function PostsList() {
  const [countries, setCountries] = useState<Country[]>([])
  const [cities, setCities] = useState<City[]>([])
  const { filters } = useFilters()

  useEffect(() => {
    getAllCountries().then(setCountries)
    getAllCities().then(setCities)
  }, [])

  // Filter countries based on selected filters
  const filteredCountries = countries.filter((country: Country) => {
    // Filter by continents
    if (filters.continents.length > 0 && !filters.continents.includes(country.continent)) {
      return false
    }


    // Filter by criteria
    if (filters.criteria.length > 0) {
      const hasMatchingCriteria = filters.criteria.some((criteria: string) => country.mood.includes(criteria))
      if (!hasMatchingCriteria) return false
    }

    // Filter by budget (assuming countries have budget-related mood tags)
    if (filters.budget.length > 0) {
      const hasMatchingBudget = filters.budget.some((budget: string) => {
        // Map budget filters to mood tags that indicate affordability
        if (budget === '<1k' || budget === '<2k') {
          return country.mood.includes('affordable')
        }
        return true // For now, <3k shows all
      })
      if (!hasMatchingBudget) return false
    }

    return true
  })

  // Filter cities based on selected filters
  const filteredCities = cities.filter((city: City) => {
    // Filter by continents (get continent from city's country)
    if (filters.continents.length > 0) {
      const cityCountry = countries.find((country: Country) => country.id === city.country)
      if (!cityCountry || !filters.continents.includes(cityCountry.continent)) {
        return false
      }
    }


    // Filter by criteria
    if (filters.criteria.length > 0) {
      const hasMatchingCriteria = filters.criteria.some((criteria: string) => city.mood.includes(criteria))
      if (!hasMatchingCriteria) return false
    }

    // Filter by budget (assuming cities have budget-related mood tags)
    if (filters.budget.length > 0) {
      const hasMatchingBudget = filters.budget.some((budget: string) => {
        // Map budget filters to mood tags that indicate affordability
        if (budget === '<1k' || budget === '<2k') {
          return city.mood.includes('affordable')
        }
        return true // For now, <3k shows all
      })
      if (!hasMatchingBudget) return false
    }

    return true
  })

  return (
    <div className="pb-8 md:pb-16" id={filters.filterType === 'countries' ? 'countries' : 'places'}>
      {/* Cards grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filters.filterType === 'countries' ? (
          filteredCountries.map((country: Country, index: number) => {
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
          }).flat()
        ) : (
          filteredCities.map((city: City, index: number) => {
            const items = [];
            
            // Add the city item
            items.push(
              <CityItem key={city.id} {...city} />
            );
            
            return items;
          }).flat()
        )}
      </div>
    </div>
  )
}
