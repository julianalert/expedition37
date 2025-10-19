/**
 * Validates and provides fallback for image URLs
 * Prevents Next.js Image component from crashing with invalid URLs
 */

const FALLBACK_IMAGES = {
  country: '/images/blog/travel-planning.jpg',
  city: '/images/blog/travel-planning.jpg',
  default: '/images/blog/travel-planning.jpg'
}

export function getValidImageUrl(
  thumbnail?: string | null, 
  image?: string | null, 
  fallbackType: 'country' | 'city' | 'default' = 'default'
): string {
  const imageUrl = thumbnail || image
  
  // Check if URL exists and is not empty
  if (!imageUrl || imageUrl.trim() === '') {
    return FALLBACK_IMAGES[fallbackType]
  }
  
  // Check if URL is valid
  try {
    new URL(imageUrl)
    return imageUrl
  } catch {
    // Invalid URL, return fallback
    return FALLBACK_IMAGES[fallbackType]
  }
}

/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.trim() === '') return false
  
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
