import MonthlyRating from '@/components/monthly-rating'
import TemperatureChart from '@/components/temperature-chart'
import { TravelGuideStructuredData } from '@/components/structured-data'
import { SITE_CONFIG } from '@/lib/metadata'

interface BestTimeToVisitProps {
  city: City | null
  country: Country | null
}

export default function BestTimeToVisit({ city, country }: BestTimeToVisitProps) {
  if (!city) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
              <p className="text-gray-600">Unable to load travel information.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const countrySlug = country?.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'
  const citySlug = city?.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'
  
  return (
    <>
      {/* Structured Data for SEO */}
      {city && country && (
        <TravelGuideStructuredData
          title={`Best Time to Visit ${city.name}, ${country.name}`}
          description={`Find the perfect time to visit ${city.name}, ${country.name}. Complete weather guide with seasonal recommendations and travel tips.`}
          location={city.name}
          guideType="best-time"
          url={`${SITE_CONFIG.url}/${countrySlug}/${citySlug}/best-time-to-visit`}
          image={city.image || city.thumbnail}
          country={country}
          city={city}
        />
      )}
      
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Best time to visit {city.name}
              </h1>
              <p className="text-gray-600">
                Plan your perfect trip with our seasonal guide and weather insights
              </p>
            </div>

            {/* Monthly Rating Component */}
            <MonthlyRating 
              bestTimeToVisit={city.bestTimeToVisit} 
              placeName={city.name}
            />

            {/* Temperature Chart Component */}
            <TemperatureChart 
              temperature={city.temperature} 
              placeName={city.name}
            />

            
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
