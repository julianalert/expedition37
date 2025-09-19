import GoodDeals from '../good-deals'
import { generateMetadata as generateMetadataUtil, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import { slugToCountryName } from '@/lib/countryUtils'
import getCountryByName from '@/lib/getCountryByName'
import type { Metadata } from 'next'

interface GoodDealsPageProps {
  params: Promise<{
    countryname: string
  }>
}

export async function generateMetadata({ params }: GoodDealsPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const countrySlug = resolvedParams.countryname
  const countryName = slugToCountryName(countrySlug)
  
  const country = await getCountryByName(countrySlug)
  const displayName = country?.name || countryName

  const metadataConfig: MetadataConfig = {
    seo: {
      title: `Best ${displayName} Travel Deals & Offers - Save on Your Trip`,
      description: `Find the best travel deals and offers for ${displayName}. Discover budget-friendly accommodations, flights, and activities for your perfect ${displayName} vacation.`,
      keywords: [
        `${displayName} travel deals`,
        `${displayName} cheap flights`,
        `${displayName} hotel deals`,
        `${displayName} budget travel`,
        `${displayName} offers`,
        `${displayName} discounts`,
        `cheap ${displayName} vacation`,
        `${displayName} travel packages`,
        `${displayName} promotions`,
        'travel deals',
        'budget travel',
        'travel savings'
      ],
      canonical: `${SITE_CONFIG.url}/${countrySlug}/good-deals`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: `Best ${displayName} Travel Deals | ${SITE_CONFIG.name}`,
      description: `Save money on your ${displayName} trip! Find the best deals on flights, hotels, and activities for an affordable ${displayName} adventure.`,
      url: `${SITE_CONFIG.url}/${countrySlug}/good-deals`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-deals.jpg`,
          width: 1200,
          height: 630,
          alt: `Best travel deals for ${displayName} - Save on your vacation`,
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
      title: `Best ${displayName} Travel Deals`,
      description: `Save money on your ${displayName} trip with the best deals on flights, hotels, and activities.`,
      images: [country?.image || `${SITE_CONFIG.url}/images/destinations/${countrySlug}-deals.jpg`],
    },
  }

  return generateMetadataUtil(metadataConfig)
}

export default async function GoodDealsPage({ params }: GoodDealsPageProps) {
  const resolvedParams = await params
  return <GoodDeals countryName={resolvedParams.countryname} />
}
