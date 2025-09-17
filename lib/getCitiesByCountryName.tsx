import { supabase } from './supabase'
import getCountryByName from './getCountryByName'
import getCitiesByCountryId from './getCitiesByCountryId'

export default async function getCitiesByCountryName(countrySlug: string): Promise<City[]> {
  // First, get the country to find its ID
  const country = await getCountryByName(countrySlug)
  
  if (!country) {
    console.log(`Country not found for slug: ${countrySlug}`)
    return []
  }

  // Use the existing function to get cities by country ID
  return getCitiesByCountryId(country.id.toString())
}
