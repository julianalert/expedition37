import { NextResponse } from 'next/server'
import getAllPosts from '@/lib/getAllPosts'
import { generateSitemapXml, SitemapUrl } from '@/lib/sitemapGenerator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trydetour.com'

// Revalidate posts sitemap every 24 hours (86400 seconds)
export const revalidate = 86400

export async function GET() {
  try {
    const currentDate = new Date().toISOString()
    const urls: SitemapUrl[] = []

    // Get all posts with better error handling
    try {
      const posts: Post[] = await getAllPosts()
      posts.forEach((post: Post) => {
        urls.push({
          url: `${SITE_URL}/posts/${post.id}`,
          lastModified: post.date || currentDate,
          changeFrequency: 'monthly' as const,
          priority: 0.6
        })
      })
    } catch (error) {
      console.error('Error fetching posts for sitemap:', error)
      // Continue with empty posts array - this is not critical
    }

    const sitemap = generateSitemapXml(urls)

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating posts sitemap:', error)
    
    // Return minimal fallback sitemap
    const fallbackSitemap = generateSitemapXml([
      {
        url: `${SITE_URL}/posts`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 0.8
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
