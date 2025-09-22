import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  robots?: string
  author?: string
}

export interface OpenGraphConfig {
  title: string
  description: string
  url: string
  siteName: string
  images: {
    url: string
    width: number
    height: number
    alt: string
    type?: string
  }[]
  type: 'website' | 'article'
  locale?: string
}

export interface TwitterConfig {
  card: 'summary' | 'summary_large_image' | 'app' | 'player'
  site?: string
  creator?: string
  title: string
  description: string
  images: string[]
}

export interface MetadataConfig {
  seo: SEOConfig
  openGraph: OpenGraphConfig
  twitter: TwitterConfig
}

export function generateMetadata(config: MetadataConfig): Metadata {
  const { seo, openGraph, twitter } = config

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: seo.author ? [{ name: seo.author }] : undefined,
    robots: seo.robots || 'index, follow',
    
    alternates: seo.canonical ? {
      canonical: seo.canonical,
    } : undefined,
    
    openGraph: {
      title: openGraph.title,
      description: openGraph.description,
      url: openGraph.url,
      siteName: openGraph.siteName,
      images: openGraph.images,
      type: openGraph.type,
      locale: openGraph.locale || 'en_US',
    },
    
    twitter: {
      card: twitter.card,
      site: twitter.site,
      creator: twitter.creator,
      title: twitter.title,
      description: twitter.description,
      images: twitter.images,
    },
    
    // Additional metadata
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#6366f1', // Indigo-500 from the design
    
    // Verification tags (you can add these later)
    // verification: {
    //   google: 'your-google-site-verification',
    //   yandex: 'your-yandex-verification',
    //   yahoo: 'your-yahoo-verification',
    // },
  }
}

// Site-wide constants
export const SITE_CONFIG = {
  name: 'Detour',
  url: 'https://www.trydetour.com',
  description: 'Discover your perfect travel destination with personalized recommendations based on season, budget, and preferences. Explore the world with confidence.',
  author: 'Detour Team',
  twitter: '@trydetour', // Update with your actual Twitter handle
  image: '/images/detour-og-image.png',
}
