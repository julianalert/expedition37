# Metadata Implementation Guide

This document explains the comprehensive SEO, OpenGraph, and Twitter metadata implementation for Detour.

## Overview

The metadata system provides:
- **SEO optimization** for search engines
- **Open Graph** tags for Facebook, LinkedIn, and other social platforms  
- **Twitter Card** optimization for Twitter sharing
- **Structured metadata** for better search engine understanding

## Files Created/Modified

### 1. `/lib/metadata.ts`
Central metadata utility with:
- TypeScript interfaces for type safety
- `generateMetadata()` function for consistent metadata generation
- Site-wide configuration constants
- Reusable metadata patterns

### 2. `/app/(default)/page.tsx` 
Homepage metadata implementation:
- Comprehensive SEO keywords for travel/destination search
- Open Graph configuration for social sharing
- Twitter Card setup with large image
- Personalized descriptions matching the hero content

### 3. `/app/layout.tsx`
Root layout metadata:
- Template-based title system (`%s | Detour`)
- Default fallback metadata
- Base URL configuration for absolute URLs

## Metadata Features

### SEO Optimization
```typescript
seo: {
  title: 'Detour - Discover Your Perfect Travel Destination',
  description: 'Find your ideal travel destination with personalized recommendations...',
  keywords: [
    'travel destinations', 'travel recommendations', 'holiday planning',
    'vacation destinations', 'travel guide', 'best places to visit',
    // ... 15 targeted keywords
  ],
  canonical: 'https://trydetour.com',
  robots: 'index, follow',
  author: 'Detour Team',
}
```

### Open Graph Configuration
```typescript
openGraph: {
  title: 'Detour - Your Next Holiday Starts Here',
  description: 'Explore the world with a tool that recommends the perfect destination...',
  url: 'https://trydetour.com',
  siteName: 'Detour',
  images: [{
    url: 'https://trydetour.com/images/Detour-og-image.png',
    width: 1200,
    height: 630,
    alt: 'Detour - Discover Your Perfect Travel Destination',
    type: 'image/png',
  }],
  type: 'website',
  locale: 'en_US',
}
```

### Twitter Cards
```typescript
twitter: {
  card: 'summary_large_image',
  site: '@Detour',
  creator: '@Detour',
  title: 'Detour - Discover Your Perfect Travel Destination',
  description: 'Find your ideal travel destination with personalized recommendations...',
  images: ['https://trydetour.com/images/Detour-og-image.png'],
}
```

## Configuration

### Update Site Details
In `/lib/metadata.ts`, update the `SITE_CONFIG` object:

```typescript
export const SITE_CONFIG = {
  name: 'Detour',
  url: 'https://your-actual-domain.com', // ← Update this
  description: 'Discover your perfect travel destination...',
  author: 'Detour Team',
  twitter: '@your-twitter-handle', // ← Update this
  image: '/images/Detour-og-image.png',
}
```

### Required Assets

#### Open Graph Image
Create a **1200x630px PNG image** at `/public/images/Detour-og-image.png`:
- Include Detour branding
- Travel-themed visuals (maps, destinations, travel icons)
- The tagline "Your Next Holiday Starts Here"
- Clean, professional design
- Readable text (will be scaled down on social platforms)

## Testing Metadata

### 1. Local Testing
```bash
npm run dev
```
View page source to verify meta tags are rendered correctly.

### 2. Social Media Testing Tools

**Facebook Debugger:**
- URL: https://developers.facebook.com/tools/debug/
- Enter your homepage URL
- Check Open Graph tags display correctly

**Twitter Card Validator:**
- URL: https://cards-dev.twitter.com/validator
- Enter your homepage URL  
- Verify Twitter Card preview

**LinkedIn Post Inspector:**
- URL: https://www.linkedin.com/post-inspector/
- Test how links appear when shared on LinkedIn

### 3. SEO Testing Tools

**Google Rich Results Test:**
- URL: https://search.google.com/test/rich-results
- Verify structured data parsing

**SEO Meta Tags Checker:**
- Multiple online tools available
- Verify all meta tags are present and properly formatted

## Future Enhancements

### Additional Verification Tags
Add to `generateMetadata()` function:
```typescript
verification: {
  google: 'your-google-site-verification',
  yandex: 'your-yandex-verification', 
  yahoo: 'your-yahoo-verification',
  bing: 'your-bing-verification',
},
```

### JSON-LD Structured Data
Consider adding structured data for:
- Organization markup
- Website markup  
- BreadcrumbList for navigation
- Review/Rating markup for destinations

### Additional Social Platforms
- Pinterest Rich Pins
- WhatsApp preview optimization
- Telegram link previews

## Page-Specific Metadata

This implementation can be extended to other pages:

```typescript
// For destination pages
const destinationMetadata: MetadataConfig = {
  seo: {
    title: `${destination.name}, ${destination.country} - Travel Guide | Detour`,
    description: `Discover ${destination.name} with our comprehensive travel guide...`,
    // ... destination-specific configuration
  },
  // ... OpenGraph and Twitter configs
}
```

## Best Practices

1. **Keep titles under 60 characters** for full display in search results
2. **Keep descriptions between 150-160 characters** for optimal SERP display
3. **Use high-quality images** (1200x630px minimum for social sharing)
4. **Include relevant keywords** but avoid keyword stuffing
5. **Test on multiple platforms** before deployment
6. **Update metadata** when content changes significantly

## Monitoring

Track metadata performance through:
- Google Search Console
- Social media analytics
- Click-through rates from search results
- Social sharing engagement metrics
