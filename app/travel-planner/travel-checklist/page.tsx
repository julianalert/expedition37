import { Metadata } from 'next'
import PackingChecklistClient from './packing-checklist-client'

export const metadata: Metadata = {
  title: 'Create Your Own Smart Travel Packing Checklist',
  description: 'Generate your perfect packing list for traveling for any trip. Add details like destination, duration and activities to get a travel items checklist that fits you.',
  openGraph: {
    title: 'Create Your Own Smart Travel Packing Checklist',
    description: 'Generate your perfect packing list for traveling for any trip. Add details like destination, duration and activities to get a travel items checklist that fits you.',
    url: 'https://www.trydetour.com/travelplanner/travel-checklist',
    siteName: 'TryDetour',
    images: [
      {
        url: 'https://www.trydetour.com/detour-og-image.png',
        width: 1200,
        height: 630,
        alt: 'TryDetour - Travel Packing Checklist',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Your Own Smart Travel Packing Checklist',
    description: 'Generate your perfect packing list for traveling for any trip. Add details like destination, duration and activities to get a travel items checklist that fits you.',
    images: ['https://www.trydetour.com/detour-og-image.png'],
  },
  alternates: {
    canonical: 'https://www.trydetour.com/travelplanner/travel-checklist',
  },
}

export default function PackingChecklistPage() {
  return <PackingChecklistClient />
}
