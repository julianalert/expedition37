'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import getPaginatedCountries from '@/lib/getPaginatedCountries'
import PostItem from '@/app/(default)/post-item'
import Testimonials from '@/components/testimonials'
import { useFilters } from '@/contexts/FilterContext'

interface ClientSideInfiniteScrollProps {
  initialCountries: Country[]
  initialHasMore: boolean
  totalCountries: number
}

export default function ClientSideInfiniteScroll({ 
  initialCountries, 
  initialHasMore,
  totalCountries 
}: ClientSideInfiniteScrollProps) {
  const [countries, setCountries] = useState<Country[]>([])
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const { filters } = useFilters()
  const loadingRef = useRef<HTMLDivElement>(null)

  // Hydration effect - only runs on client
  useEffect(() => {
    setHydrated(true)
    // Start with empty array since server already rendered initial countries
    setCountries([])
  }, [])

  // Load more countries
  const loadMoreCountries = useCallback(async () => {
    if (isLoading || !hasMore || filters.filterType !== 'countries' || !hydrated) {
      return
    }

    setIsLoading(true)
    try {
      const countriesResult = await getPaginatedCountries(currentPage, 36)
      
      const newCountries = countriesResult.countries.filter(newCountry => 
        !countries.some(existingCountry => existingCountry.id === newCountry.id) &&
        !initialCountries.some(initialCountry => initialCountry.id === newCountry.id)
      )
      
      if (newCountries.length > 0) {
        setCountries(prevCountries => [...prevCountries, ...newCountries])
        console.log(`Loaded countries page ${currentPage + 1}, got ${newCountries.length} new countries`)
      }
      
      setHasMore(countriesResult.hasMore)
      setCurrentPage(prev => prev + 1)
    } catch (error) {
      console.error('Error loading more countries:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, hasMore, isLoading, filters.filterType, countries, initialCountries, hydrated])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadingRef.current || !hydrated) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreCountries()
        }
      },
      {
        threshold: 1.0,
        rootMargin: '100px'
      }
    )

    observer.observe(loadingRef.current)

    return () => observer.disconnect()
  }, [loadMoreCountries, hydrated])

  // Filter countries based on selected filters
  const filteredCountries = countries.filter((country: Country) => {
    // Filter by continents
    if (filters.continents.length > 0 && !filters.continents.includes(country.continent)) {
      return false
    }

    // Filter by criteria
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

  if (!hydrated) {
    return null // Don't render anything on server
  }

  return (
    <>
      {/* Additional countries loaded via infinite scroll */}
      {filteredCountries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredCountries.map((country: Country, index: number) => {
            const items = []
            
            // Add the country item
            items.push(
              <PostItem key={`client-${country.id}-${index}`} {...country} />
            )
            
            // Add testimonials after the 15th additional country
            if (index === 14 && filteredCountries.length > 15) {
              items.push(
                <div key="testimonials-additional" className="md:col-span-2 lg:col-span-3">
                  <Testimonials />
                </div>
              )
            }
            
            return items
          }).flat()}
        </div>
      )}

      {/* Infinite scroll trigger */}
      {filters.filterType === 'countries' && hasMore && (
        <div
          ref={loadingRef}
          className="mt-8 flex justify-center items-center h-20"
        >
          {isLoading ? (
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">Loading more destinations...</span>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">Scroll to load more destinations</div>
          )}
        </div>
      )}

      {/* No more content message */}
      {filters.filterType === 'countries' && !hasMore && countries.length > 0 && (
        <div className="mt-8 text-center text-gray-500 text-sm">
          You've reached the end! ✈️ ({initialCountries.length + filteredCountries.length} countries shown)
        </div>
      )}
    </>
  )
}
