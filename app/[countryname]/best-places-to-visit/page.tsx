import BestPlacesToVisit from '../best-places-to-visit'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface BestPlacesToVisitPageProps {
  params: Promise<{
    countryname: string
  }>
}

export async function generateMetadata({ params }: BestPlacesToVisitPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const countryName = slugToCountryName(countrySlug)
  
  const country = await getCountryByName(countrySlug)
  const displayName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `Best Places to Visit in ${displayName}`,
      description: `Find where to go in ${displayName}. From regions to visit to must-see cities and hidden gems, explore country best destinations.`,
      keywords: [
        `best places to visit in ${displayName}`,
        `${displayName} destinations`,
        `${displayName} cities`,
        `${displayName} attractions`,
        `top ${displayName} destinations`,
        `${displayName} must see`,
        `${displayName} highlights`,
        `${displayName} travel guide`,
        `visit ${displayName}`,
        `${displayName} tourism`,
        'travel destinations',
        'city guide'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/best-places-to-visit`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Best Places to Visit in ${displayName} | ${SITE_CONFIG.name}`,
      description: `Explore the top destinations and cities in ${displayName}. Discover must-see attractions and hidden gems for your perfect trip.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/best-places-to-visit`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-places.jpg`,
          width: 1200,
          height: 630,
          alt: `Best places to visit in ${displayName} - Top destinations and attractions`,
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
      title: `Best Places to Visit in ${displayName}`,
      description: `Discover the top destinations and must-see cities in ${displayName} for your perfect adventure.`,
      images: [country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-places.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function BestPlacesToVisitPage({ params }: BestPlacesToVisitPageProps) {
  const resolvedParams = await params
  return <BestPlacesToVisit countryName={resolvedParams.countryname} />
}
