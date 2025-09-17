import { supabase } from './supabase'
import getAllCountries from './getAllCountries'
import { findCountryBySlug } from './countryUtils'

export default async function getCountryByName(countrySlug: string): Promise<Country | null> {
  // Check if Supabase environment variables are configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('Supabase not configured, using fallback data for country')
    return getFallbackCountryBySlug(countrySlug)
  }

  try {
    // For Supabase, we'll get all countries and find by slug
    // This is because we need to match the slugified version of the name
    const countries = await getAllCountries()
    const country = findCountryBySlug(countries, countrySlug)
    
    if (country) {
      return country
    }

    console.log('Country not found, falling back to local data')
    return getFallbackCountryBySlug(countrySlug)
  } catch (error) {
    console.error('Error connecting to Supabase for country:', error)
    console.log('Falling back to local country data')
    // Return fallback data if connection fails
    return getFallbackCountryBySlug(countrySlug)
  }
}

// Fallback function to get country by slug from local data
async function getFallbackCountryBySlug(countrySlug: string): Promise<Country | null> {
  const countries = await getAllCountries()
  return findCountryBySlug(countries, countrySlug)
}
