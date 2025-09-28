import { generateMetadata, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import Link from 'next/link'
import Image from 'next/image'
import Illustration from '@/public/images/hero-illustration.svg'
import { getAllBlogPosts } from '@/lib/blog-discovery'

const metadataConfig: MetadataConfig = {
  seo: {
    title: `Travel Blog - ${SITE_CONFIG.name}`,
    description: 'Discover travel insights, destination guides, and expert tips from our travel blog. Get inspired for your next adventure with stories from around the world.',
    keywords: [
      'travel blog',
      'travel stories',
      'destination guides',
      'travel tips',
      'travel inspiration',
      'adventure stories',
      'travel advice',
      'holiday planning',
      'travel experiences'
    ],
    canonical: `${SITE_CONFIG.url}/blog`,
    robots: 'index, follow',
    author: SITE_CONFIG.author,
  },
  openGraph: {
    title: `Travel Blog - ${SITE_CONFIG.name}`,
    description: 'Discover travel insights, destination guides, and expert tips from our travel blog.',
    url: `${SITE_CONFIG.url}/blog`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/detour-og-image.png`,
        width: 2000,
        height: 1085,
        alt: 'Travel Blog - Detour',
        type: 'image/png',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONFIG.twitter,
    creator: SITE_CONFIG.twitter,
    title: `Travel Blog - ${SITE_CONFIG.name}`,
    description: 'Discover travel insights, destination guides, and expert tips from our travel blog.',
    images: [`${SITE_CONFIG.url}/images/detour-og-image.png`],
  },
}

export const metadata = generateMetadata(metadataConfig)

export default function BlogPage() {
  // Get all blog posts automatically from the blog directory
  const blogPosts = getAllBlogPosts()
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Bg */}
        <div className="absolute inset-0 bg-linear-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true" />

        {/* Illustration */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
          <Image src={Illustration} className="max-w-none" priority alt="Hero Illustration" />
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-28 pb-8 md:pt-36 md:pb-16">
            {/* Hero content */}
            <div className="max-w-6xl text-center md:text-left">
              {/* Copy */}
              <h1 className="h1 font-inter mb-6">
                Travel <span className="font-nycd text-indigo-500 font-normal">Stories</span> & Insights
              </h1>
              <p className="text-lg text-gray-500 mb-8">
                Get inspired with travel guides, destination insights, and expert tips to make your next adventure unforgettable.
                <br className="hidden md:block" /> Discover stories from around the world and plan your perfect journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-16">
            
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                      <Link 
                        href={`/blog/${post.id}`}
                        className="hover:text-indigo-600 transition-colors duration-200"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        By {post.author}
                      </div>
                      <Link 
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
                      >
                        Read more
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty state if no posts */}
            {blogPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
                <p className="text-gray-500">Check back soon for exciting travel stories and guides!</p>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
