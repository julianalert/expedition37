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
  // Configure allowed image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'wcxnzbyatpvwnbawemmx.supabase.co',
      },
    ],
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
