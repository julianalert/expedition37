import getAllCountries from './getAllCountries'
import getAllCities from './getAllCities'

export default async function getCountriesWithCities() {
  const [countries, cities] = await Promise.all([
    getAllCountries(),
    getAllCities()
  ])
  return { countries, cities }
}
