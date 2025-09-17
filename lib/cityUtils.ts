// Utility functions for city name/slug conversion

export function cityNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export function slugToCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// For exact matching, we should compare the actual city names from the database
// This function will be used to find the city by comparing slugified versions
export function findCityBySlug(cities: City[], slug: string): City | null {
  return cities.find(city => cityNameToSlug(city.name) === slug) || null
}
