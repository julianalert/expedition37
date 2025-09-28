# Adding Images to Blog Posts

## Overview

The blog template system supports multiple ways to add images to your articles. Here's a complete guide on how to use them.

## 1. Hero Image (Main Article Image)

Every blog post has a main hero image that appears at the top. This is set in the `articleData`:

```typescript
const articleData: SimpleBlogArticle = {
  heroImage: "/images/your-hero-image.jpg",
  heroImageAlt: "Descriptive alt text for accessibility",
  // ... rest of your data
}
```

**Best Practices for Hero Images:**
- **Size**: 1200x630px (optimal for social sharing)
- **Format**: JPG or PNG
- **Location**: Store in `/public/images/` directory
- **Alt Text**: Describe what's in the image for accessibility

## 2. Content Images (Advanced Method)

To add images within your article content, you need to use the full `BlogArticleData` interface instead of `SimpleBlogArticle`. Here's how:

### Step 1: Import the Full Interface

```typescript
import { BlogArticleData } from '@/types/blog'
import BlogTemplate, { createBlogMetadata } from '@/components/blog-template'
```

### Step 2: Use BlogArticleData Instead of SimpleBlogArticle

```typescript
const articleData: BlogArticleData = {
  title: "Your Article Title",
  description: "Your description",
  keywords: ["keyword1", "keyword2"],
  canonicalSlug: "your-slug",
  
  // Open Graph settings
  ogImage: "/images/your-hero-image.jpg",
  ogImageAlt: "Alt text for social sharing",
  
  // Article info
  publishDate: "2024-03-22",
  author: "Travel Team",
  readTime: "7 min read",
  category: "Travel Tips",
  
  // Hero section
  heroImage: "/images/your-hero-image.jpg",
  heroImageAlt: "Alt text for hero image",
  excerpt: "Your article excerpt",
  
  // Content with images
  sections: [
    {
      type: 'paragraph',
      content: 'Your opening paragraph.'
    },
    {
      type: 'heading',
      content: 'Section with Image'
    },
    {
      type: 'paragraph',
      content: 'Some text before the image.'
    },
    {
      type: 'image',
      content: '/images/your-content-image.jpg',
      imageAlt: 'Description of the image',
      imageCaption: 'Optional caption that appears below the image'
    },
    {
      type: 'paragraph',
      content: 'Text that continues after the image.'
    }
  ],
  
  // Call to action
  cta: {
    title: "Your CTA Title",
    description: "CTA description",
    buttonText: "Button Text",
    buttonLink: "/"
  }
}
```

### Step 3: Update Your Component

```typescript
// Generate metadata from article data
const metadataConfig = createBlogMetadata(articleData)
export const metadata = generateMetadata(metadataConfig)

// Blog post component
export default function BlogPost() {
  return <BlogTemplate articleData={articleData} />
}
```

## 3. Image Organization

### File Structure
Store all images in the `/public/images/` directory:

```
public/images/
├── blog/
│   ├── hero-images/
│   │   ├── travel-tips-hero.jpg
│   │   └── digital-nomad-hero.jpg
│   └── content/
│       ├── travel-gear-setup.jpg
│       ├── workspace-setup.jpg
│       └── destination-photos/
│           ├── bali-coworking.jpg
│           └── lisbon-cafes.jpg
└── testimonial-01.jpg (existing)
```

### Referencing Images
Always use absolute paths starting with `/images/`:

```typescript
heroImage: "/images/blog/hero-images/travel-tips-hero.jpg"
content: "/images/blog/content/workspace-setup.jpg"
```

## 4. Image Optimization Best Practices

### Recommended Sizes
- **Hero Images**: 1200x630px (16:9 ratio)
- **Content Images**: 800-1200px width
- **File Size**: Under 500KB for web performance

### Formats
- **JPG**: For photos and complex images
- **PNG**: For graphics with transparency
- **WebP**: For better compression (Next.js auto-converts)

### Alt Text Guidelines
- Be descriptive and specific
- Don't start with "Image of..." or "Photo of..."
- Include relevant context for the article
- Keep under 100 characters when possible

