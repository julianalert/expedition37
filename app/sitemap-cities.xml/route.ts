import { NextResponse } from 'next/server'
import getAllCountries from '@/lib/getAllCountries'
import getCitiesByCountryId from '@/lib/getCitiesByCountryId'
import { countryNameToSlug } from '@/lib/countryUtils'
import { cityNameToSlug } from '@/lib/cityUtils'
import { generateSitemapXml } from '@/lib/sitemapGenerator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trydetour.com'

export async function GET() {
  try {
    const currentDate = new Date().toISOString()
    const urls = []

    // Get all countries to find their cities
    const countries: Country[] = await getAllCountries()
    
    for (const country of countries) {
      const countrySlug = countryNameToSlug(country.name)
      
      // Get cities for this country
      try {
        const cities: City[] = await getCitiesByCountryId(country.id.toString())
        
        for (const city of cities) {
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
            'good-deals',
            'where-to-go'
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
    return new NextResponse('Error generating cities sitemap', { status: 500 })
  }
}
