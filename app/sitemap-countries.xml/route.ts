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

    // Get all countries with error handling
    let countries: Country[] = []
    
    try {
      countries = await getAllCountries()
    } catch (error) {
      console.error('Error fetching countries for sitemap:', error)
      // Return minimal sitemap if we can't get countries
      const fallbackSitemap = generateSitemapXml([
        {
          url: `${SITE_URL}`,
          lastModified: currentDate,
          changeFrequency: 'daily' as const,
          priority: 1.0
        }
      ])
      
      return new NextResponse(fallbackSitemap, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=300, s-maxage=300',
        },
      })
    }
    
    for (const country of countries) {
      try {
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
          'cost',
          'itinerary',
          'alternatives'
        ]

        countrySubPages.forEach(subPage => {
          urls.push({
            url: `${SITE_URL}/${countrySlug}/${subPage}`,
            lastModified: country.updated_at || currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.7
          })
        })
      } catch (error) {
        console.error(`Error processing country ${country.name}:`, error)
        // Continue with next country
        continue
      }
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
    
    // Return minimal fallback sitemap
    const fallbackSitemap = generateSitemapXml([
      {
        url: `${SITE_URL}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 1.0
      }
    ])
    
    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    })
  }
}
