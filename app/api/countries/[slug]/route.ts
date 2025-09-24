import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer, secureQuery } from '@/lib/supabase-server'
import { z } from 'zod'
import { sanitizeInput } from '@/lib/csrf'

// Input validation schema for country slug
const slugSchema = z.object({
  slug: z.string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
})

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params
    
    // Validate and sanitize the slug parameter
    const validationResult = slugSchema.safeParse({ slug })
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid country identifier',
          details: validationResult.error.issues
        },
        { status: 400 }
      )
    }

    const { slug: validatedSlug } = validationResult.data
    const sanitizedSlug = sanitizeInput(validatedSlug)

    // Convert slug to potential country name
    const potentialName = sanitizedSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Secure database query with exact match
    const result = await secureQuery(async () =>
      await supabaseServer
        .from('country')
        .select('*')
        .eq('name', potentialName) // Exact match, no injection risk
        .single()
    )

    if (result.error) {
      return NextResponse.json(
        { error: 'Country not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { country: result.data },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=7200, s-maxage=7200', // 2 hour cache
        },
      }
    )

  } catch (error) {
    console.error('Country lookup API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
