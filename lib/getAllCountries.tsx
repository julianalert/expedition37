import { supabase } from './supabase'

export default async function getAllCountries(): Promise<Country[]> {
  try {
    const { data, error } = await supabase
      .from('country')
      .select('*')
      .order('rank', { ascending: true })

    if (error) {
      console.error('Error fetching countries:', error)
      // Return fallback data if Supabase fails
      return getFallbackCountries()
    }

    return data || []
  } catch (error) {
    console.error('Error connecting to Supabase:', error)
    // Return fallback data if connection fails
    return getFallbackCountries()
  }
}

// Fallback data in case Supabase is not available or configured
function getFallbackCountries(): Country[] {
  return [
    {
      id: 1,
      name: "Maldives",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      continent: "Asia",
      mood: ["luxury", "beach", "tropical", "romantic"],
      rank: 1
    },
    {
      id: 2,
      name: "Belgium",
      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["historic", "cultural", "charming", "chocolate"],
      rank: 2
    },
    {
      id: 3,
      name: "Italy",
      image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["historic", "cultural", "romantic", "artistic"],
      rank: 3
    },
    {
      id: 4,
      name: "France",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["romantic", "cultural", "luxury", "artistic"],
      rank: 4
    },
    {
      id: 5,
      name: "Thailand",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      continent: "Asia",
      mood: ["vibrant", "cultural", "affordable", "tropical"],
      rank: 5
    },
    {
      id: 6,
      name: "Spain",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["artistic", "coastal", "vibrant", "architecture"],
      rank: 6
    },
    {
      id: 7,
      name: "Lithuania",
      image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["historic", "affordable", "charming", "emerging"],
      rank: 7
    },
    {
      id: 8,
      name: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Asia",
      mood: ["modern", "tech", "urban", "efficient"],
      rank: 8
    },
    {
      id: 9,
      name: "Greece",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["historic", "islands", "coastal", "romantic"],
      rank: 9
    },
    {
      id: 10,
      name: "Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Asia",
      mood: ["beach", "islands", "relaxed", "spiritual"],
      rank: 10
    },
    {
      id: 11,
      name: "Portugal",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["coastal", "historic", "affordable", "charming"],
      rank: 11
    },
    {
      id: 12,
      name: "Vietnam",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Asia",
      mood: ["vibrant", "street-food", "affordable", "motorbikes"],
      rank: 12
    },
    {
      id: 13,
      name: "Germany",
      image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVybGlufGVufDB8fDB8fHww",
      featured: false,
      continent: "Europe",
      mood: ["alternative", "nightlife", "historic", "affordable"],
      rank: 13
    },
    {
      id: 14,
      name: "United Kingdom",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["historic", "cultural", "royal", "charming"],
      rank: 14
    },
    {
      id: 15,
      name: "South Africa",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      continent: "Africa",
      mood: ["scenic", "wine", "adventure", "coastal"],
      rank: 15
    },
    {
      id: 16,
      name: "Netherlands",
      image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["charming", "canals", "cultural", "cycling"],
      rank: 16
    }
  ]
}
