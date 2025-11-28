import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { latitude, longitude, city, country } = body

    // Validate input
    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Missing required fields: latitude and longitude are required' },
        { status: 400 }
      )
    }

    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('OpenAI API key is not configured')
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      )
    }

    // Create location description
    const locationDescription = city && country 
      ? `${city}, ${country} (${latitude}, ${longitude})`
      : `coordinates ${latitude}, ${longitude}`

    // Create prompt for OpenAI
    const prompt = `Based on the location ${locationDescription}, provide a comprehensive guide of interesting places to visit nearby.

Please organize the response with the following sections:

1. **🏛️ Top Attractions & Landmarks** - Must-see places, monuments, museums, and cultural sites within 50km
2. **🏙️ Nearby Cities & Towns** - Interesting cities and towns worth visiting within 100km, with brief descriptions
3. **✈️ Airports & Transportation** - Closest airports and major transportation hubs with distances
4. **🏨 Accommodation Options** - Recommended hotels, unique stays, and accommodation areas nearby
5. **🌿 Natural Attractions** - Parks, beaches, mountains, lakes, and outdoor activities in the area
6. **🍽️ Local Food & Dining** - Notable restaurants, local specialties, and food experiences
7. **🛍️ Shopping & Entertainment** - Shopping areas, markets, nightlife, and entertainment venues
8. **📍 Hidden Gems** - Lesser-known but amazing local spots that tourists often miss

For each recommendation:
- Include approximate distance/travel time when relevant
- Mention what makes each place special
- Consider different interests (culture, nature, food, adventure, relaxation)
- Provide practical information where helpful

Format the response in a clear, engaging manner using markdown formatting with proper headings and bullet points.`

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable local travel expert who provides detailed, accurate, and practical recommendations for places to visit. Your suggestions are well-researched, consider different travel preferences, and include helpful practical information. Always provide specific names of places, distances, and what makes each recommendation special.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to find nearby places. Please try again later.' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const results = data.choices[0]?.message?.content

    if (!results) {
      return NextResponse.json(
        { error: 'No nearby places were found. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Error finding nearby places:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
