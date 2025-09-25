import { supabase } from './supabase'

interface PaginatedCountriesResult {
  countries: Country[]
  hasMore: boolean
  total: number
}

export default async function getPaginatedCountries(
  page: number = 0, 
  limit: number = 36
): Promise<PaginatedCountriesResult> {
  try {
    const offset = page * limit

    // Get total count for hasMore calculation
    const { count, error: countError } = await supabase
      .from('country')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Error getting countries count:', countError)
      return getFallbackPaginatedCountries(page, limit)
    }

    // Get paginated countries
    const { data, error } = await supabase
      .from('country')
      .select('*')
      .order('rank', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching paginated countries:', error)
      return getFallbackPaginatedCountries(page, limit)
    }

    const hasMore = count ? (offset + limit) < count : false

    console.log(`Loaded countries page ${page + 1}: ${data?.length || 0} countries, hasMore: ${hasMore}`)

    return {
      countries: data || [],
      hasMore,
      total: count || 0
    }
  } catch (error) {
    console.error('Error connecting to Supabase for paginated countries:', error)
    return getFallbackPaginatedCountries(page, limit)
  }
}

// Fallback data for when Supabase is not available
function getFallbackPaginatedCountries(page: number, limit: number): PaginatedCountriesResult {
  const fallbackCountries: Country[] = [
    {
      id: 1,
      name: "Maldives",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      continent: "Asia",
      mood: ["luxury", "beach", "tropical", "romantic"],
      rank: 1,
      vacationgoal: ["Relax", "Romantic"],
      safe: true,
      weeklyBudget: 2500,
      overallRating: 92,
      costRating: 25,
      safetyRating: 88,
      funRating: 85,
      foodRating: 75
    },
    {
      id: 2,
      name: "Belgium",
      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["culture", "food", "history", "cozy"],
      rank: 2,
      vacationgoal: ["Explore a culture"],
      safe: true,
      weeklyBudget: 800,
      overallRating: 82,
      costRating: 65,
      safetyRating: 90,
      funRating: 78,
      foodRating: 88
    },
    {
      id: 3,
      name: "Japan",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      continent: "Asia",
      mood: ["culture", "technology", "nature", "traditional"],
      rank: 3,
      vacationgoal: ["Explore a culture", "Have fun"],
      safe: true,
      weeklyBudget: 1200,
      overallRating: 89,
      costRating: 45,
      safetyRating: 95,
      funRating: 85,
      foodRating: 92
    }
  ]

  const offset = page * limit
  const pageCountries = fallbackCountries.slice(offset, offset + limit)
  const hasMore = (offset + limit) < fallbackCountries.length

  return {
    countries: pageCountries,
    hasMore,
    total: fallbackCountries.length
  }
}
