import Cost from '../cost'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import { slugToCityName } from '@/lib/cityUtils'
import getCityByName from '@/lib/getCityByName'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface CostPageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export async function generateMetadata({ params }: CostPageProps): Promise<Metadata> {
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
      title: `${displayCityName} Travel Cost Guide - How Expensive is ${displayCityName}?`,
      description: `Get a personalized travel cost breakdown for ${displayCityName}, ${displayCountryName}. Calculate your budget for accommodation, food, transportation, and activities with our AI-powered cost calculator.`,
      keywords: [
        `${displayCityName} travel cost`,
        `${displayCityName} budget`,
        `${displayCityName} travel expenses`,
        `how expensive is ${displayCityName}`,
        `${displayCityName} cost breakdown`,
        `${displayCityName} travel budget calculator`,
        `${displayCityName} trip cost`,
        `${displayCityName} vacation cost`,
        `${displayCityName} ${displayCountryName} cost`,
        'travel cost calculator',
        'travel budget planner',
        'trip cost estimator'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/cost`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `${displayCityName} Travel Cost Guide - How Expensive is ${displayCityName}? | ${SITE_CONFIG.name}`,
      description: `Get a personalized travel cost breakdown for ${displayCityName}, ${displayCountryName}. Calculate your budget for accommodation, food, transportation, and activities.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/cost`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${displayCityName}, ${displayCountryName} - Travel cost guide and budget calculator`,
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
      title: `${displayCityName} Travel Cost Guide - Budget Calculator`,
      description: `Get a personalized travel cost breakdown for ${displayCityName}, ${displayCountryName}. Calculate your budget with our AI-powered cost calculator.`,
      images: [city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-cost.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function CostPage({ params }: CostPageProps) {
  const resolvedParams = await params
  
  // Fetch city and country data server-side for SEO
  const [city, country] = await Promise.all([
    getCityByName(resolvedParams.cityname),
    getCountryByName(resolvedParams.countryname)
  ])
  
  return (
    <Cost 
      placeName={resolvedParams.cityname}
      countryName={resolvedParams.countryname}
      initialCity={city}
      initialCountry={country}
    />
  )
}
