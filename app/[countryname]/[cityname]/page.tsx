import Overview from './overview'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import { slugToCityName } from '@/lib/cityUtils'
import getCityByName from '@/lib/getCityByName'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface PlacePageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const citySlug = resolvedParams.cityname
  const countryName = slugToCountryName(countrySlug)
  const cityName = slugToCityName(citySlug)
  
  // Try to get city and country data for more detailed metadata
  const [city, country] = await Promise.all([
    getCityByName(citySlug),
    getCountryByName(countrySlug)
  ])
  
  const displayCityName = city?.name || cityName
  const displayCountryName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `Visit ${displayCityName}, ${displayCountryName} - Travel Info, Top Attractions & Tips`,
      description: `Explore ${displayCityName} with TryDetour: things to do, best time to visit, travel costs, and complete city guides in one place.`,
      keywords: [
        `${displayCityName} travel guide`,
        `${displayCityName} ${displayCountryName}`,
        `visit ${displayCityName}`,
        `${displayCityName} attractions`,
        `${displayCityName} tourism`,
        `things to do in ${displayCityName}`,
        `${displayCityName} vacation`,
        `${displayCityName} holiday`,
        `${displayCityName} travel tips`,
        `${displayCountryName} cities`,
        'city guide',
        'travel destinations'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Visit ${displayCityName}, ${displayCountryName} - Travel Info, Top Attractions & Tips | ${SITE_CONFIG.name}`,
      description: `Explore ${displayCityName} with TryDetour: things to do, best time to visit, travel costs, and complete city guides in one place.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-${countrySlug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${displayCityName}, ${displayCountryName} - Beautiful city attractions and travel guide`,
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
      title: `${displayCityName}, ${displayCountryName} Travel Guide`,
      description: `Discover the best of ${displayCityName}, ${displayCountryName}. Complete travel guide with attractions and local tips.`,
      images: [city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-${countrySlug}.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function PlacePage({ params }: PlacePageProps) {
  const resolvedParams = await params
  
  return <Overview placeName={resolvedParams.cityname} countryName={resolvedParams.countryname} />
}
