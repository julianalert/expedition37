import { supabase } from './supabase'

export interface ContinentWithEmoji {
  name: string
  emoji: string
}

// Mapping of continents to their emojis
const CONTINENT_EMOJIS: Record<string, string> = {
  'Africa': '🌍',
  'Asia': '⛩️', 
  'Europe': '🇪🇺',
  'North America': '🌎',
  'South America': '💃',
  'Oceania': '🏝️'
}

export default async function getAllContinents(): Promise<ContinentWithEmoji[]> {
  try {
    const { data, error } = await supabase
      .from('country')
      .select('continent')
      .order('continent', { ascending: true })

    if (error) {
      console.error('Error fetching continents:', error)
      // Return fallback data if Supabase fails
      return getFallbackContinents()
    }

    if (!data) {
      return getFallbackContinents()
    }

    // Get unique continents
    const uniqueContinents = Array.from(new Set(data.map(item => item.continent)))
    
    // Map continents to their emoji equivalents
    const continentsWithEmojis = uniqueContinents.map(continent => ({
      name: continent,
      emoji: CONTINENT_EMOJIS[continent] || '🗺️'
    }))

    return continentsWithEmojis
  } catch (error) {
    console.error('Error connecting to Supabase:', error)
    // Return fallback data if connection fails
    return getFallbackContinents()
  }
}

// Fallback data in case Supabase is not available or configured
function getFallbackContinents(): ContinentWithEmoji[] {
  return [
    { name: 'Africa', emoji: '🌍' },
    { name: 'Asia', emoji: '⛩️' },
    { name: 'Europe', emoji: '🇪🇺' },
    { name: 'North America', emoji: '🌎' },
    { name: 'Oceania', emoji: '🏝️' },
    { name: 'South America', emoji: '💃' }
  ]
}
