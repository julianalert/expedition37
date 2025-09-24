// CSRF Protection utilities
import { NextRequest } from 'next/server'
import crypto from 'crypto'

// Generate a random CSRF token
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Verify CSRF token (async version)
export async function verifyCSRFToken(request: NextRequest, expectedToken: string): Promise<boolean> {
  let token = request.headers.get('x-csrf-token')
  
  if (!token) {
    try {
      const formData = await request.formData()
      token = formData.get('csrf_token')?.toString() || null
    } catch {
      return false
    }
  }
  
  if (!token || typeof token !== 'string') {
    return false
  }
  
  try {
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(token, 'hex'),
      Buffer.from(expectedToken, 'hex')
    )
  } catch {
    return false
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  // Remove potential XSS patterns
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .substring(0, 1000) // Limit length
}

// Rate limiting helper
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 5, 
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)
  
  if (!entry || now > entry.resetTime) {
    // First request or window expired
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }
  
  if (entry.count >= maxRequests) {
    return false // Rate limit exceeded
  }
  
  // Increment counter
  entry.count++
  rateLimitStore.set(identifier, entry)
  return true
}
