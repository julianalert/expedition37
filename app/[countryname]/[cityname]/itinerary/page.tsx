import Itinerary from '../itinerary'
import { generateMetadata as generateMetadataUtil, generateViewport, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import { slugToCityName } from '@/lib/cityUtils'
import getCityWithCountry from '@/lib/getCityWithCountry'
import type { Metadata } from 'next'

interface ItineraryPageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export async function generateMetadata({ params }: ItineraryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const citySlug = resolvedParams.cityname
  const countryName = slugToCountryName(countrySlug)
  const cityName = slugToCityName(citySlug)
  
  const { city, country } = await getCityWithCountry(citySlug, countrySlug)
  
  const displayCityName = city?.name || cityName
  const displayCountryName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `${displayCityName} Itinerary - Create Your Personalized Travel Plan`,
      description: `Create a personalized travel itinerary for ${displayCityName}, ${displayCountryName}. Plan your perfect trip with AI-powered recommendations tailored to your interests and duration.`,
      keywords: [
        `${displayCityName} itinerary`,
        `${displayCityName} travel plan`,
        `${displayCityName} trip planner`,
        `${displayCityName} ${displayCountryName} itinerary`,
        `personalized ${displayCityName} itinerary`,
        `${displayCityName} travel guide`,
        `${displayCityName} vacation planner`,
        `what to do in ${displayCityName}`,
        `${displayCityName} trip planning`,
        'travel itinerary planner',
        'AI travel planner'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/itinerary`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `${displayCityName} Itinerary - Create Your Personalized Travel Plan | ${SITE_CONFIG.name}`,
      description: `Create a personalized travel itinerary for ${displayCityName}, ${displayCountryName}. Plan your perfect trip with AI-powered recommendations tailored to your interests and duration.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/itinerary`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-${countrySlug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${displayCityName}, ${displayCountryName} - Personalized travel itinerary planner`,
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
      title: `${displayCityName} Itinerary - Personalized Travel Plan`,
      description: `Create a personalized travel itinerary for ${displayCityName}. AI-powered trip planning tailored to your interests.`,
      images: [city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-${countrySlug}.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export { generateViewport } from '@/lib/metadata'

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const citySlug = resolvedParams.cityname
  
  // Fetch data server-side for optimal performance
  const { city, country } = await getCityWithCountry(citySlug, countrySlug)
  
  return <Itinerary city={city} country={country} />
}

