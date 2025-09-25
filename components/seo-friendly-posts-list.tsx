import { Suspense } from 'react'
import getPaginatedCountries from '@/lib/getPaginatedCountries'
import PostItem from '@/app/(default)/post-item'
import ClientSideInfiniteScroll from './client-side-infinite-scroll'
import StructuredData from './structured-data'

interface SEOFriendlyPostsListProps {
  initialCountries: Country[]
  hasMore: boolean
  total: number
}

// Server component that renders initial countries for SEO
export default function SEOFriendlyPostsList({ initialCountries, hasMore, total }: SEOFriendlyPostsListProps) {
  return (
    <div className="pb-8 md:pb-16">
      {/* Structured Data for SEO */}
      <StructuredData countries={initialCountries} totalCountries={total} />
      
      {/* Server-rendered initial countries for SEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="countries-grid">
        {initialCountries.map((country: Country, index: number) => (
          <PostItem key={`server-${country.id}`} {...country} />
        ))}
      </div>

      {/* Client-side infinite scroll component */}
      <Suspense fallback={<div className="mt-8 text-center">Loading more destinations...</div>}>
        <ClientSideInfiniteScroll 
          initialCountries={initialCountries}
          initialHasMore={hasMore}
          totalCountries={total}
        />
      </Suspense>
    </div>
  )
}

// Server action to get initial countries for homepage
export async function getInitialCountriesForHomepage() {
  try {
    const result = await getPaginatedCountries(0, 36)
    return {
      countries: result.countries,
      hasMore: result.hasMore,
      total: result.total
    }
  } catch (error) {
    console.error('Error loading initial countries for SEO:', error)
    return {
      countries: [],
      hasMore: false,
      total: 0
    }
  }
}
