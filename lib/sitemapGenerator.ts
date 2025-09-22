import getAllCountries from './getAllCountries'
import getCitiesByCountryId from './getCitiesByCountryId'
import getAllPosts from './getAllPosts'
import { countryNameToSlug } from './countryUtils'
import { cityNameToSlug } from './cityUtils'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trydetour.com'

export interface SitemapUrl {
  url: string
  lastModified: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export async function generateSitemapUrls(): Promise<SitemapUrl[]> {
  const urls: SitemapUrl[] = []
  const currentDate = new Date().toISOString()

  try {
    // Static pages
    const staticPages = [
      { url: '', priority: 1.0, changeFreq: 'daily' as const },
      { url: '/signin', priority: 0.3, changeFreq: 'monthly' as const },
      { url: '/post-a-job', priority: 0.5, changeFreq: 'monthly' as const },
    ]

    staticPages.forEach(page => {
      urls.push({
        url: `${SITE_URL}${page.url}`,
        lastModified: currentDate,
        changeFrequency: page.changeFreq,
        priority: page.priority
      })
    })

    // Get all posts for the posts section
    try {
      const posts = await getAllPosts()
      posts.forEach(post => {
        urls.push({
          url: `${SITE_URL}/posts/${post.id}`,
          lastModified: post.date || currentDate,
          changeFrequency: 'monthly',
          priority: 0.6
        })
      })
    } catch (error) {
      console.error('Error fetching posts for sitemap:', error)
    }

    // Get all countries
    const countries = await getAllCountries()
    
    for (const country of countries) {
      const countrySlug = countryNameToSlug(country.name)
      
      // Country main page
      urls.push({
        url: `${SITE_URL}/${countrySlug}`,
        lastModified: country.updated_at || currentDate,
        changeFrequency: 'weekly',
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
          changeFrequency: 'weekly',
          priority: 0.7
        })
      })

      // Get cities for this country
      try {
        const cities = await getCitiesByCountryId(country.id.toString())
        
        for (const city of cities) {
          const citySlug = cityNameToSlug(city.name)
          
          // City main page
          urls.push({
            url: `${SITE_URL}/${countrySlug}/${citySlug}`,
            lastModified: city.updated_at || currentDate,
            changeFrequency: 'weekly',
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
              changeFrequency: 'weekly',
              priority: 0.5
            })
          })
        }
      } catch (error) {
        console.error(`Error fetching cities for country ${country.name}:`, error)
      }
    }

    return urls
  } catch (error) {
    console.error('Error generating sitemap URLs:', error)
    throw error
  }
}

export function generateSitemapXml(urls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastModified, changeFrequency, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`
}

// Helper function to validate URLs
export function validateSitemapUrls(urls: SitemapUrl[]): SitemapUrl[] {
  return urls.filter(url => {
    // Basic URL validation
    try {
      new URL(url.url)
      return true
    } catch {
      console.warn(`Invalid URL found in sitemap: ${url.url}`)
      return false
    }
  })
}
