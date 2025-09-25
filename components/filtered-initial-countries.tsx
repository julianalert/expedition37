'use client'

import { useState, useEffect } from 'react'
import PostItem from '@/app/(default)/post-item'
import { useFilters } from '@/contexts/FilterContext'

interface FilteredInitialCountriesProps {
  initialCountries: Country[]
}

export default function FilteredInitialCountries({ initialCountries }: FilteredInitialCountriesProps) {
  const { filters } = useFilters()
  const [hydrated, setHydrated] = useState(false)

  // Hydration effect - only runs on client
  useEffect(() => {
    setHydrated(true)
  }, [])

  // Filter initial countries based on selected filters
  const filteredInitialCountries = initialCountries.filter((country: Country) => {
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
            return country.mood?.includes(criteria)
        }
      })
      if (!hasAllCriteria) return false
    }

    // Filter by budget
    if (filters.budget) {
      if (!country.weeklyBudget) return false
      
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

    // Filter by additional preferences
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
            return country.mood?.includes(additional) || country.mood?.includes(additional.replace('-', ''))
        }
      })
      if (!hasAllAdditional) return false
    }

    // Filter by vacation goals
    if (filters.vacationGoal.length > 0) {
      const hasMatchingGoal = filters.vacationGoal.some((goal: string) => {
        return country.vacationgoal && country.vacationgoal.includes(goal)
      })
      if (!hasMatchingGoal) return false
    }

    return true
  })

  // Show all countries during SSR/initial load, then apply filters on client
  const countriesToShow = hydrated ? filteredInitialCountries : initialCountries

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="countries-grid">
      {countriesToShow.map((country: Country) => (
        <PostItem key={`initial-${country.id}`} {...country} />
      ))}
    </div>
  )
}
