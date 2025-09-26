import SimilarCountries from '../similar-countries'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import getCountryByName from '@/lib/getCountryByName'
import { TravelGuideStructuredData } from '@/components/structured-data'
import type { Metadata } from 'next'

interface SimilarCountriesPageProps {
  params: Promise<{
    countryname: string
  }>
}

export async function generateMetadata({ params }: SimilarCountriesPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const countryName = slugToCountryName(countrySlug)
  
  const country = await getCountryByName(countrySlug)
  const displayName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `Countries Like ${displayName} - Best Alternatives For Travel`,
      description: `Looking for places like ${displayName}? Discover alternative destinations with similar vibe, culture, and attractions.`,
      keywords: [
        `countries like ${displayName}`,
        `${displayName} alternatives`,
        `places similar to ${displayName}`,
        'alternative destinations',
        'travel alternatives',
        'destination alternatives',
        'travel recommendations',
        'destination comparison'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/alternatives`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Countries Like ${displayName} - Best Alternatives For Travel | ${SITE_CONFIG.name}`,
      description: `Looking for places like ${displayName}? Discover alternative destinations with similar vibe, culture, and attractions.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/alternatives`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-similar.jpg`,
          width: 1200,
          height: 630,
          alt: `Countries similar to ${displayName} - Travel recommendations`,
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
      title: `Countries Like ${displayName} - Best Alternatives For Travel`,
      description: `Looking for places like ${displayName}? Discover alternative destinations with similar vibe, culture, and attractions.`,
      images: [country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-alternatives.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function SimilarCountriesPage({ params }: SimilarCountriesPageProps) {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  
  // Fetch country data server-side for SEO
  const country = await getCountryByName(countrySlug)
  
  return (
    <>
      {/* Server-side structured data for SEO */}
      {country && (
        <TravelGuideStructuredData
          title={`Alternatives To ${country.name}`}
          description={`Discover countries with similar vibes, budgets, and experiences to ${country.name}. Perfect destinations for travelers who loved ${country.name}.`}
          location={country.name}
          guideType="overview"
          url={`${SITE_CONFIG.url}/${countrySlug}/alternatives`}
          image={country.image}
          country={country}
        />
      )}
      
      <SimilarCountries countryName={countrySlug} initialCountry={country} />
    </>
  )
}
