import MonthlyRating from '@/components/monthly-rating'
import TemperatureChart from '@/components/temperature-chart'

interface BestTimeToVisitProps {
  country: Country | null
}

export default function BestTimeToVisit({ country }: BestTimeToVisitProps) {

  if (!country) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Country not found</h2>
              <p className="text-gray-600">Unable to load travel information.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const countrySlug = country?.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown-country'
  
  return (
    <>      
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Best time to visit {country.name}
              </h1>
              <p className="text-gray-600">
                Plan your perfect trip with our seasonal guide and weather insights
              </p>
            </div>

            {/* Monthly Rating Component */}
            <MonthlyRating 
              bestTimeToVisit={country.bestTimeToVisit} 
              placeName={country.name}
            />

            {/* Temperature Chart Component */}
            <TemperatureChart 
              temperature={country.temperature} 
              placeName={country.name}
            />

            
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
