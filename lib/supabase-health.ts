import { supabase } from './supabase'

export interface SupabaseHealthCheck {
  isHealthy: boolean
  connectionTest: boolean
  tableExists: boolean
  canQuery: boolean
  error?: string
  details?: any
}

export async function checkSupabaseHealth(): Promise<SupabaseHealthCheck> {
  const result: SupabaseHealthCheck = {
    isHealthy: false,
    connectionTest: false,
    tableExists: false,
    canQuery: false
  }

  try {
    // Test 1: Basic connection
    console.log('Testing Supabase connection...')
    const { data: connectionData, error: connectionError } = await supabase
      .from('city')
      .select('count')
      .limit(0)
      .single()

    if (connectionError) {
      result.error = `Connection failed: ${connectionError.message}`
      result.details = connectionError
      return result
    }

    result.connectionTest = true

    // Test 2: Table existence
    console.log('Testing table existence...')
    const { data: tableData, error: tableError } = await supabase
      .from('city')
      .select('id')
      .limit(1)

    if (tableError) {
      result.error = `Table access failed: ${tableError.message}`
      result.details = tableError
      return result
    }

    result.tableExists = true

    // Test 3: Can query data
    console.log('Testing data query...')
    const { data: queryData, error: queryError } = await supabase
      .from('city')
      .select('id, name')
      .limit(5)

    if (queryError) {
      result.error = `Query failed: ${queryError.message}`
      result.details = queryError
      return result
    }

    result.canQuery = true
    result.isHealthy = true

    console.log('Supabase health check passed ✅')
    return result

  } catch (error) {
    result.error = `Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    result.details = error
    console.error('Supabase health check failed:', error)
    return result
  }
}

export async function logSupabaseStatus() {
  const health = await checkSupabaseHealth()
  
  console.log('=== Supabase Health Status ===')
  console.log('Environment Variables:')
  console.log('- NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing')
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing')
  
  console.log('\nHealth Check Results:')
  console.log('- Connection Test:', health.connectionTest ? '✅' : '❌')
  console.log('- Table Exists:', health.tableExists ? '✅' : '❌')
  console.log('- Can Query:', health.canQuery ? '✅' : '❌')
  console.log('- Overall Health:', health.isHealthy ? '✅ Healthy' : '❌ Unhealthy')
  
  if (health.error) {
    console.log('- Error:', health.error)
  }
  
  console.log('===============================')
  
  return health
}
