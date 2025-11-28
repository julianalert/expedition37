import { generateMetadata, generateViewport, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import QuizClient from './quiz-client'

// Revalidate quiz page every 6 hours (21600 seconds)
export const revalidate = 21600

const metadataConfig: MetadataConfig = {
  seo: {
    title: 'Where Should I Travel Quiz',
    description: 'Not sure where you should go on vacation? Answer a few questions and let our smart travel quiz suggest your next dream destination.',
    keywords: [
      'where should i travel',
      'travel quiz',
      'destination quiz',
      'where to go quiz',
      'travel personality quiz',
      'vacation destination quiz',
      'travel recommendation quiz',
      'where should i go on vacation',
      'travel destination finder',
      'travel personality test',
      'vacation quiz',
      'travel style quiz',
      'destination finder quiz'
    ],
    canonical: `${SITE_CONFIG.url}/travel-planner/quiz-where-should-i-travel`,
    robots: 'index, follow',
    author: SITE_CONFIG.author,
  },
  openGraph: {
    title: 'Where Should I Travel Quiz',
    description: 'Not sure where you should go on vacation? Answer a few questions and let our smart travel quiz suggest your next dream destination.',
    url: `${SITE_CONFIG.url}/travel-planner/quiz-where-should-i-travel`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/detour-og-image.png`,
        width: 2000,
        height: 1085,
        alt: 'Where Should I Travel Quiz',
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
    title: 'Where Should I Travel Quiz',
    description: 'Not sure where you should go on vacation? Answer a few questions and let our smart travel quiz suggest your next dream destination.',
    images: [`${SITE_CONFIG.url}/images/detour-og-image.png`],
  },
}

export const metadata = generateMetadata(metadataConfig)
export const viewport = generateViewport()

export default function QuizPage() {
  return <QuizClient />
}
