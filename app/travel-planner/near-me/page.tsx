import { generateMetadata, generateViewport, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import NearMeClient from './near-me-client'

// Revalidate near me page every 6 hours (21600 seconds)
export const revalidate = 21600

const metadataConfig: MetadataConfig = {
  seo: {
    title: 'Near Me - Discover Amazing Places Around You',
    description: 'Find interesting places, attractions, hotels, and hidden gems near your current location. Discover what\'s around you with our location-based travel tool.',
    keywords: [
      'near me',
      'places near me',
      'attractions near me',
      'things to do nearby',
      'local attractions',
      'nearby places to visit',
      'location-based travel',
      'discover nearby',
      'local travel guide',
      'nearby hotels',
      'nearby restaurants',
      'hidden gems near me',
      'travel near me'
    ],
    canonical: `${SITE_CONFIG.url}/travel-planner/near-me`,
    robots: 'index, follow',
    author: SITE_CONFIG.author,
  },
  openGraph: {
    title: 'Near Me - Discover Amazing Places Around You',
    description: 'Find interesting places, attractions, hotels, and hidden gems near your current location. Discover what\'s around you with our location-based travel tool.',
    url: `${SITE_CONFIG.url}/travel-planner/near-me`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/detour-og-image.png`,
        width: 2000,
        height: 1085,
        alt: 'Near Me - Discover Amazing Places Around You',
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
    title: 'Near Me - Discover Amazing Places Around You',
    description: 'Find interesting places, attractions, hotels, and hidden gems near your current location. Discover what\'s around you with our location-based travel tool.',
    images: [`${SITE_CONFIG.url}/images/detour-og-image.png`],
  },
}

export const metadata = generateMetadata(metadataConfig)
export const viewport = generateViewport()

export default function NearMePage() {
  return <NearMeClient />
}
