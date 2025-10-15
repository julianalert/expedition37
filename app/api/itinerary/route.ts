import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { destination, interests, duration } = body

    // Validate input
    if (!destination || !interests || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields: destination, interests, and duration are required' },
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

    // Create prompt for OpenAI
    const prompt = `Create a detailed, day-by-day travel itinerary for ${destination} for ${duration}.

The traveler is interested in: ${interests}

Please provide:
1. A brief introduction
2. Day-by-day breakdown with specific activities, timing suggestions, and practical tips
3. Recommendations for restaurants, attractions, and local experiences
4. Budget tips where relevant
5. Transportation suggestions

Format the response in a clear, easy-to-read manner with proper spacing and structure.`

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using GPT-4o-mini (previously known as nano)
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable travel expert who creates detailed, practical, and engaging travel itineraries. Your recommendations are specific, actionable, and consider local culture, budget, and traveler preferences.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate itinerary. Please try again later.' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const itinerary = data.choices[0]?.message?.content

    if (!itinerary) {
      return NextResponse.json(
        { error: 'No itinerary was generated. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ itinerary })
  } catch (error) {
    console.error('Error generating itinerary:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

