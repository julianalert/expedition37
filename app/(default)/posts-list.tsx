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


    // Filter by criteria (What matters to you) - ALL selected criteria must match
    if (filters.criteria.length > 0) {
      const hasAllCriteria = filters.criteria.every((criteria: string) => {
        switch (criteria) {
          case 'safety':
            return country.safe === true
          case 'fast-internet':
            return country.fastInternet === true
          case 'clean-air':
            return country.cleanAir === true
          case 'hidden-gem':
            return country.hiddenGem === true
          case 'popular-now':
            return country.popular === true
          case 'family-friendly':
            return country.familyFriendly === true
          default:
            // For other criteria, fall back to mood tags
            return country.mood.includes(criteria)
        }
      })
      if (!hasAllCriteria) return false
    }

    // Filter by budget (Weekly Budget)
    if (filters.budget) {
      if (!country.weeklyBudget) return false // Skip countries without budget data
      
      switch (filters.budget) {
        case '<1k':
          if (country.weeklyBudget >= 1000) return false
          break
        case '<2k':
          if (country.weeklyBudget >= 2000) return false
          break
        case '<3k':
          if (country.weeklyBudget >= 3000) return false
          break
      }
    }

    // Filter by additional preferences (You may also want) - ALL selected must match
    if (filters.additional.length > 0) {
      const hasAllAdditional = filters.additional.every((additional: string) => {
        switch (additional) {
          case 'amazing-food':
            return country.amazingFood === true
          case 'nightlife':
            return country.nightlife === true
          case 'great-for-dating':
            return country.greatForDating === true
          case 'eco-friendly':
            return country.ecofriendly === true
          case 'dog-friendly':
            return country.dogfriendly === true
          case 'lgbtq-friendly':
            return country.lgbtqfriendly === true
          case 'low-racism':
            return country.lowRacism === true
          case 'muslim-friendly':
            return country.muslimfriendly === true
          default:
            // For other additional filters, fall back to mood tags
            return country.mood.includes(additional) || country.mood.includes(additional.replace('-', ''))
        }
      })
      if (!hasAllAdditional) return false
    }

    // Filter by vacation goals
    if (filters.vacationGoal.length > 0) {
      const hasMatchingGoal = filters.vacationGoal.some((goal: string) => {
        // Check if the country's vacationgoal array includes this goal
        return country.vacationgoal && country.vacationgoal.includes(goal)
      })
      if (!hasMatchingGoal) return false
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


    // Filter by criteria (What matters to you) - ALL selected criteria must match
    if (filters.criteria.length > 0) {
      const cityCountry = countries.find((country: Country) => country.id === city.country)
      if (!cityCountry) return false
      
      const hasAllCriteria = filters.criteria.every((criteria: string) => {
        switch (criteria) {
          case 'safety':
            return cityCountry.safe === true
          case 'fast-internet':
            return cityCountry.fastInternet === true
          case 'clean-air':
            return cityCountry.cleanAir === true
          case 'hidden-gem':
            return cityCountry.hiddenGem === true
          case 'popular-now':
            return cityCountry.popular === true
          case 'family-friendly':
            return cityCountry.familyFriendly === true
          default:
            // For other criteria, fall back to mood tags
            return city.mood.includes(criteria)
        }
      })
      if (!hasAllCriteria) return false
    }

    // Filter by budget (Weekly Budget from city's country)
    if (filters.budget) {
      const cityCountry = countries.find((country: Country) => country.id === city.country)
      if (!cityCountry || !cityCountry.weeklyBudget) return false // Skip cities without budget data
      
      switch (filters.budget) {
        case '<1k':
          if (cityCountry.weeklyBudget >= 1000) return false
          break
        case '<2k':
          if (cityCountry.weeklyBudget >= 2000) return false
          break
        case '<3k':
          if (cityCountry.weeklyBudget >= 3000) return false
          break
      }
    }

    // Filter by additional preferences (You may also want) - ALL selected must match
    if (filters.additional.length > 0) {
      const cityCountry = countries.find((country: Country) => country.id === city.country)
      if (!cityCountry) return false
      
      const hasAllAdditional = filters.additional.every((additional: string) => {
        switch (additional) {
          case 'amazing-food':
            return cityCountry.amazingFood === true
          case 'nightlife':
            return cityCountry.nightlife === true
          case 'great-for-dating':
            return cityCountry.greatForDating === true
          case 'eco-friendly':
            return cityCountry.ecofriendly === true
          case 'dog-friendly':
            return cityCountry.dogfriendly === true
          case 'lgbtq-friendly':
            return cityCountry.lgbtqfriendly === true
          case 'low-racism':
            return cityCountry.lowRacism === true
          case 'muslim-friendly':
            return cityCountry.muslimfriendly === true
          default:
            // For other additional filters, fall back to mood tags
            return city.mood.includes(additional) || city.mood.includes(additional.replace('-', ''))
        }
      })
      if (!hasAllAdditional) return false
    }

    // Filter by vacation goals (get vacation goal from city's country)
    if (filters.vacationGoal.length > 0) {
      const cityCountry = countries.find((country: Country) => country.id === city.country)
      if (!cityCountry || !cityCountry.vacationgoal) return false
      
      const hasMatchingGoal = filters.vacationGoal.some((goal: string) => {
        // Check if the city's country has this vacation goal
        return cityCountry.vacationgoal && cityCountry.vacationgoal.includes(goal)
      })
      if (!hasMatchingGoal) return false
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
            
            // Add testimonials after the 9th country (index 8)
            if (index === 14 && filteredCountries.length > 15) {
              items.push(
                <div key="testimonials" className="md:col-span-2 lg:col-span-3">
                  <Testimonials />
                </div>
              );
            }
            
            // Add newsletter after the 12th country (index 11)
            if (index === 29 && filteredCountries.length > 30) {
              items.push(
                <div key="newsletter" className="md:col-span-2 lg:col-span-3">
                  <Newsletter />
                </div>
              );
            } 
            
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
