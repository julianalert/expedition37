import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, secureQuery } from '@/lib/supabase-server'
import { z } from 'zod'

// Input validation schema
const querySchema = z.object({
  countryId: z.string().regex(/^\d+$/).optional().transform(Number),
  limit: z.string().regex(/^\d+$/).optional().transform(Number),
  offset: z.string().regex(/^\d+$/).optional().transform(Number),
})

// Rate limiting (reuse from countries route)
const rateLimitMap = new Map()
const RATE_LIMIT = 100
const RATE_LIMIT_WINDOW = 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userRequests = rateLimitMap.get(ip) || []
  const recentRequests = userRequests.filter((time: number) => now - time < RATE_LIMIT_WINDOW)
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false
  }
  
  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return true
}

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
      countryId: searchParams.get('countryId'),
      limit: searchParams.get('limit'),
      offset: searchParams.get('offset'),
    })

    if (!queryResult.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: queryResult.error.issues },
        { status: 400 }
      )
    }

    const { countryId, limit = 50, offset = 0 } = queryResult.data

    // Build secure query
    let query = supabaseServer
      .from('city')
      .select('*')
      .order('overallRating', { ascending: false, nullsFirst: false })
      .order('name', { ascending: true })
      .range(offset, offset + limit - 1)

    // Apply country filter if provided
    if (countryId) {
      query = query.eq('country', countryId)
    }

    // Execute secure query
    const result = await secureQuery(async () => await query)

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        cities: result.data,
        pagination: {
          limit,
          offset,
          total: Array.isArray(result.data) ? result.data.length : 0
        }
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=1800, s-maxage=1800', // 30 min cache
        },
      }
    )
  } catch (error) {
    console.error('Cities API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
