/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable bundle analyzer in development
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        }
      }
      return config
    },
  }),
  // Enable static generation for better performance
  experimental: {
    // This helps with sitemap generation performance
    staticWorkerRequestDeduping: true,
  },
  // Add environment variables for sitemap
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trytrydetour.com',
  },
  // Configure allowed image domains with optimization
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
    // Enable image optimization
    formats: ['image/webp', 'image/avif'],
    // Add device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Add image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
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
