import getCityByName from './getCityByName'
import getCountryByName from './getCountryByName'

interface CityWithCountryResult {
  city: City | null
  country: Country | null
}

export default async function getCityWithCountry(
  citySlug: string, 
  countrySlug: string
): Promise<CityWithCountryResult> {
  try {
    // Fetch city and country data in parallel for maximum performance
    const [city, country] = await Promise.all([
      getCityByName(citySlug),
      getCountryByName(countrySlug)
    ])

    return { city, country }
  } catch (error) {
    console.error('Error fetching city with country:', error)
    return { city: null, country: null }
  }
}
