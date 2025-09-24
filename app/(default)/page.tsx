import { generateMetadata, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'

const metadataConfig: MetadataConfig = {
  seo: {
    title: `${SITE_CONFIG.name} - Discover Your Perfect Travel Destination`,
    description: 'Find your ideal travel destination with personalized recommendations based on season, budget, departure city, and your travel preferences. Explore the world with confidence and discover hidden gems.',
    keywords: [
      'travel destinations',
      'travel recommendations',
      'holiday planning',
      'vacation destinations',
      'travel guide',
      'best places to visit',
      'travel planning tool',
      'destination finder',
      'travel inspiration',
      'world travel',
      'budget travel',
      'seasonal travel',
      'travel advice',
      'expedition',
      'adventure travel'
    ],
    canonical: SITE_CONFIG.url,
    robots: 'index, follow',
    author: SITE_CONFIG.author,
  },
  openGraph: {
    title: `${SITE_CONFIG.name} - Your Next Holiday Starts Here`,
    description: 'Explore the world with a tool that recommends the perfect destination for you. According to the season, your desires, budget and departure city.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/detour-og-image.png`,
        width: 2000,
        height: 1085,
        alt: 'Detour - Discover Your Perfect Travel Destination',
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
    title: `${SITE_CONFIG.name} - Discover Your Perfect Travel Destination`,
    description: 'Find your ideal travel destination with personalized recommendations based on season, budget, and preferences. Start your next adventure today!',
    images: [`${SITE_CONFIG.url}/images/detour-og-image.png`],
  },
}

export const metadata = generateMetadata(metadataConfig)
import Hero from '@/components/hero'
import PressLogos from '@/components/press-logos'
import Sidebar from '@/components/sidebar'
import InfiniteScrollPostsList from '@/components/infinite-scroll-posts-list'
import { FilterProvider } from '@/contexts/FilterContext'

export default function Home() {
  return (
    <>
      <Hero />
      {/* <PressLogos /> */}

      {/*  Page content */}
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-16">
            <FilterProvider>
              <div className="md:flex" data-sticky-container>

                <Sidebar />

                {/* Main content */}
                <div className="md:grow">
                  <InfiniteScrollPostsList />

                </div>

              </div>
            </FilterProvider>
          </div>
        </div>
      </section>
    </>
  )
}
