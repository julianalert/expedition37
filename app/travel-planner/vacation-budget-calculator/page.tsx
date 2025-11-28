import { generateMetadata, generateViewport, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import BudgetCalculatorClient from './budget-calculator-client'

// Revalidate budget calculator page every 6 hours (21600 seconds)
export const revalidate = 21600

const metadataConfig: MetadataConfig = {
  seo: {
    title: 'Vacation Budget Calculator - Estimate Your Trip Cost',
    description: 'Use our free vacation cost calculator to plan your budget. Estimate accommodation, food, transport, and total expenses before you travel.',
    keywords: [
      'vacation budget calculator',
      'trip cost calculator',
      'travel budget planner',
      'vacation cost estimator',
      'travel expense calculator',
      'budget planning tool',
      'trip budget estimator',
      'vacation planning calculator',
      'travel cost breakdown',
      'holiday budget calculator',
      'free budget calculator',
      'travel expense planner'
    ],
    canonical: `${SITE_CONFIG.url}/travel-planner/vacation-budget-calculator`,
    robots: 'index, follow',
    author: SITE_CONFIG.author,
  },
  openGraph: {
    title: 'Vacation Budget Calculator - Estimate Your Trip Cost',
    description: 'Use our free vacation cost calculator to plan your budget. Estimate accommodation, food, transport, and total expenses before you travel.',
    url: `${SITE_CONFIG.url}/travel-planner/vacation-budget-calculator`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/detour-og-image.png`,
        width: 2000,
        height: 1085,
        alt: 'Vacation Budget Calculator - Estimate Your Trip Cost',
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
    title: 'Vacation Budget Calculator - Estimate Your Trip Cost',
    description: 'Use our free vacation cost calculator to plan your budget. Estimate accommodation, food, transport, and total expenses before you travel.',
    images: [`${SITE_CONFIG.url}/images/detour-og-image.png`],
  },
}

export const metadata = generateMetadata(metadataConfig)
export const viewport = generateViewport()

export default function BudgetCalculatorPage() {
  return <BudgetCalculatorClient />
}
