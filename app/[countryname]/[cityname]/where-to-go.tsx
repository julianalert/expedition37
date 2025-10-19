import PostsList from './posts-list'
import Sidebar from '@/components/sidebar'

interface WhereToGoProps {
  city: City | null
  countryName: string
}

export default function WhereToGo({ city, countryName }: WhereToGoProps) {
  if (!city) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
              <p className="text-gray-600">Unable to load destination information.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="md:flex md:justify-between" data-sticky-container>
            
            <Sidebar />

            {/* Main content */}
            <div className="md:grow">
              {/* Section title for attractions/areas */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Where to go in {city.name}
                </h1>
                <p className="text-gray-600">
                  Explore the best areas, attractions, and neighborhoods in {city.name}.
                </p>
              </div>

              {/* Areas/attractions list */}
              <PostsList placeName={city?.name || 'Unknown City'} countryName={countryName} />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
