/**
 * Utility functions for calculating destination similarity scores
 */

interface SimilarityWeights {
  continent: number
  mood: number
  vacationGoal: number
  ratings: number
  budget: number
  booleanAttributes: number
}

const DEFAULT_WEIGHTS: SimilarityWeights = {
  continent: 0.30,
  mood: 0.35,
  vacationGoal: 0.15,
  ratings: 0.10,
  budget: 0.05,
  booleanAttributes: 0.05
}

/**
 * Calculate similarity score between two countries
 */
export function calculateCountrySimilarity(
  country1: Country, 
  country2: Country, 
  weights: SimilarityWeights = DEFAULT_WEIGHTS
): number {
  let totalScore = 0
  let bonusScore = 0
  
  // Base bonus for any country (ensures minimum scores)
  bonusScore += 0.15
  
  // Continent similarity (exact match)
  if (country1.continent === country2.continent) {
    totalScore += weights.continent
    bonusScore += 0.10 // Extra bonus for same continent
  }
  
  // Mood similarity (array intersection) - Always try to calculate
  const moodSimilarity = calculateArraySimilarity(country1.mood || [], country2.mood || [])
  totalScore += weights.mood * moodSimilarity
  if (moodSimilarity > 0.3) bonusScore += 0.05 // Bonus for good mood match
  
  // Vacation goal similarity (array intersection) - Always try to calculate  
  const vacationGoalSimilarity = calculateArraySimilarity(country1.vacationgoal || [], country2.vacationgoal || [])
  totalScore += weights.vacationGoal * vacationGoalSimilarity
  
  // Ratings similarity (normalized distance)
  const ratingsSimilarity = calculateRatingsSimilarity(country1, country2)
  totalScore += weights.ratings * ratingsSimilarity
  
  // Budget similarity (normalized distance)
  if (country1.weeklyBudget && country2.weeklyBudget) {
    const budgetSimilarity = calculateBudgetSimilarity(country1.weeklyBudget, country2.weeklyBudget)
    totalScore += weights.budget * budgetSimilarity
  }
  
  // Boolean attributes similarity
  const booleanSimilarity = calculateBooleanAttributesSimilarity(country1, country2)
  totalScore += weights.booleanAttributes * booleanSimilarity
  
  // Apply generous scaling: square root to boost lower scores
  const finalScore = Math.sqrt(totalScore + bonusScore)
  
  return Math.min(finalScore, 1) // Cap at 1.0
}

/**
 * Calculate similarity score between two cities
 */
export function calculateCitySimilarity(
  city1: City, 
  city2: City, 
  city1Country?: Country, 
  city2Country?: Country,
  weights: SimilarityWeights = DEFAULT_WEIGHTS
): number {
  let totalScore = 0
  let bonusScore = 0
  
  // Base bonus for any city (ensures minimum scores)
  bonusScore += 0.15
  
  // Same country gets bonus points
  if (city1.country === city2.country) {
    totalScore += weights.continent * 0.5 // Half the continent weight
    bonusScore += 0.15 // Extra bonus for same country
  }
  // Different countries but same continent
  else if (city1Country && city2Country && city1Country.continent === city2Country.continent) {
    totalScore += weights.continent * 0.25 // Quarter the continent weight
    bonusScore += 0.08 // Bonus for same continent
  }
  
  // Mood similarity - Always try to calculate
  const moodSimilarity = calculateArraySimilarity(city1.mood || [], city2.mood || [])
  totalScore += weights.mood * moodSimilarity
  if (moodSimilarity > 0.3) bonusScore += 0.05 // Bonus for good mood match
  
  // Vacation goal similarity - Always try to calculate
  const vacationGoalSimilarity = calculateArraySimilarity(city1.vacationgoal || [], city2.vacationgoal || [])
  totalScore += weights.vacationGoal * vacationGoalSimilarity
  
  // Ratings similarity
  const ratingsSimilarity = calculateRatingsSimilarity(city1, city2)
  totalScore += weights.ratings * ratingsSimilarity
  
  // Budget similarity
  if (city1.weeklyBudget && city2.weeklyBudget) {
    const budgetSimilarity = calculateBudgetSimilarity(city1.weeklyBudget, city2.weeklyBudget)
    totalScore += weights.budget * budgetSimilarity
  }
  
  // Boolean attributes similarity
  const booleanSimilarity = calculateBooleanAttributesSimilarity(city1, city2)
  totalScore += weights.booleanAttributes * booleanSimilarity
  
  // Apply generous scaling: square root to boost lower scores
  const finalScore = Math.sqrt(totalScore + bonusScore)
  
  return Math.min(finalScore, 1)
}

