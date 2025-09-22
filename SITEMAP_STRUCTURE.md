# Hierarchical Sitemap Structure

Your sitemap is now organized as a tree structure with a main index pointing to specialized sub-sitemaps.

## Structure Overview

```
sitemap.xml (Main Index)
├── sitemap-static.xml     (Homepage, Auth pages)
├── sitemap-countries.xml  (All country pages + sub-pages)
├── sitemap-cities.xml     (All city pages + sub-pages)
└── sitemap-posts.xml      (Blog posts)
```

## URLs Created

### Main Sitemap Index (`/sitemap.xml`)
Points to all sub-sitemaps:
- `https://www.trydetour.com/sitemap-static.xml`
- `https://www.trydetour.com/sitemap-countries.xml`
- `https://www.trydetour.com/sitemap-cities.xml`
- `https://www.trydetour.com/sitemap-posts.xml`

### Static Pages Sitemap (`/sitemap-static.xml`)
- `https://www.trydetour.com/` (Priority: 1.0)
- `https://www.trydetour.com/signin` (Priority: 0.3)
- `https://www.trydetour.com/post-a-job` (Priority: 0.5)

### Countries Sitemap (`/sitemap-countries.xml`)
For each country:
- `https://www.trydetour.com/{country-slug}` (Priority: 0.8)
- `https://www.trydetour.com/{country-slug}/best-places-to-visit` (Priority: 0.7)
- `https://www.trydetour.com/{country-slug}/best-time-to-visit` (Priority: 0.7)
- `https://www.trydetour.com/{country-slug}/good-deals` (Priority: 0.7)

### Cities Sitemap (`/sitemap-cities.xml`)
For each city:
- `https://www.trydetour.com/{country-slug}/{city-slug}` (Priority: 0.6)
- `https://www.trydetour.com/{country-slug}/{city-slug}/best-time-to-visit` (Priority: 0.5)
- `https://www.trydetour.com/{country-slug}/{city-slug}/good-deals` (Priority: 0.5)
- `https://www.trydetour.com/{country-slug}/{city-slug}/where-to-go` (Priority: 0.5)

### Posts Sitemap (`/sitemap-posts.xml`)
- `https://www.trydetour.com/posts/{post-id}` (Priority: 0.6)

## Benefits of This Structure

### ✅ **Better Organization**
- Each sitemap focuses on a specific content type
- Easier to debug and maintain
- Cleaner structure for search engines

### ✅ **Better Performance**
- Smaller individual files load faster
- Can cache different sitemaps for different durations
- Parallel processing by search engines

### ✅ **Better SEO**
- Search engines prefer organized sitemaps
- Can prioritize different content types
- Better indexing efficiency

### ✅ **Scalability**
- Easy to add new sitemap types
- Can handle thousands of URLs per sitemap
- No single file size limitations

## Testing Your New Structure

### 1. Test Each Sitemap Individually
```bash
curl https://www.trydetour.com/sitemap.xml
curl https://www.trydetour.com/sitemap-static.xml
curl https://www.trydetour.com/sitemap-countries.xml
curl https://www.trydetour.com/sitemap-cities.xml
curl https://www.trydetour.com/sitemap-posts.xml
```

### 2. Submit Main Index to Search Engines
- **Google Search Console**: Submit `https://www.trydetour.com/sitemap.xml`
- **Bing Webmaster Tools**: Submit `https://www.trydetour.com/sitemap.xml`

Search engines will automatically discover and crawl all sub-sitemaps!

## Cache Settings

All sitemaps are cached for 1 hour:
- Fast enough to stay current
- Reduces server load
- Good balance for SEO

## Future Enhancements

You can easily add more specialized sitemaps:
- `sitemap-continents.xml` - Continent-specific pages
- `sitemap-images.xml` - Image sitemaps
- `sitemap-videos.xml` - Video content
- `sitemap-news.xml` - Latest travel news

Your sitemap is now properly structured as a tree! 🌳
