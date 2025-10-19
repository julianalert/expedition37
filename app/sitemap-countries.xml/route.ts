import { NextResponse } from 'next/server'
import getAllCountries from '@/lib/getAllCountries'
import { countryNameToSlug } from '@/lib/countryUtils'
import { generateSitemapXml, SitemapUrl } from '@/lib/sitemapGenerator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trydetour.com'

// Revalidate countries sitemap every 24 hours (86400 seconds)
export const revalidate = 86400

export async function GET() {
  try {
    const currentDate = new Date().toISOString()
    const urls: SitemapUrl[] = []

    // Get all countries
    const countries: Country[] = await getAllCountries()
    
    for (const country of countries) {
      const countrySlug = countryNameToSlug(country.name)
      
      // Country main page
      urls.push({
        url: `${SITE_URL}/${countrySlug}`,
        lastModified: country.updated_at || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8
      })

      // Country sub-pages
      const countrySubPages = [
        'best-places-to-visit',
        'best-time-to-visit',
        'good-deals'
      ]

      countrySubPages.forEach(subPage => {
        urls.push({
          url: `${SITE_URL}/${countrySlug}/${subPage}`,
          lastModified: country.updated_at || currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.7
        })
      })
    }

    const sitemap = generateSitemapXml(urls)

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating countries sitemap:', error)
    return new NextResponse('Error generating countries sitemap', { status: 500 })
  }
}
