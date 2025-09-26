'use client'

import Link from 'next/link'
import { cityNameToSlug } from '@/lib/cityUtils'
import { countryNameToSlug, slugToCountryName } from '@/lib/countryUtils'
import getAllCountries from '@/lib/getAllCountries'
import { useEffect, useState } from 'react'
import RatingOverlay from '@/components/rating-overlay'

interface CityItemProps extends City {
  countryNameProp?: string
  hideCountryTag?: boolean
}

export default function CityItem(props: CityItemProps) {
  const [countryName, setCountryName] = useState<string>(props.countryNameProp || '')
  const [isLoading, setIsLoading] = useState(!props.countryNameProp)
  const citySlug = cityNameToSlug(props.name)
  
  useEffect(() => {
    // If country name is already provided, skip the API call
    if (props.countryNameProp) {
      setCountryName(props.countryNameProp)
      setIsLoading(false)
      return
    }
    
    // Get country name from country ID only if not provided
    getAllCountries().then(countries => {
      const country = countries.find(c => c.id === props.country)
      if (country) {
        setCountryName(country.name)
      }
      setIsLoading(false)
    })
  }, [props.country, props.countryNameProp])

  const countrySlug = countryNameToSlug(countryName)
  const displayCountryName = props.countryNameProp ? slugToCountryName(props.countryNameProp) : countryName
  
  // Don't render the link until we have the country information
  if (isLoading || !countryName) {
    return (
      <div className="group block cursor-not-allowed opacity-75">
        <div className="relative h-80 rounded-xl overflow-hidden shadow-sm">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${props.thumbnail})`,
            }}
          />
          
          {/* Semi-transparent overlay with loading indicator */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
          
          {/* Loading indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-2 rounded-full">
              Loading...
            </div>
          </div>
          
          {/* Rank indicator */}
          {props.rank && (
            <div className={`absolute top-4 z-10 ${props.featured ? 'right-12' : 'right-4'}`}>
              <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-2 py-1 rounded-full border border-white/30">
                #{props.rank}
              </div>
            </div>
          )}

          {/* Featured indicator */}
          {props.featured && (
            <div className="absolute top-4 right-4 z-10">
              <svg className="w-5 h-5 fill-amber-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.143 5.143A4.29 4.29 0 0 1 6.857.857a.857.857 0 0 0-1.714 0A4.29 4.29 0 0 1 .857 5.143a.857.857 0 0 0 0 1.714 4.29 4.29 0 0 1 4.286 4.286.857.857 0 0 0 1.714 0 4.29 4.29 0 0 1 4.286-4.286.857.857 0 0 0 0-1.714Z" />
              </svg>
            </div>
          )}
          
          {/* Country indicator placeholder */}
          {!props.hideCountryTag && (
            <div className="absolute top-4 left-4 z-10">
              <div className="text-sm font-medium text-white/50 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                ...
              </div>
            </div>
          )}

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
            {/* Empty top section */}
            <div></div>
            
            {/* City name */}
            <div className="text-left">
              <h3 className="text-3xl font-bold text-white mb-2">
                {props.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {props.mood && props.mood.slice(0, 3).map((mood: string, index: number) => (
                  <span key={index} className="text-xs text-white/60 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md">
                    {mood}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <Link href={`/${countrySlug}/${citySlug}`} className="group block">
      <div className="relative h-80 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${props.thumbnail})`,
          }}
        />
        
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        
        {/* Rank indicator */}
        {props.rank && (
          <div className={`absolute top-4 z-10 ${props.featured ? 'right-12' : 'right-4'}`}>
            <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-2 py-1 rounded-full border border-white/30">
              #{props.rank}
            </div>
          </div>
        )}

        {/* Featured indicator */}
        {props.featured && (
          <div className="absolute top-4 right-4 z-10">
            <svg className="w-5 h-5 fill-amber-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.143 5.143A4.29 4.29 0 0 1 6.857.857a.857.857 0 0 0-1.714 0A4.29 4.29 0 0 1 .857 5.143a.857.857 0 0 0 0 1.714 4.29 4.29 0 0 1 4.286 4.286.857.857 0 0 0 1.714 0 4.29 4.29 0 0 1 4.286-4.286.857.857 0 0 0 0-1.714Z" />
            </svg>
          </div>
        )}
        
        {/* Country indicator (instead of continent for cities) */}
        {!props.hideCountryTag && (
          <div className="absolute top-4 left-4 z-10">
            <div className="text-sm font-medium text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              {countryName}
            </div>
          </div>
        )}

        {/* Rating Overlay */}
        <RatingOverlay 
          overallRating={props.overallRating}
          costRating={props.costRating}
          safetyRating={props.safetyRating}
          funRating={props.funRating}
          foodRating={props.foodRating}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
          {/* Empty top section - country moved to absolute positioning */}
          <div></div>
          
          {/* City name */}
          <div className="text-left">
            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors duration-200">
              {props.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {props.mood && props.mood.slice(0, 3).map((mood: string, index: number) => (
                <span key={index} className="text-xs text-white/60 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md">
                  {mood}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
