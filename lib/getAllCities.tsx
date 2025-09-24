import { supabase } from './supabase'

export default async function getAllCities(): Promise<City[]> {
  // Check if Supabase environment variables are configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log('Supabase not configured, using fallback data for cities')
    return getFallbackCities()
  }

  try {
    const { data, error } = await supabase
      .from('city')
      .select('*')
      .order('overallRating', { ascending: false, nullsLast: true })
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching cities from Supabase:', error)
      console.log('Falling back to local city data')
      return getFallbackCities()
    }

    if (data && data.length > 0) {
      console.log(`Successfully fetched ${data.length} cities from Supabase`)
      
      // Debug: Log sample city data to see what properties are available
      console.log('Sample city data (first 2 cities):', data.slice(0, 2))
      if (data[0]) {
        console.log('First city filter properties:', {
          name: data[0].name,
          safe: data[0].safe,
          fastInternet: data[0].fastInternet,
          weeklyBudget: data[0].weeklyBudget,
          amazingFood: data[0].amazingFood,
          nightlife: data[0].nightlife,
          vacationgoal: data[0].vacationgoal
        })
      }
      
      return data
    } else {
      console.log('No cities found in Supabase, using fallback data')
      return getFallbackCities()
    }
  } catch (error) {
    console.error('Error connecting to Supabase for cities:', error)
    console.log('Falling back to local city data')
    return getFallbackCities()
  }
}

// Fallback data in case Supabase is not available or configured
function getFallbackCities(): City[] {
  const fallbackCities: City[] = [
    // Thailand cities
    { id: 1, name: "Bangkok", country: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: true, rank: 1, mood: ["vibrant", "cultural", "affordable"], description: "Thailand's bustling capital city, known for its vibrant street life, ornate temples, and incredible street food scene." },
    { id: 2, name: "Chiang Mai", country: 1, image: "https://images.unsplash.com/photo-1596622897385-0086202d383d?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", thumbnail: "https://images.unsplash.com/photo-1596622897385-0086202d383d?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", featured: true, rank: 3, mood: ["cultural", "peaceful", "affordable", "temples"], description: "A cultural hub in northern Thailand, famous for its ancient temples, night markets, and laid-back mountain atmosphere." },
    
    // Indonesia cities
    { id: 3, name: "Canggu", country: 2, image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 2, mood: ["beach", "surf", "relaxed", "spiritual"], description: "A laid-back beach town in Bali, perfect for surfing, yoga retreats, and enjoying stunning sunsets over rice paddies." },
    
    // Malaysia cities
    { id: 4, name: "Kuala Lumpur", country: 3, image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 4, mood: ["modern", "multicultural", "urban", "affordable"], description: "Malaysia's dynamic capital, home to the iconic Petronas Towers and a melting pot of cultures, cuisines, and modern attractions." },
    
    // Georgia cities
    { id: 5, name: "Tbilisi", country: 4, image: "https://images.unsplash.com/photo-1603350576276-24747f7bbf40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGJpbGlzaXxlbnwwfHwwfHx8MA%3D%3D", thumbnail: "https://images.unsplash.com/photo-1603350576276-24747f7bbf40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGJpbGlzaXxlbnwwfHwwfHx8MA%3D%3D", featured: false, rank: 5, mood: ["historic", "affordable", "emerging", "cultural"] },
    
    // Japan cities
    { id: 6, name: "Tokyo", country: 5, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 6, mood: ["modern", "tech", "urban", "efficient"] },
    
    // Portugal cities
    { id: 7, name: "Lisbon", country: 6, image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 7, mood: ["coastal", "historic", "affordable", "charming"] },
    
    // Mexico cities
    { id: 8, name: "Mexico City", country: 7, image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 8, mood: ["vibrant", "cultural", "affordable", "artistic"] },
    { id: 17, name: "Playa del Carmen", country: 7, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 17, mood: ["beach", "party", "cenotes", "diving"] },
    
    // Argentina cities
    { id: 9, name: "Buenos Aires", country: 8, image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 9, mood: ["tango", "cultural", "nightlife", "affordable"] },
    
    // Czech Republic cities
    { id: 10, name: "Prague", country: 9, image: "https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 10, mood: ["historic", "affordable", "charming", "beer"] },
    
    // Colombia cities
    { id: 11, name: "Medellín", country: 10, image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 11, mood: ["emerging", "affordable", "spring-weather", "innovative"] },
    
    // South Africa cities
    { id: 12, name: "Cape Town", country: 11, image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: true, rank: 12, mood: ["scenic", "wine", "adventure", "coastal"] },
    
    // UAE cities
    { id: 13, name: "Dubai", country: 12, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 13, mood: ["luxury", "modern", "desert", "shopping"] },
    
    // Turkey cities
    { id: 14, name: "Istanbul", country: 13, image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 14, mood: ["historic", "cultural", "bridge-cultures", "affordable"] },
    
    // Vietnam cities
    { id: 15, name: "Ho Chi Minh City", country: 14, image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 15, mood: ["vibrant", "street-food", "affordable", "motorbikes"] },
    
    // Spain cities
    { id: 16, name: "Barcelona", country: 15, image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", thumbnail: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", featured: false, rank: 16, mood: ["artistic", "coastal", "vibrant", "architecture"] },
    
    // Germany cities
    { id: 18, name: "Berlin", country: 16, image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVybGlufGVufDB8fDB8fHww", thumbnail: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVybGlufGVufDB8fDB8fHww", featured: false, rank: 18, mood: ["alternative", "nightlife", "historic", "affordable"] }
  ]
  
  return fallbackCities
}
