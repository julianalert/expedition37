# Blog Template Guide

This guide explains how to use the new blog template system to create articles by simply filling in variables.

## Quick Start

### Method 1: Using the Script (Recommended)

1. **Create a simple blog post (text only):**
   ```bash
   node scripts/create-blog-post.js "your-article-slug" "Your Article Title"
   ```

2. **Create a blog post with image support:**
   ```bash
   node scripts/create-blog-post.js "your-article-slug" "Your Article Title" --with-images
   ```

   Examples:
   ```bash
   # Simple post (hero image only)
   node scripts/create-blog-post.js "best-budget-destinations-2024" "Best Budget Destinations for 2024"
   
   # Rich post (with content images)
   node scripts/create-blog-post.js "nomad-gear-guide" "Ultimate Nomad Gear Guide" --with-images
   ```

2. **Edit the generated file:**
   Open `app/blog/your-article-slug/page.tsx` and edit the `articleData` object.

3. **Preview your article:**
   Visit `http://localhost:3000/blog/your-article-slug` in your browser.

### Method 2: Manual Creation

1. **Create the directory:**
   ```bash
   mkdir app/blog/your-article-slug
   ```

2. **Copy a template:**
   Copy an existing blog post's `page.tsx` file as a starting point.

3. **Edit the variables:**
   Update all the variables in the `articleData` object.

## Article Data Structure

The `articleData` object contains all the information needed for your article:

```typescript
const articleData: SimpleBlogArticle = {
  // SEO and Basic Info
  title: "Your Article Title",
  description: "Meta description for search engines",
  keywords: ["keyword1", "keyword2", "keyword3"],
  slug: "your-article-slug",
  
  // Publication Info
  publishDate: "2024-03-22",  // YYYY-MM-DD format
  author: "Travel Team",
  readTime: "7 min read",
  category: "Travel Tips",
  
  // Hero Section
  heroImage: "/images/your-hero-image.jpg",
  heroImageAlt: "Description of your hero image",
  excerpt: "Compelling subtitle that appears below the title",
  
  // Article Content (see content structure below)
  content: [...],
  
  // Call to Action
  cta: {
    title: "Call to Action Title",
    description: "Description text for the CTA section",
    buttonText: "Button Text",
    buttonLink: "/"
  }
}
```

## Content Structure

The `content` array contains sections of your article. Each section can include:

- **Paragraphs**: Regular text content
- **Headings**: Section titles  
- **Lists**: Bullet points with optional heading

### Example Content Structure:

```typescript
content: [
  {
    // Introduction section (no heading)
    paragraphs: [
      "Your opening paragraph that hooks the reader.",
      "Second paragraph with more context."
    ]
  },
  {
    // Section with heading and content
    heading: "Main Section Title",
    paragraphs: [
      "Content for this section.",
      "More details about this topic."
    ],
    list: {
      heading: "Key Points",
      items: [
        "<strong>Point 1:</strong> First important point.",
        "<strong>Point 2:</strong> Second important point.",
        "<strong>Point 3:</strong> Third important point."
      ]
    }
  },
  {
    // Another section
    heading: "Second Main Section",
    paragraphs: [
      "Content for the second section.",
      "You can add as many sections as needed."
    ]
  }
]
```

## Customization Options

### Adding Images

**📖 For detailed image guidance, see `BLOG_IMAGES_GUIDE.md`**

#### Quick Image Overview:
- **Hero Image**: Every post has a main image (set in `heroImage`)
- **Content Images**: Add images within article content (requires `BlogArticleData` interface)
- **Image Location**: Store all images in `/public/images/` directory

#### Simple Posts vs Rich Posts:
- **Simple Posts** (`SimpleBlogArticle`): Hero image only
- **Rich Posts** (`BlogArticleData`): Hero image + content images + captions

#### Adding a Content Image:
```typescript
{
  type: 'image',
  content: '/images/your-image.jpg',
  imageAlt: 'Description for accessibility',
  imageCaption: 'Optional caption below image'
}
```

### Category Colors

You can specify category colors in the full `BlogArticleData` interface:
- `green` - Green badge
- `blue` - Blue badge
- `purple` - Purple badge  
- `indigo` - Indigo badge (default)
- `red` - Red badge
- `yellow` - Yellow badge

### Call to Action (CTA)

Customize the CTA section at the end of articles:
- **Title**: Catchy headline
- **Description**: Explanatory text
- **Button Text**: Action text for the button
- **Button Link**: Where the button should go

## Best Practices

### SEO Optimization
- **Title**: 50-60 characters, include main keyword
- **Description**: 150-160 characters, compelling summary
- **Keywords**: 5-10 relevant keywords
- **Slug**: Short, descriptive, kebab-case

### Content Writing
- **Opening**: Hook readers in the first paragraph
- **Structure**: Use clear headings to break up content
- **Lists**: Use bullet points for easy scanning
- **Length**: Aim for 1500-3000 words for SEO
- **CTA**: Always end with a relevant call-to-action

### Images
- **Hero Image**: High-quality, relevant to content
- **Alt Text**: Descriptive for accessibility and SEO
- **File Size**: Optimize for web (under 500KB recommended)

## File Structure

After creating a blog post, your structure will look like:

```
app/blog/
├── your-article-slug/
│   └── page.tsx          # Your article file
├── layout.tsx            # Blog layout
└── page.tsx              # Blog listing page
```

## Advanced Usage

### Custom Sections

For more complex content, you can use the full `BlogArticleData` interface which supports:
- Quote blocks
- Custom images within content
- Image captions
- Custom backgrounds for CTA sections

### Adding to Blog Listing

New articles automatically appear on the blog listing page (`/blog`) if they're added to the `blogPosts` array in `app/blog/page.tsx`.

Add your article to the array:
```typescript
const blogPosts = [
  // ... existing posts
  {
    id: 'your-article-slug',
    title: 'Your Article Title',
    excerpt: 'Brief description for the listing page',
    publishedAt: '2024-03-22',
    author: 'Travel Team',
    readTime: '7 min read',
    category: 'Travel Tips',
    image: '/images/your-hero-image.jpg',
  },
]
```

## Troubleshooting

### Common Issues

1. **Slug already exists**: Choose a unique slug for each article
2. **Images not loading**: Ensure image paths start with `/images/`
3. **Date format**: Use YYYY-MM-DD format for dates
4. **TypeScript errors**: Make sure all required fields are filled

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify all required fields are filled
3. Compare with existing working blog posts
4. Ensure proper TypeScript syntax

## Example: Creating a New Article

Here's a complete example of creating a new travel tips article:

```bash
# 1. Generate the template
node scripts/create-blog-post.js "solo-travel-safety-tips" "Solo Travel Safety Tips for First-Time Travelers"

# 2. Edit app/blog/solo-travel-safety-tips/page.tsx
# Update the articleData object with your content

# 3. Add to blog listing (app/blog/page.tsx)
# Add entry to blogPosts array

# 4. Test locally
# Visit http://localhost:3000/blog/solo-travel-safety-tips
```

That's it! You now have a fully functional blog post with proper SEO, metadata, and styling.
