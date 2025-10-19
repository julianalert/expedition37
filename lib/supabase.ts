import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Add validation for environment variables
if (!supabaseUrl || supabaseUrl === 'undefined') {
  console.warn('NEXT_PUBLIC_SUPABASE_URL is not properly configured')
}

if (!supabaseAnonKey || supabaseAnonKey === 'undefined') {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is not properly configured')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  },
  global: {
    headers: {
      'X-Client-Info': 'expedition37-web'
    }
  }
})
