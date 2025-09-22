/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static generation for better performance
  experimental: {
    // This helps with sitemap generation performance
    staticWorkerRequestDeduping: true,
  },
  // Add environment variables for sitemap
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trytrydetour.com',
  },
  // Optimize for sitemap generation
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml',
      },
    ]
  },
}

module.exports = nextConfig
