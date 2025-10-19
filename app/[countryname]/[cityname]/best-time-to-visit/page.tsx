import BestTimeToVisit from '../best-time-to-visit'
import { generateMetadata as generateMetadataUtil, generateViewport, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import { slugToCityName } from '@/lib/cityUtils'
import getCityByName from '@/lib/getCityByName'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface BestTimePageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export async function generateMetadata({ params }: BestTimePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const citySlug = resolvedParams.cityname
  const countryName = slugToCountryName(countrySlug)
  const cityName = slugToCityName(citySlug)
  
  const [city, country] = await Promise.all([
    getCityByName(citySlug),
    getCountryByName(countrySlug)
  ])
  
  const displayCityName = city?.name || cityName
  const displayCountryName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `Best Time to Visit ${displayCityName}, ${displayCountryName} - Weather Guide`,
      description: `Find out when to visit ${displayCityName}, ${displayCountryName}. Get insights on weather, peak and low seasons, costs and seasonal highlights.`,
      keywords: [
        `best time to visit ${displayCityName}`,
        `${displayCityName} weather`,
        `${displayCityName} climate`,
        `${displayCityName} seasons`,
        `when to visit ${displayCityName}`,
        `${displayCityName} ${displayCountryName} weather`,
        `${displayCityName} temperature`,
        `${displayCityName} travel months`,
        'weather guide',
        'travel planning',
        'seasonal travel'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/best-time-to-visit`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Best Time to Visit ${displayCityName}, ${displayCountryName} | ${SITE_CONFIG.name}`,
      description: `Plan your perfect ${displayCityName} trip with our weather and climate guide. Find the ideal months for your travel style.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/best-time-to-visit`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-weather.jpg`,
          width: 1200,
          height: 630,
          alt: `Best time to visit ${displayCityName}, ${displayCountryName} - Weather and climate guide`,
          type: 'image/jpeg',
        },
      ],
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitter,
      creator: SITE_CONFIG.twitter,
      title: `Best Time to Visit ${displayCityName}`,
      description: `Discover the perfect months to visit ${displayCityName}, ${displayCountryName} with our comprehensive weather guide.`,
      images: [city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-weather.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export { generateViewport } from '@/lib/metadata'

export default async function BestTimePage({ params }: BestTimePageProps) {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const citySlug = resolvedParams.cityname
  
  // Fetch data server-side for optimal performance
  const [city, country] = await Promise.all([
    getCityByName(citySlug),
    getCountryByName(countrySlug)
  ])
  
  return <BestTimeToVisit city={city} country={country} />
}
