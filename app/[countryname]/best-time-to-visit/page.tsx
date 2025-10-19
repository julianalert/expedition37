import BestTimeToVisit from '../best-time-to-visit'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import getCountryByName from '@/lib/getCountryByName'
import { TravelGuideStructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'

// Revalidate this page every 24 hours (86400 seconds)
export const revalidate = 86400

interface BestTimePageProps {
  params: Promise<{
    countryname: string
  }>
}

export async function generateMetadata({ params }: BestTimePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const countryName = slugToCountryName(countrySlug)
  
  const country = await getCountryByName(countrySlug)
  const displayName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `Best Time to Visit ${displayName} - Weather & Seasons Guide`,
      description: `Find out when to visit ${displayName}. Get insights on weather, peak and low seasons, costs and seasonal highlights.`,
      keywords: [
        `best time to visit ${displayName}`,
        `${displayName} weather`,
        `${displayName} seasons`,
        `${displayName} climate`,
        `when to visit ${displayName}`,
        `${displayName} travel months`,
        `${displayName} temperature`,
        `${displayName} rainfall`,
        'travel planning',
        'weather guide',
        'seasonal travel'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/best-time-to-visit`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Best Time to Visit ${displayName} | ${SITE_CONFIG.name}`,
      description: `Plan your perfect ${displayName} trip with our weather and seasons guide. Find the ideal months for your travel style and preferences.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/best-time-to-visit`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-weather.jpg`,
          width: 1200,
          height: 630,
          alt: `Best time to visit ${displayName} - Weather and seasons guide`,
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
      title: `Best Time to Visit ${displayName}`,
      description: `Discover the perfect months to visit ${displayName} with our comprehensive weather and seasons guide.`,
      images: [country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-weather.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function BestTimePage({ params }: BestTimePageProps) {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  
  // Fetch country data server-side for SEO
  const country = await getCountryByName(countrySlug)
  
  return (
    <>
      {/* Server-side structured data for SEO */}
      {country && (
        <TravelGuideStructuredData
          title={`Best Time to Visit ${country.name}`}
          description={`Find the perfect time to visit ${country.name}. Complete weather guide with seasonal recommendations, temperatures, and travel tips.`}
          location={country.name}
          guideType="best-time"
          url={`${SITE_CONFIG.url}/${countrySlug}/best-time-to-visit`}
          image={country.image}
          country={country}
        />
      )}
      
      <BestTimeToVisit countryName={countrySlug} initialCountry={country} />
    </>
  )
}
