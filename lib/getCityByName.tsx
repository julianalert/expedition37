import { supabase } from './supabase'
import getAllCities from './getAllCities'
import { findCityBySlug, cityNameToSlug } from './cityUtils'

export default async function getCityByName(citySlug: string): Promise<City | null> {
  // Check if Supabase environment variables are configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('Supabase not configured, using fallback data for city')
    return getFallbackCityBySlug(citySlug)
  }

  try {
    // Try to find city by name directly (more efficient than fetching all)
    // Convert slug back to potential city name for direct lookup
    const potentialName = citySlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    
    // First try direct lookup by name
    const { data, error } = await supabase
      .from('city')
      .select('*')
      .ilike('name', potentialName)
      .single()
    
    if (!error && data) {
      return data
    }

    // If direct lookup fails, fall back to fetching all and finding by slug
    // This handles cases where the slug doesn't perfectly match the name conversion
    console.log('Direct city lookup failed, trying slug-based search')
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
