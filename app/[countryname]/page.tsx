import Overview from './overview'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface CountryPageProps {
  params: Promise<{
    countryname: string
  }>
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const countryName = slugToCountryName(countrySlug)
  
  // Try to get country data for more detailed metadata
  const country = await getCountryByName(countrySlug)
  const displayName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `${displayName} Travel Guide & Destinations`,
      description: `Discover the best places to visit in ${displayName}. Find travel recommendations, best time to visit, and hidden gems for your perfect ${displayName} holiday.`,
      keywords: [
        `${displayName} travel`,
        `${displayName} destinations`,
        `${displayName} travel guide`,
        `${displayName} tourism`,
        `visit ${displayName}`,
        `${displayName} attractions`,
        `${displayName} vacation`,
        `${displayName} holiday`,
        `things to do in ${displayName}`,
        `${displayName} travel tips`,
        'travel planning',
        'destination guide'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `${displayName} Travel Guide | ${SITE_CONFIG.name}`,
      description: `Explore ${displayName} with our comprehensive travel guide. Discover the best destinations, travel tips, and perfect timing for your ${displayName} adventure.`,
      url: `${SITE_CONFIG.url}/${countrySlug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${displayName} Travel Guide - Beautiful destinations and travel recommendations`,
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
      title: `${displayName} Travel Guide | ${SITE_CONFIG.name}`,
      description: `Explore ${displayName} with our comprehensive travel guide. Perfect destinations and travel tips for your next adventure.`,
      images: [country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-og.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function CountryPage({ params }: CountryPageProps) {
  const resolvedParams = await params
  
  return <Overview countryName={resolvedParams.countryname} />
}
