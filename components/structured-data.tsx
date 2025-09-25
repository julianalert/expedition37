interface StructuredDataProps {
  countries: Country[]
  totalCountries: number
}

export default function StructuredData({ countries, totalCountries }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Detour - Travel Destination Finder",
    "description": "Find your ideal travel destination with personalized recommendations based on season, budget, and preferences.",
    "url": "https://www.trytrydetour.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.trytrydetour.com/search?q={search_term_string}",
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
        "url": `https://www.trytrydetour.com/${country.name.toLowerCase().replace(/\s+/g, '-')}/best-places-to-visit`,
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
