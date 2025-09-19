'use client'

import { useState, useEffect } from 'react'
import getCitiesByCountryName from '@/lib/getCitiesByCountryName'
import CityItem from '@/app/(default)/city-item'
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

  // Filter cities based on selected filters - using same logic as homepage
  const filteredCities = cities.filter((city: City) => {
    // Filter by criteria (What matters to you) - ALL selected criteria must match
    if (filters.criteria.length > 0) {
      const hasAllCriteria = filters.criteria.every((criteria: string) => {
        switch (criteria) {
          case 'safety':
            return city.safe === true
          case 'fast-internet':
            return city.fastInternet === true
          case 'clean-air':
            return city.cleanAir === true
          case 'hidden-gem':
            return city.hiddenGem === true
          case 'popular-now':
            return city.popular === true
          case 'family-friendly':
            return city.familyFriendly === true
          default:
            // For other criteria, fall back to mood tags
            return city.mood.includes(criteria)
        }
      })
      if (!hasAllCriteria) return false
    }

    // Filter by budget (Weekly Budget from city's own data)
    if (filters.budget) {
      if (!city.weeklyBudget) return false // Skip cities without budget data
      
      switch (filters.budget) {
        case '<1k':
          if (city.weeklyBudget >= 1000) return false
          break
        case '<2k':
          if (city.weeklyBudget >= 2000) return false
          break
        case '<3k':
          if (city.weeklyBudget >= 3000) return false
          break
      }
    }

    // Filter by additional preferences (You may also want) - ALL selected must match
    if (filters.additional.length > 0) {
      const hasAllAdditional = filters.additional.every((additional: string) => {
        switch (additional) {
          case 'amazing-food':
            return city.amazingFood === true
          case 'nightlife':
            return city.nightlife === true
          case 'great-for-dating':
            return city.greatForDating === true
          case 'eco-friendly':
            return city.ecofriendly === true
          case 'dog-friendly':
            return city.dogfriendly === true
          case 'lgbtq-friendly':
            return city.lgbtqfriendly === true
          case 'low-racism':
            return city.lowRacism === true
          case 'muslim-friendly':
            return city.muslimfriendly === true
          default:
            // For other additional filters, fall back to mood tags
            return city.mood.includes(additional) || city.mood.includes(additional.replace('-', ''))
        }
      })
      if (!hasAllAdditional) return false
    }

    // Filter by vacation goals (use city's own vacation goals)
    if (filters.vacationGoal.length > 0) {
      if (!city.vacationgoal) return false
      
      const hasMatchingGoal = filters.vacationGoal.some((goal: string) => {
        // Check if the city has this vacation goal
        return city.vacationgoal && city.vacationgoal.includes(goal)
      })
      if (!hasMatchingGoal) return false
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
          
          // Add the city item using the same component as homepage
          items.push(
            <CityItem key={city.id} {...city} />
          );
          
          // Add testimonials after the 6th city (index 5)
          if (index === 17 && filteredCities.length > 18) {
            items.push(
              <div key="testimonials" className="md:col-span-2 lg:col-span-3">
                <Testimonials />
              </div>
            );
          }
          
          {/* // Add newsletter after the 9th city (index 8)
          if (index === 24 && filteredCities.length > 25) {
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
