'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import getAllCountries from '@/lib/getAllCountries'
import getPaginatedCountries from '@/lib/getPaginatedCountries'
import getPaginatedCities from '@/lib/getPaginatedCities'
import PostItem from '@/app/(default)/post-item'
import CityItem from '@/app/(default)/city-item'
import Newsletter from '@/components/newsletter'
import Testimonials from '@/components/testimonials'
import { useFilters } from '@/contexts/FilterContext'

export default function InfiniteScrollPostsList() {
  const [countries, setCountries] = useState<Country[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [countriesCurrentPage, setCountriesCurrentPage] = useState(0)
  const [citiesCurrentPage, setCitiesCurrentPage] = useState(0)
  const [countriesHasMore, setCountriesHasMore] = useState(true)
  const [citiesHasMore, setCitiesHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const { filters, updateFilters } = useFilters()
  const loadingRef = useRef<HTMLDivElement>(null)

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsInitialLoad(true)
      try {
        // Load first page of countries (36 items)
        const countriesResult = await getPaginatedCountries(0, 36)
        setCountries(countriesResult.countries)
        setCountriesHasMore(countriesResult.hasMore)
        setCountriesCurrentPage(1) // Next page to load

        // HOMEPAGE BLOCK: Don't load cities for homepage to reduce database usage
        setCities([])
        setCitiesHasMore(false)
        setCitiesCurrentPage(0)
      } catch (error) {
        console.error('Error loading initial data:', error)
      } finally {
        setIsInitialLoad(false)
      }
    }

    loadInitialData()
  }, [])

  // Load more countries
  const loadMoreCountries = useCallback(async () => {
    if (isLoading || !countriesHasMore || filters.filterType !== 'countries') {
      return
    }

    setIsLoading(true)
    try {
      const countriesResult = await getPaginatedCountries(countriesCurrentPage, 36)
      
      // Filter out any countries that are already in the list to prevent duplicates
      const newCountries = countriesResult.countries.filter(newCountry => 
        !countries.some(existingCountry => existingCountry.id === newCountry.id)
      )
      
      if (newCountries.length > 0) {
        setCountries(prevCountries => [...prevCountries, ...newCountries])
        console.log(`Loaded countries page ${countriesCurrentPage + 1}, got ${newCountries.length} new countries (${countriesResult.countries.length} total from API), hasMore: ${countriesResult.hasMore}`)
      } else {
        console.warn(`Countries page ${countriesCurrentPage + 1} returned ${countriesResult.countries.length} countries but all were duplicates`)
      }
      
      setCountriesHasMore(countriesResult.hasMore)
      setCountriesCurrentPage(prev => prev + 1)
    } catch (error) {
      console.error('Error loading more countries:', error)
    } finally {
      setIsLoading(false)
    }
  }, [countriesCurrentPage, countriesHasMore, isLoading, filters.filterType, countries])

  // Load more cities - BLOCKED for homepage
  const loadMoreCities = useCallback(async () => {
    // HOMEPAGE BLOCK: Don't load more cities to reduce database usage
    console.log('Cities loading blocked on homepage')
    return
    
    if (isLoading || !citiesHasMore || filters.filterType !== 'places') {
      return
    }

    setIsLoading(true)
    try {
      const citiesResult = await getPaginatedCities(citiesCurrentPage, 100)
      
      // Filter out any cities that are already in the list to prevent duplicates
      const newCities = citiesResult.cities.filter(newCity => 
        !cities.some(existingCity => existingCity.id === newCity.id)
      )
      
      if (newCities.length > 0) {
        setCities(prevCities => [...prevCities, ...newCities])
        console.log(`Loaded page ${citiesCurrentPage + 1}, got ${newCities.length} new cities (${citiesResult.cities.length} total from API), hasMore: ${citiesResult.hasMore}`)
      } else {
        console.warn(`Page ${citiesCurrentPage + 1} returned ${citiesResult.cities.length} cities but all were duplicates`)
      }
      
      setCitiesHasMore(citiesResult.hasMore)
      setCitiesCurrentPage(prev => prev + 1)
    } catch (error) {
      console.error('Error loading more cities:', error)
    } finally {
      setIsLoading(false)
    }
  }, [citiesCurrentPage, citiesHasMore, isLoading, filters.filterType, cities])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadingRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (filters.filterType === 'countries') {
            loadMoreCountries()
          } else {
            loadMoreCities()
          }
        }
      },
      {
        threshold: 1.0,
        rootMargin: '100px' // Trigger 100px before the element comes into view
      }
    )

    observer.observe(loadingRef.current)

    return () => observer.disconnect()
  }, [loadMoreCountries, loadMoreCities, filters.filterType])

  // Reset cities when switching between countries and places - BLOCKED for homepage
  useEffect(() => {
    // HOMEPAGE BLOCK: Don't reload cities to reduce database usage
    if (filters.filterType === 'places' && cities.length === 0 && !isInitialLoad) {
      console.log('Cities reload blocked on homepage')
      // Keep cities empty and hasMore false
      setCities([])
      setCitiesHasMore(false)
    }
  }, [filters.filterType, cities.length, isInitialLoad])

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

  if (isInitialLoad) {
    return (
      <div className="pb-8 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loading skeleton */}
          {[...Array(12)].map((_, index) => (
            <div key={index} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8 md:pb-16" id={filters.filterType === 'countries' ? 'countries' : 'places'}>
      {/* Cards grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filters.filterType === 'countries' ? (
          filteredCountries.map((country: Country, index: number) => {
            const items = [];
            
            // Add the country item with unique key
            items.push(
              <PostItem key={`country-${country.id}-${index}`} {...country} />
            );
            
            // Add testimonials after the 15th country (index 14)
            if (index === 14 && filteredCountries.length > 15) {
              items.push(
                <div key="testimonials-countries" className="md:col-span-2 lg:col-span-3">
                  <Testimonials />
                </div>
              );
            }
            
            return items;
          }).flat()
        ) : (
          // Show "Coming Soon" message when places filter is selected
          <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 px-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-dashed border-orange-200">
            <div className="bg-orange-500 text-white p-3 rounded-full mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Places Coming Soon!</h3>
            <p className="text-gray-600 text-center max-w-md">
              We're working hard to bring you amazing city destinations. In the meantime, explore our fantastic country recommendations!
            </p>
            <button 
              onClick={() => updateFilters({ filterType: 'countries' })}
              className="mt-4 px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Explore Countries Instead
            </button>
          </div>
        )}
      </div>

      {/* Infinite scroll trigger */}
      {((filters.filterType === 'countries' && countriesHasMore) || (filters.filterType === 'places' && citiesHasMore)) && (
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
      {filters.filterType === 'countries' && !countriesHasMore && countries.length > 0 && (
        <div className="mt-8 text-center text-gray-500 text-sm">
          You've reached the end! ✈️ ({filteredCountries.length} countries shown)
        </div>
      )}
      {filters.filterType === 'places' && !citiesHasMore && cities.length > 0 && (
        <div className="mt-8 text-center text-gray-500 text-sm">
          You've reached the end! ✈️ ({filteredCities.length} destinations shown)
        </div>
      )}
    </div>
  )
}
