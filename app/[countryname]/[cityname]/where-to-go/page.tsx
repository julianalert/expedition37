import WhereToGo from '../where-to-go'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import { slugToCityName } from '@/lib/cityUtils'
import getCityByName from '@/lib/getCityByName'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface WhereToGoPageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export async function generateMetadata({ params }: WhereToGoPageProps): Promise<Metadata> {
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
      title: `Where to Go in ${displayCityName}, ${displayCountryName} - Best Areas & Districts`,
      description: `Discover the best areas and districts to visit in ${displayCityName}, ${displayCountryName}. Find top neighborhoods, attractions, and hidden gems for your perfect city exploration.`,
      keywords: [
        `where to go in ${displayCityName}`,
        `${displayCityName} neighborhoods`,
        `${displayCityName} districts`,
        `${displayCityName} areas to visit`,
        `${displayCityName} attractions`,
        `${displayCityName} highlights`,
        `${displayCityName} ${displayCountryName} guide`,
        `${displayCityName} must see`,
        `${displayCityName} places to visit`,
        'city guide',
        'neighborhood guide',
        'urban exploration'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/where-to-go`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Where to Go in ${displayCityName}, ${displayCountryName} | ${SITE_CONFIG.name}`,
      description: `Explore the best neighborhoods and areas in ${displayCityName}. Discover top attractions, local gems, and must-visit districts.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/where-to-go`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-areas.jpg`,
          width: 1200,
          height: 630,
          alt: `Best areas and neighborhoods to visit in ${displayCityName}, ${displayCountryName}`,
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
      title: `Where to Go in ${displayCityName}`,
      description: `Discover the best neighborhoods and areas to explore in ${displayCityName}, ${displayCountryName}.`,
      images: [city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-areas.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function WhereToGoPage({ params }: WhereToGoPageProps) {
  const resolvedParams = await params
  return <WhereToGo placeName={resolvedParams.cityname} countryName={resolvedParams.countryname} />
}
