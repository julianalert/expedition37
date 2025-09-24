// Server-side Supabase client with secure credentials
import { createClient } from '@supabase/supabase-js'

// Get environment variables (allow fallback during build time)
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Server-side client with full permissions
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Type definitions for better security
export interface DatabaseError {
  message: string
  code?: string
}

export interface DatabaseResult<T> {
  data: T | null
  error: DatabaseError | null
}

// Secure query wrapper with error handling
export async function secureQuery<T>(
  queryFn: () => Promise<any>
): Promise<DatabaseResult<T>> {
  try {
    const { data, error } = await queryFn()
    
    if (error) {
      // Log error server-side but don't expose details to client
      console.error('Database error:', error)
      return {
        data: null,
        error: { message: 'Database operation failed' }
      }
    }
    
    return { data, error: null }
  } catch (err) {
    console.error('Database query error:', err)
    return {
      data: null,
      error: { message: 'Database connection failed' }
    }
  }
}
