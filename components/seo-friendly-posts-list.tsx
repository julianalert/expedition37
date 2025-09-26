import getAllCountries from '@/lib/getAllCountries'
import FilteredInitialCountries from './filtered-initial-countries'
import { HomepageStructuredData } from './structured-data'

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
      <HomepageStructuredData countries={initialCountries} totalCountries={total} />
      
      {/* Client-side filtered initial countries */}
      <FilteredInitialCountries initialCountries={initialCountries} />

      {/* Note: Infinite scroll removed - all countries are loaded server-side for maximum SEO */}
    </div>
  )
}

// Server action to get ALL countries for homepage (Option 1: Best SEO)
export async function getInitialCountriesForHomepage() {
  try {
    // Load ALL countries server-side for maximum SEO benefit
    // Google will see every single country on the homepage
    const countries = await getAllCountries()
    
    console.log(`✅ SEO Optimization: Loaded ${countries.length} countries server-side for Google crawling`)
    
    return {
      countries: countries,
      hasMore: false, // No more countries to load since we have them all
      total: countries.length
    }
  } catch (error) {
    console.error('❌ Error loading all countries for SEO:', error)
    // Return empty but don't break the page
    return {
      countries: [],
      hasMore: false,
      total: 0
    }
  }
}
