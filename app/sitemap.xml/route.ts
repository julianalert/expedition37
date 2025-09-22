import { NextResponse } from 'next/server'
import { generateSitemapUrls, generateSitemapXml, validateSitemapUrls } from '@/lib/sitemapGenerator'

export async function GET() {
  try {
    // Generate all sitemap URLs
    const urls = await generateSitemapUrls()
    
    // Validate URLs
    const validUrls = validateSitemapUrls(urls)
    
    // Generate XML sitemap
    const sitemap = generateSitemapXml(validUrls)

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
