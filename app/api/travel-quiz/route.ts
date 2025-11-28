import { NextRequest, NextResponse } from 'next/server'

interface QuizAnswer {
  questionId: string
  answer: string
  label: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers }: { answers: QuizAnswer[] } = body

    // Validate input
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { error: 'Missing required field: answers array is required' },
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

    // Format answers for the prompt
    const formattedAnswers = answers.map(answer => {
      const questionMap: { [key: string]: string } = {
        'country': 'Country',
        'goal': 'Main vacation goal',
        'companions': 'Travel companions',
        'scenery': 'Preferred scenery',
        'evenings': 'Evening preferences',
        'pace': 'Travel pace',
        'weather': 'Ideal weather',
        'accommodation': 'Accommodation style',
        'food': 'Food preferences',
        'duration': 'Trip duration',
        'takeaway': 'What to bring home'
      }
      
      return `${questionMap[answer.questionId] || answer.questionId}: ${answer.label}`
    }).join('\n')

    // Create prompt for OpenAI
    const prompt = `Based on the following travel quiz answers, recommend exactly 5 travel destinations that would be perfect for this traveler:

${formattedAnswers}

Please provide recommendations in the following format:

# Your Perfect Travel Destinations

Based on your answers, here are 5 destinations that match your travel style and preferences:

## 1. [Destination Name, Country]
**Why it's perfect for you:** [2-3 sentences explaining why this destination matches their answers]
**Best time to visit:** [Season/months]
**Perfect for:** [Key activities/experiences that match their preferences]

## 2. [Destination Name, Country]
**Why it's perfect for you:** [2-3 sentences explaining why this destination matches their answers]
**Best time to visit:** [Season/months]
**Perfect for:** [Key activities/experiences that match their preferences]

[Continue for all 5 destinations]

## 🎯 Your Travel Personality
Based on your answers, you're a [travel personality type] who values [key values from their answers]. These destinations offer the perfect mix of [what they're looking for].

## 💡 Planning Tips
- Consider using our Budget Calculator to estimate costs for these destinations
- Check out our Itinerary Generator for detailed day-by-day plans
- Use the "Near Me" tool when you arrive to discover local gems

Make sure each destination is:
1. Genuinely different from the others (different continents/regions when possible)
2. Specifically matched to their quiz answers
3. Realistic and accessible for travelers
4. Well-known enough to have good travel infrastructure

Format the response in clean markdown with proper headings and structure.`

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
            content: 'You are an expert travel advisor who provides personalized destination recommendations based on traveler preferences. Your recommendations are well-researched, diverse, and perfectly matched to the traveler\'s personality and goals. You always provide exactly 5 destinations that are genuinely different from each other and explain clearly why each destination fits their specific answers.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2500,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate travel recommendations. Please try again later.' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const recommendations = data.choices[0]?.message?.content

    if (!recommendations) {
      return NextResponse.json(
        { error: 'No travel recommendations were generated. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Error generating travel recommendations:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
