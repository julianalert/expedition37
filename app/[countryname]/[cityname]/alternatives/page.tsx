import SimilarPlaces from '../similar-places'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import { slugToCityName } from '@/lib/cityUtils'
import getCityByName from '@/lib/getCityByName'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface SimilarPlacesPageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export async function generateMetadata({ params }: SimilarPlacesPageProps): Promise<Metadata> {
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
      title: `Places Like ${displayCityName} - Best Alternatives For Travel`,
      description: `Find the best alternatives to ${displayCityName}. Compare similar cities and discover where to go instead of ${displayCityName}.`,
      keywords: [
        `places like ${displayCityName}`,
        `${displayCityName} alternatives`,
        `alternatives to ${displayCityName}`,
        `cities like ${displayCityName}`,
        'travel alternatives',
        'destination alternatives',
        'similar cities',
        'travel recommendations',
        `where to go instead of ${displayCityName}`
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/alternatives`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Places Like ${displayCityName} - Best Alternatives For Travel | ${SITE_CONFIG.name}`,
      description: `Find the best alternatives to ${displayCityName}. Compare similar cities and discover where to go instead of ${displayCityName}.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/alternatives`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-similar.jpg`,
          width: 1200,
          height: 630,
          alt: `Places similar to ${displayCityName}, ${displayCountryName} - Travel recommendations`,
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
      title: `Places Like ${displayCityName} - Best Alternatives For Travel`,
      description: `Find the best alternatives to ${displayCityName}. Compare similar cities and discover where to go instead of ${displayCityName}.`,
      images: [city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-alternatives.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function SimilarPlacesPage({ params }: SimilarPlacesPageProps) {
  const resolvedParams = await params
  
  // Fetch city and country data server-side for SEO
  const [city, country] = await Promise.all([
    getCityByName(resolvedParams.cityname),
    getCountryByName(resolvedParams.countryname)
  ])
  
  return (
    <SimilarPlaces 
      placeName={resolvedParams.cityname}
      countryName={resolvedParams.countryname}
      initialCity={city}
      initialCountry={country}
    />
  )
}
