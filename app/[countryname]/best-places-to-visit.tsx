import PostsList from './posts-list'
import Sidebar from '@/components/sidebar'

interface BestPlacesToVisitProps {
  country: Country | null
  cities: City[]
}

export default function BestPlacesToVisit({ country, cities }: BestPlacesToVisitProps) {
  if (!country) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h2>
              <p className="text-gray-600">Unable to load destination information.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>      
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="md:flex md:justify-between" data-sticky-container>
            
            <Sidebar />

            {/* Main content */}
            <div className="md:grow">
              {/* Section title for cities */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Best places to visit in {country.name}
                </h1>
                <p className="text-gray-600">
                  Discover the top destinations and cities to visit in {country.name}.
                </p>
              </div>

              {/* Cities list */}
              <PostsList cities={cities} countryName={country.name} />
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}
