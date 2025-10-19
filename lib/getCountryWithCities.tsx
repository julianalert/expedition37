import { supabase } from './supabase'
import getCountryByName from './getCountryByName'
import getCitiesByCountryName from './getCitiesByCountryName'

interface CountryWithCitiesResult {
  country: Country | null
  cities: City[]
}

export default async function getCountryWithCities(countrySlug: string): Promise<CountryWithCitiesResult> {
  // Check if Supabase environment variables are configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Fallback: fetch sequentially if no Supabase
    const country = await getCountryByName(countrySlug)
    const cities = await getCitiesByCountryName(countrySlug)
    return { country, cities }
  }

  try {
    // Fetch country and cities data in parallel for maximum performance
    const [country, cities] = await Promise.all([
      getCountryByName(countrySlug),
      getCitiesByCountryName(countrySlug)
    ])

    return { country, cities }
  } catch (error) {
    console.error('Error fetching country with cities:', error)
    // Fallback: try sequential fetch
    const country = await getCountryByName(countrySlug)
    const cities = await getCitiesByCountryName(countrySlug)
    return { country, cities }
  }
}
