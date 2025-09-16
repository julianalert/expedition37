import { supabase } from './supabase'

export default async function getAllCountries(): Promise<Country[]> {
  try {
    const { data, error } = await supabase
      .from('country')
      .select('*')
      .order('name', { ascending: true })

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
      name: "Thailand",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      continent: "Asia",
      mood: ["vibrant", "cultural", "affordable", "tropical"]
    },
    {
      id: 2,
      name: "Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Asia",
      mood: ["beach", "islands", "relaxed", "spiritual"]
    },
    {
      id: 3,
      name: "Malaysia",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Asia",
      mood: ["modern", "multicultural", "urban", "affordable"]
    },
    {
      id: 4,
      name: "Georgia",
      image: "https://images.unsplash.com/photo-1603350576276-24747f7bbf40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGJpbGlzaXxlbnwwfHwwfHx8MA%3D%3D",
      featured: false,
      continent: "Europe",
      mood: ["historic", "affordable", "emerging", "cultural"]
    },
    {
      id: 5,
      name: "Japan",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Asia",
      mood: ["modern", "tech", "urban", "efficient"]
    },
    {
      id: 6,
      name: "Portugal",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["coastal", "historic", "affordable", "charming"]
    },
    {
      id: 7,
      name: "Mexico",
      image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "North America",
      mood: ["vibrant", "cultural", "affordable", "artistic"]
    },
    {
      id: 8,
      name: "Argentina",
      image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "South America",
      mood: ["tango", "cultural", "nightlife", "affordable"]
    },
    {
      id: 9,
      name: "Czech Republic",
      image: "https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["historic", "affordable", "charming", "beer"]
    },
    {
      id: 10,
      name: "Colombia",
      image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "South America",
      mood: ["emerging", "affordable", "spring-weather", "innovative"]
    },
    {
      id: 11,
      name: "South Africa",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      continent: "Africa",
      mood: ["scenic", "wine", "adventure", "coastal"]
    },
    {
      id: 12,
      name: "UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Asia",
      mood: ["luxury", "modern", "desert", "shopping"]
    },
    {
      id: 13,
      name: "Turkey",
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["historic", "cultural", "bridge-cultures", "affordable"]
    },
    {
      id: 14,
      name: "Vietnam",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Asia",
      mood: ["vibrant", "street-food", "affordable", "motorbikes"]
    },
    {
      id: 15,
      name: "Spain",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      continent: "Europe",
      mood: ["artistic", "coastal", "vibrant", "architecture"]
    },
    {
      id: 16,
      name: "Germany",
      image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVybGlufGVufDB8fDB8fHww",
      featured: false,
      continent: "Europe",
      mood: ["alternative", "nightlife", "historic", "affordable"]
    }
  ]
}