Examples:
- ✅ "Digital nomad working on laptop in a Bali cafe"
- ✅ "Essential travel gear laid out on a bed"
- ❌ "Image of laptop"
- ❌ "Photo"

## 5. Complete Example: Article with Images

Here's a complete example of a blog post with multiple images:

```typescript
import { generateMetadata } from '@/lib/metadata'
import BlogTemplate, { createBlogMetadata } from '@/components/blog-template'
import { BlogArticleData } from '@/types/blog'

const articleData: BlogArticleData = {
  title: "Best Digital Nomad Destinations in 2024",
  description: "Discover the top destinations for digital nomads with great WiFi, affordable living, and vibrant communities.",
  keywords: ["digital nomad", "remote work", "travel destinations"],
  canonicalSlug: "best-digital-nomad-destinations-2024",
  
  ogImage: "/images/blog/hero-images/nomad-destinations-hero.jpg",
  ogImageAlt: "Digital nomads working in exotic locations around the world",
  
  publishDate: "2024-03-22",
  author: "Travel Team",
  readTime: "8 min read",
  category: "Digital Nomad",
  
  heroImage: "/images/blog/hero-images/nomad-destinations-hero.jpg",
  heroImageAlt: "Digital nomads working in exotic locations around the world",
  excerpt: "From Bali's rice terraces to Lisbon's historic cafes, discover where digital nomads are thriving in 2024.",
  
  sections: [
    {
      type: 'paragraph',
      content: 'The digital nomad lifestyle has never been more accessible. Here are the top destinations that combine excellent infrastructure with incredible experiences.'
    },
    {
      type: 'heading',
      content: '1. Bali, Indonesia'
    },
    {
      type: 'paragraph',
      content: 'Bali continues to be a nomad favorite with its perfect blend of tropical paradise and modern amenities.'
    },
    {
      type: 'image',
      content: '/images/blog/content/bali-coworking-space.jpg',
      imageAlt: 'Modern coworking space in Canggu, Bali with tropical plants and natural lighting',
      imageCaption: 'Coworking spaces in Bali offer a perfect blend of productivity and paradise'
    },
    {
      type: 'list',
      heading: 'Why Bali Works for Nomads:',
      content: [
        '<strong>Cost of Living:</strong> $800-1500/month for comfortable living',
        '<strong>Internet:</strong> Reliable fiber internet in most areas',
        '<strong>Community:</strong> Large expat and nomad community',
        '<strong>Visa:</strong> 30-day visa-free entry, extendable'
      ]
    },
    {
      type: 'heading',
      content: '2. Lisbon, Portugal'
    },
    {
      type: 'paragraph',
      content: 'Lisbon has emerged as Europe\'s digital nomad capital, offering EU access with affordable living costs.'
    },
    {
      type: 'image',
      content: '/images/blog/content/lisbon-cafe-work.jpg',
      imageAlt: 'Digital nomad working on laptop in traditional Portuguese cafe with azulejo tiles',
      imageCaption: 'Lisbon\'s historic cafes provide inspiring workspaces with fast WiFi'
    }
  ],
  
  cta: {
    title: "Find Your Perfect Nomad Destination",
    description: "Use our destination finder to discover places that match your budget, climate preferences, and work requirements.",
    buttonText: "Explore Destinations",
    buttonLink: "/"
  }
}

const metadataConfig = createBlogMetadata(articleData)
export const metadata = generateMetadata(metadataConfig)

export default function BlogPost() {
  return <BlogTemplate articleData={articleData} />
}
```

## 6. Quick Tips

### For Simple Articles (using SimpleBlogArticle)
- Only hero images are supported
- Perfect for articles that don't need content images

### For Rich Articles (using BlogArticleData)
- Full image support throughout the content
- Requires more setup but much more flexible
- Better for comprehensive guides and tutorials

### Image Captions
- Always optional
- Appear in italics below images
- Great for providing context or photo credits

### Responsive Design
- All images are automatically responsive
- They scale properly on mobile devices
- The template handles all the responsive CSS

## 7. Converting from SimpleBlogArticle to BlogArticleData

If you have an existing simple blog post and want to add content images:

1. Change the import and interface
2. Expand the data structure
3. Convert `content` array to `sections` array
4. Add your image sections

The blog template will handle everything else automatically!
