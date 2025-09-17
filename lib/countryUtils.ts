// Utility functions for country name/slug conversion

export function countryNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export function slugToCountryName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// For exact matching, we should compare the actual country names from the database
// This function will be used to find the country by comparing slugified versions
export function findCountryBySlug(countries: Country[], slug: string): Country | null {
  return countries.find(country => countryNameToSlug(country.name) === slug) || null
}
