import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { destination, travelerType, duration, specificities } = await request.json()

    if (!destination || !travelerType || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields: destination, travelerType, and duration are required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      )
    }

    // Map traveler types to readable format
    const travelerTypeMap: { [key: string]: string } = {
      'solo-male': 'solo male traveler',
      'solo-female': 'solo female traveler',
      'couple': 'couple',
      'family': 'family with kids',
      'friends': 'group of friends'
    }

    // Map duration to readable format
    const durationMap: { [key: string]: string } = {
      'weekend': 'weekend trip (2-3 days)',
      'short': 'short trip (4-7 days)',
      'medium': 'medium trip (1-2 weeks)',
      'long': 'long trip (3-4 weeks)',
      'extended': 'extended trip (1+ months)'
    }

    const travelerDescription = travelerTypeMap[travelerType] || travelerType
    const durationDescription = durationMap[duration] || duration

    const prompt = `Create a comprehensive and personalized travel packing checklist for the following trip:

**Trip Details:**
- Destination: ${destination}
- Traveler(s): ${travelerDescription}
- Duration: ${durationDescription}
${specificities ? `- Special activities/needs: ${specificities}` : ''}

Please provide a detailed packing checklist that includes:

1. **Essential Documents & Money**
2. **Clothing & Accessories** (considering destination climate and activities)
3. **Electronics & Gadgets**
4. **Health & Personal Care**
5. **Travel Comfort & Entertainment**
6. **Destination-Specific Items**
${specificities ? '7. **Activity-Specific Items** (based on mentioned activities)' : ''}

For each category, provide specific items with brief explanations when helpful. Consider:
- The destination's climate, culture, and typical activities
- The traveler type and their likely needs
- The trip duration and appropriate quantities
- Any specific activities or needs mentioned

Format the response in clear markdown with:
- Category headers (##)
- Bullet points for items
- Brief explanations in parentheses when helpful
- Practical tips where relevant

Make it comprehensive but practical, focusing on items that are truly useful for this specific trip.`

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
            content: 'You are a travel expert who creates personalized packing checklists. Provide comprehensive, practical, and destination-specific packing advice that considers the traveler type, trip duration, and planned activities. Be thorough but focus on truly useful items.'
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
      const errorData = await response.json()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const checklist = data.choices[0]?.message?.content

    if (!checklist) {
      throw new Error('No checklist generated')
    }

    return NextResponse.json({ checklist })

  } catch (error) {
    console.error('Error generating packing checklist:', error)
    return NextResponse.json(
      { error: 'Failed to generate packing checklist' },
      { status: 500 }
    )
  }
}
