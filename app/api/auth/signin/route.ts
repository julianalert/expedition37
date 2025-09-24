import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isValidEmail, sanitizeInput, checkRateLimit } from '@/lib/csrf'

// Input validation schema
const signInSchema = z.object({
  email: z.string().email().max(254),
  csrf_token: z.string().min(32).max(128),
})

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    request.headers.get('cf-connecting-ip') || 
                    'unknown'

    // Rate limiting - 5 attempts per 15 minutes per IP
    if (!checkRateLimit(`signin:${clientIP}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many sign-in attempts. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Parse and validate form data
    const formData = await request.formData()
    const email = formData.get('email')?.toString()
    const csrfToken = formData.get('csrf_token')?.toString()

    // Validate input
    const validationResult = signInSchema.safeParse({
      email,
      csrf_token: csrfToken,
    })

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid input data',
          details: validationResult.error.issues
        },
        { status: 400 }
      )
    }

    const { email: validatedEmail } = validationResult.data

    // Additional email validation
    if (!isValidEmail(validatedEmail)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please enter a valid email address' 
        },
        { status: 400 }
      )
    }

    // Sanitize email (though Zod validation should handle most issues)
    const cleanEmail = sanitizeInput(validatedEmail)

    // TODO: Implement actual magic link sending logic here
    // For now, we'll just log and return success
    console.log(`Magic link request for email: ${cleanEmail}`)
    
    // In a real implementation, you would:
    // 1. Generate a secure token
    // 2. Store it in database with expiration
    // 3. Send email with magic link
    // 4. Handle the token verification in another endpoint

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json(
      { 
        success: true, 
        message: 'Magic link sent to your email address' 
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )

  } catch (error) {
    console.error('Sign-in API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    )
  }
}

// CSRF token generation endpoint
export async function GET(request: NextRequest) {
  try {
    // Generate CSRF token (in real app, store this in session/database)
    const csrfToken = require('crypto').randomBytes(32).toString('hex')
    
    return NextResponse.json(
      { csrf_token: csrfToken },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { error: 'Unable to generate security token' },
      { status: 500 }
    )
  }
}
