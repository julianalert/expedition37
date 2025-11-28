import { generateMetadata, generateViewport, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import ItineraryGeneratorClient from './itinerary-generator-client'

// Revalidate itinerary generator page every 6 hours (21600 seconds)
export const revalidate = 21600

const metadataConfig: MetadataConfig = {
  seo: {
    title: 'Travel Itinerary Generator - Build a Personalized Itinerary in Seconds',
    description: 'Design your next trip with our smart itinerary maker. Generate personalized travel plans for 3 days, 1 week, or even a month instantly and for free.',
    keywords: [
      'itinerary generator',
      'travel itinerary maker',
      'trip planner',
      'personalized itinerary',
      'travel planning tool',
      'AI itinerary generator',
      'vacation planner',
      'travel route planner',
      'day by day itinerary',
      'custom travel plan',
      'smart itinerary',
      'free itinerary maker',
      'travel schedule generator'
    ],
    canonical: `${SITE_CONFIG.url}/travel-planner/itinerary-generator`,
    robots: 'index, follow',
    author: SITE_CONFIG.author,
  },
  openGraph: {
    title: 'Travel Itinerary Generator - Build a Personalized Itinerary in Seconds',
    description: 'Design your next trip with our smart itinerary maker. Generate personalized travel plans for 3 days, 1 week, or even a month instantly and for free.',
    url: `${SITE_CONFIG.url}/travel-planner/itinerary-generator`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/detour-og-image.png`,
        width: 2000,
        height: 1085,
        alt: 'Travel Itinerary Generator - Build a Personalized Itinerary in Seconds',
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
    title: 'Travel Itinerary Generator - Build a Personalized Itinerary in Seconds',
    description: 'Design your next trip with our smart itinerary maker. Generate personalized travel plans for 3 days, 1 week, or even a month instantly and for free.',
    images: [`${SITE_CONFIG.url}/images/detour-og-image.png`],
  },
}

export const metadata = generateMetadata(metadataConfig)
export const viewport = generateViewport()

export default function ItineraryGeneratorPage() {
  return <ItineraryGeneratorClient />
}
