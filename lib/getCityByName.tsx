import { supabase } from './supabase'
import getAllCities from './getAllCities'
import { findCityBySlug, cityNameToSlug } from './cityUtils'

export default async function getCityByName(citySlug: string): Promise<City | null> {
  // Check if Supabase environment variables are configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
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

    // If direct lookup fails, try a more flexible search with LIKE
    const { data: likeData, error: likeError } = await supabase
      .from('city')
      .select('*')
      .ilike('name', `%${potentialName}%`)
      .limit(1)
      .single()
    
    if (!likeError && likeData) {
      return likeData
    }

    // Try searching by individual words in the slug
    const searchTerms = citySlug.split('-')
    for (const term of searchTerms) {
      const capitalizedTerm = term.charAt(0).toUpperCase() + term.slice(1)
      const { data: termData, error: termError } = await supabase
        .from('city')
        .select('*')
        .ilike('name', `%${capitalizedTerm}%`)
        .limit(1)
        .single()
      
      if (!termError && termData) {
        return termData
      }
    }

    return getFallbackCityBySlug(citySlug)
  } catch (error) {
    // Return fallback data if connection fails
    return getFallbackCityBySlug(citySlug)
  }
}

// Fallback function to get city by slug from local data
async function getFallbackCityBySlug(citySlug: string): Promise<City | null> {
  // Instead of fetching all cities, return null for better performance
  // The UI will handle the "city not found" case gracefully
  return null
}
