import { generateMetadata, generateViewport, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import TravelPlannerClient from './travel-planner-client'

// Revalidate travel planner page every 6 hours (21600 seconds)
export const revalidate = 21600

const metadataConfig: MetadataConfig = {
  seo: {
    title: 'Travel Planner Tools - Plan Your Trip Smarter',
    description: 'Discover the ultimate AI travel planner tools. Generate itineraries, estimate trip costs, and explore where to go next, all in one place.',
    keywords: [
      'travel planner',
      'trip planner',
      'itinerary generator',
      'travel tools',
      'budget calculator',
      'travel planning',
      'AI travel planner',
      'trip planning tools',
      'vacation planner',
      'travel organizer',
      'destination planner',
      'travel budget',
      'trip cost calculator',
      'travel itinerary',
      'smart travel planning'
    ],
    canonical: `${SITE_CONFIG.url}/travel-planner`,
    robots: 'index, follow',
    author: SITE_CONFIG.author,
  },
  openGraph: {
    title: 'Travel Planner Tools - Plan Your Trip Smarter',
    description: 'Discover the ultimate AI travel planner tools. Generate itineraries, estimate trip costs, and explore where to go next, all in one place.',
    url: `${SITE_CONFIG.url}/travel-planner`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/detour-og-image.png`,
        width: 2000,
        height: 1085,
        alt: 'Travel Planner Tools - Plan Your Trip Smarter',
        type: 'image/png',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONFIG.twitter,
    creator: SITE_CONFIG.twitter,
    title: 'Travel Planner Tools - Plan Your Trip Smarter',
    description: 'Discover the ultimate AI travel planner tools. Generate itineraries, estimate trip costs, and explore where to go next, all in one place.',
    images: [`${SITE_CONFIG.url}/images/detour-og-image.png`],
  },
}

export const metadata = generateMetadata(metadataConfig)
export const viewport = generateViewport()

export default function TravelPlannerPage() {
  return <TravelPlannerClient />
}