import ThingsToDo from '../things-to-do'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import { slugToCityName } from '@/lib/cityUtils'
import getCityWithCountry from '@/lib/getCityWithCountry'
import type { Metadata } from 'next'

interface ThingsToDoPageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export async function generateMetadata({ params }: ThingsToDoPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const citySlug = resolvedParams.cityname
  const countryName = slugToCountryName(countrySlug)
  const cityName = slugToCityName(citySlug)
  
  // Get city and country data for metadata
  const { city, country } = await getCityWithCountry(citySlug, countrySlug)
  
  const displayCityName = city?.name || cityName
  const displayCountryName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `Things to Do in ${displayCityName}, ${displayCountryName} - Top Attractions & Activities`,
      description: `Discover the best things to do in ${displayCityName}: historic monuments, museums, local food, nightlife, and hidden gems. Complete activity guide for your visit.`,
      keywords: [
        `${displayCityName} things to do`,
        `${displayCityName} attractions`,
        `${displayCityName} activities`,
        `${displayCityName} ${displayCountryName} tourism`,
        `visit ${displayCityName}`,
        `${displayCityName} sightseeing`,
        `${displayCityName} museums`,
        `${displayCityName} monuments`,
        `${displayCityName} restaurants`,
        `${displayCityName} nightlife`,
        'tourist attractions',
        'travel activities'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/things-to-do`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Things to Do in ${displayCityName}, ${displayCountryName} | ${SITE_CONFIG.name}`,
      description: `Discover the best things to do in ${displayCityName}: historic monuments, museums, local food, nightlife, and hidden gems. Complete activity guide for your visit.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/things-to-do`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-${countrySlug}.jpg`,
          width: 1200,
          height: 630,
          alt: `Things to do in ${displayCityName}, ${displayCountryName} - Top attractions and activities`,
          type: 'image/jpeg',
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitter,
      creator: SITE_CONFIG.twitter,
      title: `Things to Do in ${displayCityName}, ${displayCountryName}`,
      description: `Discover the best attractions, activities, and experiences in ${displayCityName}. Your complete guide to the city's must-see sights.`,
      images: [city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-${countrySlug}.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function ThingsToDoPage({ params }: ThingsToDoPageProps) {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const citySlug = resolvedParams.cityname
  
  // Fetch data server-side for optimal performance
  const { city, country } = await getCityWithCountry(citySlug, countrySlug)
  
  return <ThingsToDo city={city} />
}
