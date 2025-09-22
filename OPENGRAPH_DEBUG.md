# OpenGraph Image Debugging Guide

## Issues Fixed

✅ **Site URL Typo**: Fixed `https://www.trytrydetour.com` → `https://www.trydetour.com`
✅ **Image Case Mismatch**: Fixed `Detour-og-image.png` → `detour-og-image.png`
✅ **Image Dimensions**: Updated to match actual file (2000x1085)

## Current OpenGraph Configuration

### Homepage (`app/(default)/page.tsx`)
```javascript
openGraph: {
  title: "Detour - Your Next Holiday Starts Here",
  description: "Explore the world with a tool that recommends the perfect destination for you...",
  url: "https://www.trydetour.com",
  siteName: "Detour",
  images: [
    {
      url: "https://www.trydetour.com/images/detour-og-image.png",
      width: 2000,
      height: 1085,
      alt: "Detour - Discover Your Perfect Travel Destination",
      type: "image/png",
    },
  ],
  type: "website",
  locale: "en_US",
}
```

## Testing Your OpenGraph Image

### 1. Direct Image Access
Test if your image is accessible:
```bash
curl -I https://www.trydetour.com/images/detour-og-image.png
```

### 2. OpenGraph Testing Tools

**Facebook Sharing Debugger:**
- Visit: https://developers.facebook.com/tools/debug/
- Enter: `https://www.trydetour.com`
- Click "Debug" to see how Facebook reads your OpenGraph tags

**Twitter Card Validator:**
- Visit: https://cards-dev.twitter.com/validator
- Enter: `https://www.trydetour.com`

**LinkedIn Post Inspector:**
- Visit: https://www.linkedin.com/post-inspector/
- Enter: `https://www.trydetour.com`

**Generic OpenGraph Tester:**
- Visit: https://www.opengraph.xyz/
- Enter: `https://www.trydetour.com`

### 3. Manual HTML Check
View your page source and look for these meta tags:
```html
<meta property="og:title" content="Detour - Your Next Holiday Starts Here">
<meta property="og:description" content="Explore the world with a tool...">
<meta property="og:image" content="https://www.trydetour.com/images/detour-og-image.png">
<meta property="og:image:width" content="2000">
<meta property="og:image:height" content="1085">
<meta property="og:url" content="https://www.trydetour.com">
<meta property="og:type" content="website">
```

## Common Issues & Solutions

### Issue 1: Image Not Loading
**Symptoms:** Broken image in social media previews
**Solutions:**
- Ensure image is accessible at the URL
- Check file permissions
- Verify HTTPS is working
- Test direct image URL in browser

### Issue 2: Old Image Cached
**Symptoms:** Old image shows despite updates
**Solutions:**
- Clear social media cache using their debug tools
- Wait 24-48 hours for cache to expire naturally
- Add a query parameter to force refresh: `?v=2`

### Issue 3: Wrong Image Dimensions
**Symptoms:** Image appears cropped or distorted
**Solutions:**
- Use recommended dimensions: 1200x630 for optimal compatibility
- Current image (2000x1085) should work but may be cropped by some platforms

### Issue 4: Missing Meta Tags
**Symptoms:** No preview shows at all
**Solutions:**
- Check if Next.js is generating the meta tags correctly
- Verify metadata is exported properly from page components

## Optimal Image Specifications

**Recommended OpenGraph Image Specs:**
- **Size**: 1200x630 pixels (1.91:1 aspect ratio)
- **Format**: PNG or JPG
- **File Size**: Under 8MB (ideally under 1MB)
- **Content**: High contrast, readable text, brand elements

**Your Current Image:**
- Size: 2000x1085 pixels (1.84:1 aspect ratio)
- Format: PNG ✅
- File Size: ~1.7MB ✅

## Testing Checklist

After making changes:

1. ✅ Deploy your changes to production
2. ⏳ Test direct image URL: `https://www.trydetour.com/images/detour-og-image.png`
3. ⏳ Test with Facebook Debugger
4. ⏳ Test with Twitter Card Validator
5. ⏳ Test with LinkedIn Post Inspector
6. ⏳ Share on actual social media platforms

## Environment Variables

Make sure this is set in production:
```bash
NEXT_PUBLIC_SITE_URL=https://www.trydetour.com
```

## Troubleshooting Commands

```bash
# Test if your site is accessible
curl -I https://www.trydetour.com

# Test if your image is accessible
curl -I https://www.trydetour.com/images/detour-og-image.png

# Check your page's HTML for OpenGraph tags
curl -s https://www.trydetour.com | grep -i "og:"
```

## Next Steps

1. Deploy these fixes to production
2. Test the image URL directly in your browser
3. Use the Facebook Sharing Debugger to verify OpenGraph tags
4. Clear any cached previews on social platforms
5. Test sharing your URL on social media

Your OpenGraph setup should now work correctly! 🎯