/**
 * Get similar countries for a given country
 */
export function getSimilarCountries(
  targetCountry: Country, 
  allCountries: Country[], 
  limit: number = 6
): Array<{country: Country, similarity: number}> {
  const similarities = allCountries
    .filter(country => country.id !== targetCountry.id) // Exclude the target country
    .map(country => ({
      country,
      similarity: calculateCountrySimilarity(targetCountry, country)
    }))
    .filter(item => item.similarity > 0.05) // Lower minimum similarity threshold
    .sort((a, b) => b.similarity - a.similarity) // Sort by similarity descending
    .slice(0, limit)
  
  return similarities
}

/**
 * Get similar cities for a given city
 */
export function getSimilarCities(
  targetCity: City, 
  targetCountry: Country,
  allCities: City[], 
  allCountries: Country[],
  limit: number = 6
): Array<{city: City, country: Country, similarity: number}> {
  const countryMap = new Map(allCountries.map(c => [c.id, c]))
  
  const similarities = allCities
    .filter(city => city.id !== targetCity.id) // Exclude the target city
    .map(city => {
      const cityCountry = countryMap.get(city.country)
      return {
        city,
        country: cityCountry!,
        similarity: calculateCitySimilarity(targetCity, city, targetCountry, cityCountry)
      }
    })
    .filter(item => item.country && item.similarity > 0.05) // Lower minimum similarity threshold
    .sort((a, b) => b.similarity - a.similarity) // Sort by similarity descending
    .slice(0, limit)
  
  return similarities
}

/**
 * Helper: Calculate similarity between two arrays (More generous approach)
 */
function calculateArraySimilarity(arr1: string[], arr2: string[]): number {
  if (!arr1 || !arr2 || arr1.length === 0 || arr2.length === 0) return 0
  
  const set1 = new Set(arr1.map(item => item.toLowerCase()))
  const set2 = new Set(arr2.map(item => item.toLowerCase()))
  
  const intersection = new Set([...set1].filter(x => set2.has(x)))
  
  // Use a more generous formula: intersection / average of both sets
  // This gives higher scores for any overlap
  const avgSetSize = (set1.size + set2.size) / 2
  return avgSetSize === 0 ? 0 : intersection.size / avgSetSize
}

/**
 * Helper: Calculate ratings similarity (inverse of normalized distance)
 */
function calculateRatingsSimilarity(dest1: Country | City, dest2: Country | City): number {
  const ratings1 = [
    dest1.overallRating || 0,
    dest1.costRating || 0,
    dest1.safetyRating || 0,
    dest1.funRating || 0,
    dest1.foodRating || 0
  ]
  
  const ratings2 = [
    dest2.overallRating || 0,
    dest2.costRating || 0,
    dest2.safetyRating || 0,
    dest2.funRating || 0,
    dest2.foodRating || 0
  ]
  
  // Calculate normalized Euclidean distance
  let sumSquaredDiff = 0
  for (let i = 0; i < ratings1.length; i++) {
    const diff = (ratings1[i] - ratings2[i]) / 5 // Normalize by max rating (assuming 5-point scale)
    sumSquaredDiff += diff * diff
  }
  
  const distance = Math.sqrt(sumSquaredDiff / ratings1.length)
  return Math.max(0, 1 - distance) // Convert distance to similarity
}

/**
 * Helper: Calculate budget similarity (inverse of normalized distance)
 */
function calculateBudgetSimilarity(budget1: number, budget2: number): number {
  // Assuming max budget around $5000/week for normalization
  const maxBudget = 5000
  const normalizedDistance = Math.abs(budget1 - budget2) / maxBudget
  return Math.max(0, 1 - normalizedDistance)
}

/**
 * Helper: Calculate boolean attributes similarity
 */
function calculateBooleanAttributesSimilarity(dest1: Country | City, dest2: Country | City): number {
  const booleanFields = [
    'safe', 'fastInternet', 'cleanAir', 'hiddenGem', 'popular', 
    'familyFriendly', 'amazingFood', 'nightlife', 'greatForDating', 
    'ecofriendly', 'dogfriendly', 'lgbtqfriendly', 'lowRacism', 'muslimfriendly'
  ]
  
  let matches = 0
  let totalComparisons = 0
  
  for (const field of booleanFields) {
    const val1 = (dest1 as any)[field]
    const val2 = (dest2 as any)[field]
    
    // Only compare if both have values
    if (val1 !== undefined && val2 !== undefined) {
      totalComparisons++
      if (val1 === val2) {
        matches++
      }
    }
  }
  
  return totalComparisons === 0 ? 0 : matches / totalComparisons
}
