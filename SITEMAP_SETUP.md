# Dynamic Sitemap Setup Guide

This guide explains how to set up and maintain the dynamic sitemap for your Detour travel website.

## Overview

The sitemap is automatically generated from your Supabase database content and includes:
- Static pages (home, auth pages)
- All country pages and their sub-pages
- All city pages and their sub-pages  
- Blog posts
- Proper SEO priorities and update frequencies

## Files Created

### Core Files
- `app/sitemap.xml/route.ts` - Main sitemap endpoint
- `app/robots.txt/route.ts` - Robots.txt with sitemap reference
- `lib/sitemapGenerator.ts` - Reusable sitemap generation logic

### Configuration
- `next.config.js` - Updated with sitemap optimizations

## Environment Variables

Add these to your production environment:

```env
# Required: Your production site URL
NEXT_PUBLIC_SITE_URL=https://www.trydetour.com

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How It Works

### Automatic Updates
The sitemap automatically updates when:
1. You deploy to production (static generation at build time)
2. Users visit `/sitemap.xml` (cached for 1 hour)
3. The cache expires and the sitemap regenerates

### URL Structure
The sitemap includes these URL patterns:
- `https://www.trydetour.com/` (homepage)
- `https://www.trydetour.com/signin` (auth pages)
- `https://www.trydetour.com/posts/{id}` (blog posts)
- `https://www.trydetour.com/{country-slug}` (country pages)
- `https://www.trydetour.com/{country-slug}/best-places-to-visit`
- `https://www.trydetour.com/{country-slug}/best-time-to-visit`
- `https://www.trydetour.com/{country-slug}/good-deals`
- `https://www.trydetour.com/{country-slug}/{city-slug}`
- `https://www.trydetour.com/{country-slug}/{city-slug}/best-time-to-visit`
- `https://www.trydetour.com/{country-slug}/{city-slug}/good-deals`
- `https://www.trydetour.com/{country-slug}/{city-slug}/where-to-go`

### SEO Optimization
- **Priority**: Homepage (1.0), Countries (0.8), Country sub-pages (0.7), Cities (0.6), Posts (0.6), City sub-pages (0.5)
- **Update Frequency**: Homepage (daily), Countries/Cities (weekly), Auth pages (monthly)
- **Last Modified**: Uses database timestamps when available

## Deployment Steps

### 1. Environment Variables
Set `NEXT_PUBLIC_SITE_URL` in your production environment:

**Vercel:**
```bash
vercel env add NEXT_PUBLIC_SITE_URL
# Enter: https://www.trydetour.com
```

**Netlify:**
Go to Site Settings → Environment Variables → Add:
- Key: `NEXT_PUBLIC_SITE_URL`
- Value: `https://www.trydetour.com`

**Other platforms:**
Add the environment variable through your hosting platform's dashboard.

### 2. Submit to Search Engines

**Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add your property if not already added
3. Go to Sitemaps
4. Submit: `https://www.trydetour.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Add your site if not already added
3. Go to Sitemaps
4. Submit: `https://www.trydetour.com/sitemap.xml`

### 3. Verify Setup

Test your sitemap:
```bash
curl https://www.trydetour.com/sitemap.xml
curl https://www.trydetour.com/robots.txt
```

## Performance Considerations

### Caching
- Sitemap is cached for 1 hour in browsers and CDNs
- Regenerates automatically when cache expires
- Uses database timestamps for accurate last-modified dates

### Large Datasets
If you have many countries/cities (1000+), consider:
1. Creating sitemap index files
2. Splitting into multiple sitemaps by continent
3. Implementing incremental static regeneration (ISR)

### Monitoring
Monitor sitemap performance:
1. Check Google Search Console for indexing status
2. Monitor server logs for sitemap requests
3. Watch for any generation errors in your application logs

## Troubleshooting

### Common Issues

**Sitemap returns 500 error:**
- Check Supabase connection
- Verify environment variables
- Check application logs for database errors

**URLs not being indexed:**
- Verify sitemap is accessible at `/sitemap.xml`
- Check robots.txt includes sitemap reference
- Ensure URLs are valid and return 200 status codes

**Outdated lastmod dates:**
- Ensure your database has `updated_at` fields
- Check timezone handling in your database

### Testing Locally
```bash
npm run dev
# Visit http://localhost:3000/sitemap.xml
# Visit http://localhost:3000/robots.txt
```

## Maintenance

### Regular Tasks
1. **Monthly**: Check Google Search Console for indexing issues
2. **After major content updates**: Manually ping search engines
3. **After database schema changes**: Update sitemap generator if needed

### Manual Sitemap Ping
You can manually notify search engines of updates:
```bash
# Google
curl "https://www.google.com/ping?sitemap=https://www.trydetour.com/sitemap.xml"

# Bing
curl "https://www.bing.com/ping?sitemap=https://www.trydetour.com/sitemap.xml"
```

## Advanced Features

### Adding New Page Types
To add new page types to the sitemap, edit `lib/sitemapGenerator.ts`:

```typescript
// Add new static pages
const staticPages = [
  // ... existing pages
  { url: '/new-page', priority: 0.5, changeFreq: 'monthly' as const },
]

// Or add new dynamic routes
// Add logic to fetch and generate URLs for new content types
```

### Custom Priorities
Adjust SEO priorities based on your content strategy:
- High-traffic pages: 0.8-1.0
- Important content: 0.6-0.8  
- Supporting pages: 0.3-0.6
- Utility pages: 0.1-0.3

## Support

If you encounter issues:
1. Check the application logs
2. Verify all environment variables are set
3. Test database connectivity
4. Ensure your hosting platform supports dynamic routes

The sitemap will automatically update every time you deploy, ensuring search engines always have the latest information about your travel destinations!

## Quick Setup Checklist

✅ **Set your environment variable:**
```bash
NEXT_PUBLIC_SITE_URL=https://www.trydetour.com
```

✅ **Deploy and test:**
- Deploy your changes
- Visit `https://www.trydetour.com/sitemap.xml`
- Visit `https://www.trydetour.com/robots.txt`

✅ **Submit to search engines:**
- Submit `https://www.trydetour.com/sitemap.xml` to Google Search Console
- Submit `https://www.trydetour.com/sitemap.xml` to Bing Webmaster Tools
