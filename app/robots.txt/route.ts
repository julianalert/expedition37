import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trytrydetour.com'

// Revalidate robots.txt every 7 days (604800 seconds)
export const revalidate = 604800

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1

# Disallow admin and API routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}
