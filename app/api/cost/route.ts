import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { destination, days, people, adults, children, budget } = body

    // Validate input
    if (!destination || !days || !people || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields: destination, days, people, and budget are required' },
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
    const peopleDescription = adults && children 
      ? `${adults} adult${adults > 1 ? 's' : ''} and ${children} child${children > 1 ? 'ren' : ''}`
      : `${people} people`

    const prompt = `Create a detailed travel cost breakdown for ${destination} for ${peopleDescription} for ${days} days with a ${budget} budget.

Please provide:
1. **Daily Budget Overview** - Total estimated cost per day and per person
2. **Accommodation** - Cost range and recommendations for ${budget} budget
3. **Food & Dining** - Daily food costs including breakfast, lunch, dinner, and snacks
4. **Transportation** - Local transport costs, airport transfers, and getting around
5. **Activities & Attractions** - Entry fees, tours, and entertainment costs
6. **Shopping & Miscellaneous** - Souvenirs, tips, and unexpected expenses
7. **Total Estimated Cost** - Complete breakdown with minimum and maximum ranges
8. **Money-Saving Tips** - Specific advice for ${destination} to reduce costs
9. **Currency & Payment** - Local currency info and payment methods

Consider local prices, seasonal variations, and provide realistic estimates. Include both budget-conscious and slightly higher options within the ${budget} range.

Format the response in a clear, easy-to-read manner with proper spacing and structure using markdown formatting.`

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using GPT-4o-mini (nano 5)
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable travel cost expert who provides detailed, accurate, and practical travel budget breakdowns. Your estimates are realistic, consider local pricing, and include helpful money-saving tips. Always provide cost ranges and be specific about what is included in each category.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate travel cost breakdown. Please try again later.' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const costBreakdown = data.choices[0]?.message?.content

    if (!costBreakdown) {
      return NextResponse.json(
        { error: 'No cost breakdown was generated. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ costBreakdown })
  } catch (error) {
    console.error('Error generating cost breakdown:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
