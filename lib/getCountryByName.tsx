import { supabase } from './supabase'
import getAllCountries from './getAllCountries'
import { findCountryBySlug, countryNameToSlug } from './countryUtils'

export default async function getCountryByName(countrySlug: string): Promise<Country | null> {
  // Check if Supabase environment variables are configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('Supabase not configured, using fallback data for country')
    return getFallbackCountryBySlug(countrySlug)
  }

  try {
    // Try to find country by name directly (more efficient than fetching all)
    // Convert slug back to potential country name for direct lookup
    const potentialName = countrySlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    
    // First try direct lookup by name (properly escaped)
    const { data, error } = await supabase
      .from('country')
      .select('*')
      .eq('name', potentialName) // Use exact match instead of ilike to avoid injection
      .single()
    
    if (!error && data) {
      return data
    }

    // If direct lookup fails, fall back to fetching all and finding by slug
    // This handles cases where the slug doesn't perfectly match the name conversion
    console.log('Direct country lookup failed, trying slug-based search')
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
