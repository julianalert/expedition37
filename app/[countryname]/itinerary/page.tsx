import Itinerary from '../itinerary'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface ItineraryPageProps {
  params: Promise<{
    countryname: string
  }>
}

export async function generateMetadata({ params }: ItineraryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const countryName = slugToCountryName(countrySlug)
  
  const country = await getCountryByName(countrySlug)
  const displayName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `${displayName} Itinerary - Create Your Personalized Travel Plan`,
      description: `Create a personalized travel itinerary for ${displayName}. Plan your perfect trip with AI-powered recommendations tailored to your interests and duration.`,
      keywords: [
        `${displayName} itinerary`,
        `${displayName} travel plan`,
        `${displayName} trip planner`,
        `personalized ${displayName} itinerary`,
        `${displayName} travel guide`,
        `${displayName} vacation planner`,
        `what to do in ${displayName}`,
        `${displayName} trip planning`,
        'travel itinerary planner',
        'AI travel planner',
        'country itinerary'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/itinerary`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `${displayName} Itinerary - Create Your Personalized Travel Plan | ${SITE_CONFIG.name}`,
      description: `Create a personalized travel itinerary for ${displayName}. Plan your perfect trip with AI-powered recommendations tailored to your interests and duration.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/itinerary`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${displayName} - Personalized travel itinerary planner`,
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
      title: `${displayName} Itinerary - Personalized Travel Plan`,
      description: `Create a personalized travel itinerary for ${displayName}. AI-powered trip planning tailored to your interests.`,
      images: [country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-itinerary.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  
  // Fetch country data server-side for SEO
  const country = await getCountryByName(countrySlug)
  
  return (
    <Itinerary 
      countryName={countrySlug}
      initialCountry={country}
    />
  )
}

