import Cost from '../cost'
import { generateMetadata as generateMetadataUtil, generateViewport, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

// Revalidate this page every 24 hours (86400 seconds)
export const revalidate = 86400

interface CostPageProps {
  params: Promise<{
    countryname: string
  }>
}

export async function generateMetadata({ params }: CostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const countryName = slugToCountryName(countrySlug)
  
  const country = await getCountryByName(countrySlug)
  const displayName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `${displayName} Travel Cost Guide - How Expensive is ${displayName}?`,
      description: `Get a personalized travel cost breakdown for ${displayName}. Calculate your budget for accommodation, food, transportation, and activities with our AI-powered cost calculator.`,
      keywords: [
        `${displayName} travel cost`,
        `${displayName} budget`,
        `${displayName} travel expenses`,
        `how expensive is ${displayName}`,
        `${displayName} cost breakdown`,
        `${displayName} travel budget calculator`,
        `${displayName} trip cost`,
        `${displayName} vacation cost`,
        'travel cost calculator',
        'travel budget planner',
        'trip cost estimator'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/travel-cost`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `${displayName} Travel Cost Guide - How Expensive is ${displayName}? | ${SITE_CONFIG.name}`,
      description: `Get a personalized travel cost breakdown for ${displayName}. Calculate your budget for accommodation, food, transportation, and activities.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/travel-cost`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${displayName} - Travel cost guide and budget calculator`,
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
      title: `${displayName} Travel Cost Guide - Budget Calculator`,
      description: `Get a personalized travel cost breakdown for ${displayName}. Calculate your budget with our AI-powered cost calculator.`,
      images: [country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-cost.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export { generateViewport } from '@/lib/metadata'

export default async function CostPage({ params }: CostPageProps) {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  
  // Fetch data server-side for optimal performance
  const country = await getCountryByName(countrySlug)
  
  return <Cost country={country} />
}
