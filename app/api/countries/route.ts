import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, secureQuery } from '@/lib/supabase-server'
import { z } from 'zod'

// Rate limiting helper (basic implementation)
const rateLimitMap = new Map()
const RATE_LIMIT = 100 // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userRequests = rateLimitMap.get(ip) || []
  
  // Clean old requests
  const recentRequests = userRequests.filter((time: number) => now - time < RATE_LIMIT_WINDOW)
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false
  }
  
  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return true
}

// Input validation schema
const querySchema = z.object({
  limit: z.string().regex(/^\d+$/).optional().transform(Number),
  offset: z.string().regex(/^\d+$/).optional().transform(Number),
})

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Validate query parameters
    const { searchParams } = new URL(request.url)
    const queryResult = querySchema.safeParse({
      limit: searchParams.get('limit'),
      offset: searchParams.get('offset'),
    })

    if (!queryResult.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters' },
        { status: 400 }
      )
    }

    const { limit = 50, offset = 0 } = queryResult.data

    // Secure database query
    const result = await secureQuery(async () =>
      await supabaseServer
        .from('country')
        .select('*')
        .order('rank', { ascending: true })
        .range(offset, offset + limit - 1)
    )

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { countries: result.data },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      }
    )
  } catch (error) {
    console.error('Countries API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // This would handle creating new countries (admin only)
  return NextResponse.json(
    { error: 'Method not implemented' },
    { status: 501 }
  )
}
