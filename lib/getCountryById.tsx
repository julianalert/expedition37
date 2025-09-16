import { supabase } from './supabase'
import getAllCountries from './getAllCountries'

export default async function getCountryById(id: string): Promise<Country | null> {
  // Check if Supabase environment variables are configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('Supabase not configured, using fallback data for country')
    return getFallbackCountryById(id)
  }

  try {
    const { data, error } = await supabase
      .from('country')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching country from Supabase:', error)
      console.log('Falling back to local country data')
      // Return fallback data if Supabase fails
      return getFallbackCountryById(id)
    }

    return data || null
  } catch (error) {
    console.error('Error connecting to Supabase for country:', error)
    console.log('Falling back to local country data')
    // Return fallback data if connection fails
    return getFallbackCountryById(id)
  }
}

// Fallback function to get country by ID from local data
async function getFallbackCountryById(id: string): Promise<Country | null> {
  const countries = await getAllCountries()
  return countries.find(country => country.id.toString() === id) || null
}
