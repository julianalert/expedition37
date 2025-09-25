import { SITE_CONFIG } from '@/lib/metadata'

// Homepage structured data for travel destinations
interface HomepageStructuredDataProps {
  countries: Country[]
  totalCountries: number
}

export function HomepageStructuredData({ countries, totalCountries }: HomepageStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Detour - Travel Destination Finder",
    "description": "Find your ideal travel destination with personalized recommendations based on season, budget, and preferences.",
    "url": SITE_CONFIG.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_CONFIG.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Travel Destinations",
      "description": `Discover ${totalCountries}+ amazing travel destinations worldwide`,
      "numberOfItems": totalCountries,
      "itemListElement": countries.slice(0, 10).map((country, index) => ({
        "@type": "Place",
        "position": index + 1,
        "name": country.name,
        "description": `Travel to ${country.name} - ${country.continent}`,
        "geo": {
          "@type": "GeoCoordinates",
          "addressCountry": country.name
        },
        "url": `${SITE_CONFIG.url}/${country.name.toLowerCase().replace(/\s+/g, '-')}`,
        "image": country.image || country.thumbnail,
        "aggregateRating": country.overallRating ? {
          "@type": "AggregateRating",
          "ratingValue": (country.overallRating / 20).toFixed(1), // Convert to 5-star scale
          "bestRating": "5",
          "worstRating": "1"
        } : undefined
      }))
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Country page structured data
interface CountryStructuredDataProps {
  country: Country
  cities?: City[]
}

export function CountryStructuredData({ country, cities = [] }: CountryStructuredDataProps) {
  const countrySlug = country.name.toLowerCase().replace(/\s+/g, '-')
  
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": country.name,
    "description": country.overview?.short_desc || `Discover ${country.name} - a beautiful destination in ${country.continent}`,
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": country.name
    },
    "url": `${SITE_CONFIG.url}/${countrySlug}`,
    "image": country.image || country.thumbnail,
    "touristType": country.mood || [],
    "aggregateRating": country.overallRating ? {
      "@type": "AggregateRating",
      "ratingValue": (country.overallRating / 20).toFixed(1),
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "hasMap": `${SITE_CONFIG.url}/${countrySlug}`,
    "containedInPlace": {
      "@type": "Continent",
      "name": country.continent
    },
    "includedInDataCatalog": {
      "@type": "DataCatalog",
      "name": "Travel Destinations",
      "description": "Comprehensive travel guide and destination information"
    }
  }

  // Add cities if available
  if (cities.length > 0) {
    structuredData.containsPlace = cities.map(city => ({
      "@type": "City",
      "name": city.name,
      "description": city.description || `Explore ${city.name} in ${country.name}`,
      "url": `${SITE_CONFIG.url}/${countrySlug}/${city.name.toLowerCase().replace(/\s+/g, '-')}`,
      "image": city.image || city.thumbnail,
      "aggregateRating": city.overallRating ? {
        "@type": "AggregateRating",
        "ratingValue": (city.overallRating / 20).toFixed(1),
        "bestRating": "5",
        "worstRating": "1"
      } : undefined
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// City page structured data
interface CityStructuredDataProps {
  city: City
  country: Country
}

export function CityStructuredData({ city, country }: CityStructuredDataProps) {
  const countrySlug = country.name.toLowerCase().replace(/\s+/g, '-')
  const citySlug = city.name.toLowerCase().replace(/\s+/g, '-')
  
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "City",
    "name": city.name,
    "description": city.description || city.overview?.short_desc || `Discover ${city.name}, ${country.name}`,
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": country.name,
      "addressLocality": city.name
    },
    "url": `${SITE_CONFIG.url}/${countrySlug}/${citySlug}`,
    "image": city.image || city.thumbnail,
    "touristType": city.mood || [],
    "containedInPlace": {
      "@type": "Country",
      "name": country.name,
      "url": `${SITE_CONFIG.url}/${countrySlug}`
    },
    "aggregateRating": city.overallRating ? {
      "@type": "AggregateRating",
      "ratingValue": (city.overallRating / 20).toFixed(1),
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "hasMap": `${SITE_CONFIG.url}/${countrySlug}/${citySlug}`,
    "maximumAttendeeCapacity": "unlimited"
  }

  // Add budget information if available
  if (city.weeklyBudget) {
    structuredData.offers = {
      "@type": "Offer",
      "category": "Travel Budget",
      "description": `Weekly budget for ${city.name}`,
      "price": city.weeklyBudget.toString(),
      "priceCurrency": "USD"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Travel guide structured data for specific guides (best places, best time to visit)
interface TravelGuideStructuredDataProps {
  title: string
  description: string
  location: string
  guideType: 'best-places' | 'best-time' | 'overview'
  url: string
  image?: string
  country?: Country
  city?: City
}

export function TravelGuideStructuredData({ 
  title, 
  description, 
  location, 
  guideType, 
  url, 
  image,
  country,
  city 
}: TravelGuideStructuredDataProps) {
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": title,
    "description": description,
    "url": url,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": SITE_CONFIG.url,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.url}/images/detour.svg`
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "inLanguage": "en-US",
    "about": {
      "@type": city ? "City" : "Country",
      "name": location,
      "url": city ? 
        `${SITE_CONFIG.url}/${country?.name.toLowerCase().replace(/\s+/g, '-')}/${city.name.toLowerCase().replace(/\s+/g, '-')}` :
        `${SITE_CONFIG.url}/${location.toLowerCase().replace(/\s+/g, '-')}`
    }
  }

  // Add specific properties based on guide type
  if (guideType === 'best-time' && (country || city)) {
    const entity = city || country
    if (entity?.bestTimeToVisit) {
      // Parse bestTimeToVisit if it's a string, or use as-is if it's already an array
      let bestTimeData: MonthlyRating[] = []
      
      if (typeof entity.bestTimeToVisit === 'string') {
        try {
          bestTimeData = JSON.parse(entity.bestTimeToVisit)
        } catch (error) {
          console.error('Error parsing bestTimeToVisit data:', error)
          bestTimeData = []
        }
      } else if (Array.isArray(entity.bestTimeToVisit)) {
        bestTimeData = entity.bestTimeToVisit
      }
      
      if (Array.isArray(bestTimeData) && bestTimeData.length > 0) {
        const goodMonths = bestTimeData
          .filter(month => month.rating === 'good')
          .map(month => month.month)
        
        if (goodMonths.length > 0) {
          structuredData.temporalCoverage = goodMonths.join(', ')
        }
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Organization structured data for the website
export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_CONFIG.url}/images/detour.svg`,
      "width": 200,
      "height": 200
    },
    "description": SITE_CONFIG.description,
    "foundingDate": "2024",
    "sameAs": [
      `https://twitter.com/${SITE_CONFIG.twitter.replace('@', '')}`
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["English"]
    },
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Travel Destination Recommendations",
        "description": "Personalized travel destination recommendations based on preferences, budget, and season"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Default export for backward compatibility
export default HomepageStructuredData
