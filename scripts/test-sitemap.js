#!/usr/bin/env node

/**
 * Sitemap Test Script
 * 
 * This script tests the sitemap generation locally to ensure it works correctly
 * before deployment.
 * 
 * Usage: node scripts/test-sitemap.js
 */

const { generateSitemapUrls, generateSitemapXml, validateSitemapUrls } = require('../lib/sitemapGenerator.ts')

async function testSitemap() {
  console.log('🚀 Testing sitemap generation...\n')
  
  try {
    // Test URL generation
    console.log('1. Generating sitemap URLs...')
    const urls = await generateSitemapUrls()
    console.log(`   ✅ Generated ${urls.length} URLs`)
    
    // Show sample URLs
    console.log('\n2. Sample URLs:')
    urls.slice(0, 10).forEach((url, index) => {
      console.log(`   ${index + 1}. ${url.url} (priority: ${url.priority})`)
    })
    
    if (urls.length > 10) {
      console.log(`   ... and ${urls.length - 10} more URLs`)
    }
    
    // Test validation
    console.log('\n3. Validating URLs...')
    const validUrls = validateSitemapUrls(urls)
    console.log(`   ✅ ${validUrls.length}/${urls.length} URLs are valid`)
    
    if (validUrls.length !== urls.length) {
      console.log(`   ⚠️  ${urls.length - validUrls.length} invalid URLs found`)
    }
    
    // Test XML generation
    console.log('\n4. Generating XML...')
    const xml = generateSitemapXml(validUrls.slice(0, 5)) // Test with first 5 URLs
    console.log('   ✅ XML generated successfully')
    console.log('\n   Sample XML output:')
    console.log('   ' + xml.split('\n').slice(0, 15).join('\n   '))
    console.log('   ...')
    
    // Summary
    console.log('\n📊 Summary:')
    console.log(`   • Total URLs: ${urls.length}`)
    console.log(`   • Valid URLs: ${validUrls.length}`)
    console.log(`   • Static pages: ${validUrls.filter(u => u.priority >= 0.8).length}`)
    console.log(`   • Country pages: ${validUrls.filter(u => u.url.includes('/') && u.priority === 0.8).length}`)
    console.log(`   • City pages: ${validUrls.filter(u => u.priority === 0.6).length}`)
    
    console.log('\n✅ Sitemap test completed successfully!')
   console.log('\n🔗 To test in browser:')
   console.log('   1. Run: npm run dev')
   console.log('   2. Visit: http://localhost:3000/sitemap.xml')
   console.log('   3. Visit: http://localhost:3000/robots.txt')
   console.log('\n🌐 Production URLs:')
   console.log('   • https://www.trydetour.com/sitemap.xml')
   console.log('   • https://www.trydetour.com/robots.txt')
    
  } catch (error) {
    console.error('\n❌ Sitemap test failed:')
    console.error(error.message)
    
    if (error.message.includes('Supabase')) {
      console.log('\n💡 Tip: Make sure your Supabase environment variables are configured:')
      console.log('   NEXT_PUBLIC_SUPABASE_URL')
      console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
    
    process.exit(1)
  }
}

// Run the test
testSitemap()
