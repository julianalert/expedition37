import { supabase } from './supabase'
import getAllCities from './getAllCities'
import { findCityBySlug } from './cityUtils'

export default async function getCityByName(citySlug: string): Promise<City | null> {
  // Check if Supabase environment variables are configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('Supabase not configured, using fallback data for city')
    return getFallbackCityBySlug(citySlug)
  }

  try {
    // For Supabase, we'll get all cities and find by slug
    // This is because we need to match the slugified version of the name
    const cities = await getAllCities()
    const city = findCityBySlug(cities, citySlug)
    
    if (city) {
      return city
    }

    console.log('City not found, falling back to local data')
    return getFallbackCityBySlug(citySlug)
  } catch (error) {
    console.error('Error connecting to Supabase for city:', error)
    console.log('Falling back to local city data')
    // Return fallback data if connection fails
    return getFallbackCityBySlug(citySlug)
  }
}

// Fallback function to get city by slug from local data
async function getFallbackCityBySlug(citySlug: string): Promise<City | null> {
  const cities = await getAllCities()
  return findCityBySlug(cities, citySlug)
}
