import { NextResponse } from 'next/server'
import getAllCountries from '@/lib/getAllCountries'
import getCitiesByCountryId from '@/lib/getCitiesByCountryId'
import { countryNameToSlug } from '@/lib/countryUtils'
import { cityNameToSlug } from '@/lib/cityUtils'
import { generateSitemapXml, SitemapUrl } from '@/lib/sitemapGenerator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trydetour.com'

// Revalidate cities sitemap every 24 hours (86400 seconds)
// This is THE biggest CPU consumer - aggressive caching is critical
export const revalidate = 86400

export async function GET() {
  try {
    const currentDate = new Date().toISOString()
    const urls: SitemapUrl[] = []

    // Get all countries to find their cities
    let countries: Country[] = []
    
    try {
      countries = await getAllCountries()
    } catch (error) {
      console.error('Error fetching countries for cities sitemap:', error)
      // Return empty sitemap if we can't get countries
      const emptySitemap = generateSitemapXml([])
      return new NextResponse(emptySitemap, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=300, s-maxage=300', // Shorter cache for errors
        },
      })
    }

    // Limit the number of countries processed to avoid timeout
    const limitedCountries = countries.slice(0, 10) // Process only first 10 countries during build
    
    for (const country of limitedCountries) {
      try {
        const countrySlug = countryNameToSlug(country.name)
        
        // Get cities for this country with timeout protection
        const cities: City[] = await Promise.race([
          getCitiesByCountryId(country.id.toString()),
          new Promise<City[]>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 5000)
          )
        ])
        
        // Limit cities per country to avoid build timeout
        const limitedCities = cities.slice(0, 5)
        
        for (const city of limitedCities) {
          const citySlug = cityNameToSlug(city.name)
          
          // City main page
          urls.push({
            url: `${SITE_URL}/${countrySlug}/${citySlug}`,
            lastModified: city.updated_at || currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.6
          })

          // City sub-pages
          const citySubPages = [
            'best-time-to-visit',
            'things-to-do',
            'cost',
            'itinerary',
            'alternatives'
          ]

          citySubPages.forEach(subPage => {
            urls.push({
              url: `${SITE_URL}/${countrySlug}/${citySlug}/${subPage}`,
              lastModified: city.updated_at || currentDate,
              changeFrequency: 'weekly' as const,
              priority: 0.5
            })
          })
        }
      } catch (error) {
        console.error(`Error fetching cities for country ${country.name}:`, error)
        // Continue with next country instead of failing
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
    console.error('Error generating cities sitemap:', error)
    
    // Return a minimal sitemap instead of failing
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
