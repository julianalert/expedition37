import { NextResponse } from 'next/server'
import { generateSitemapXml, SitemapUrl } from '@/lib/sitemapGenerator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trydetour.com'

export async function GET() {
  try {
    const currentDate = new Date().toISOString()
    const urls: SitemapUrl[] = []

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

    const sitemap = generateSitemapXml(urls)

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating static sitemap:', error)
    return new NextResponse('Error generating static sitemap', { status: 500 })
  }
}
