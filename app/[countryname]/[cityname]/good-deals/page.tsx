import GoodDeals from '../good-deals'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import { slugToCityName } from '@/lib/cityUtils'
import getCityByName from '@/lib/getCityByName'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface GoodDealsPageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export async function generateMetadata({ params }: GoodDealsPageProps): Promise<Metadata> {
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
      title: `Best ${displayCityName} Travel Deals & Offers - Save on Your Trip`,
      description: `Find the best travel deals and offers for ${displayCityName}, ${displayCountryName}. Discover budget-friendly hotels, activities, and travel packages for your ${displayCityName} vacation.`,
      keywords: [
        `${displayCityName} travel deals`,
        `${displayCityName} hotel deals`,
        `${displayCityName} cheap flights`,
        `${displayCityName} budget travel`,
        `${displayCityName} offers`,
        `${displayCityName} discounts`,
        `${displayCityName} ${displayCountryName} deals`,
        `cheap ${displayCityName} vacation`,
        `${displayCityName} promotions`,
        'travel deals',
        'budget travel',
        'city deals'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/good-deals`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Best ${displayCityName} Travel Deals | ${SITE_CONFIG.name}`,
      description: `Save money on your ${displayCityName}, ${displayCountryName} trip! Find the best deals on hotels, activities, and travel packages.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/${citySlug}/good-deals`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-deals.jpg`,
          width: 1200,
          height: 630,
          alt: `Best travel deals for ${displayCityName}, ${displayCountryName}`,
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
      title: `Best ${displayCityName} Travel Deals`,
      description: `Save money on your ${displayCityName} trip with the best deals on hotels, activities, and more.`,
      images: [city?.image || `${SITE_CONFIG.url}/images/destinations/${citySlug}-deals.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function GoodDealsPage({ params }: GoodDealsPageProps) {
  const resolvedParams = await params
  return <GoodDeals placeName={resolvedParams.cityname} countryName={resolvedParams.countryname} />
}
