#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Default template for new blog posts
const createBlogPostTemplate = (slug, title) => `import { generateMetadata } from '@/lib/metadata'
import BlogTemplate, { createBlogMetadata } from '@/components/blog-template'
import { createBlogArticleData } from '@/lib/blog-helpers'
import { SimpleBlogArticle } from '@/types/blog'

// Article data - edit these variables for your new blog post
const articleData: SimpleBlogArticle = {
  // SEO and Basic Info
  title: "${title}",
  description: "A compelling description of your article that will appear in search results and social media.",
  keywords: [
    "travel",
    "travel tips",
    "destination",
    "adventure",
    "travel guide"
  ],
  slug: "${slug}",
  
  // Publication Info
  publishDate: "${new Date().toISOString().split('T')[0]}",
  author: "Travel Team",
  readTime: "5 min read",
  category: "Travel Tips",
  
  // Hero Section
  heroImage: "/images/testimonial-01.jpg",
  heroImageAlt: "Description of your hero image",
  excerpt: "An engaging excerpt that summarizes your article and entices readers to continue reading.",
  
  // Article Content
  content: [
    {
      paragraphs: [
        "Your opening paragraph should hook the reader and introduce the main topic of your article.",
        "Continue with more details and context about your topic."
      ]
    },
    {
      heading: "Your First Main Section",
      paragraphs: [
        "Content for your first main section goes here.",
        "You can add multiple paragraphs to fully explore each topic."
      ],
      list: {
        heading: "Key Points",
        items: [
          "<strong>Point 1:</strong> Description of your first important point.",
          "<strong>Point 2:</strong> Description of your second important point.",
          "<strong>Point 3:</strong> Description of your third important point."
        ]
      }
    },
    {
      heading: "Your Second Main Section",
      paragraphs: [
        "Content for your second main section.",
        "Keep adding sections as needed for your article structure."
      ]
    },
    {
      heading: "Conclusion",
      paragraphs: [
        "Wrap up your article with a strong conclusion that reinforces your main points.",
        "End with a call-to-action or thought that encourages engagement."
      ]
    }
  ],
  
  // Call to Action
  cta: {
    title: "Ready to Explore?",
    description: "Find destinations that match your interests and travel style with our intelligent destination finder.",
    buttonText: "Find Your Perfect Destination",
    buttonLink: "/"
  }
}

// Generate metadata from article data
const metadataConfig = createBlogMetadata(createBlogArticleData(articleData))
export const metadata = generateMetadata(metadataConfig)

// Blog post component
export default function BlogPost() {
  return <BlogTemplate articleData={createBlogArticleData(articleData)} />
}`;

// Function to create a new blog post
function createBlogPost(slug, title) {
  const blogDir = path.join(__dirname, '..', 'app', 'blog');
  const postDir = path.join(blogDir, slug);
  const pageFile = path.join(postDir, 'page.tsx');
  
  // Check if directory already exists
  if (fs.existsSync(postDir)) {
    console.error(`❌ Blog post directory '${slug}' already exists!`);
    process.exit(1);
  }
  
  // Create directory
  fs.mkdirSync(postDir, { recursive: true });
  
  // Create page.tsx file
  fs.writeFileSync(pageFile, createBlogPostTemplate(slug, title));
  
  console.log(`✅ Created new blog post: ${slug}`);
  console.log(`📁 Directory: app/blog/${slug}/`);
  console.log(`📄 File: app/blog/${slug}/page.tsx`);
  console.log(``);
  console.log(`Next steps:`);
  console.log(`1. Edit the article data in app/blog/${slug}/page.tsx`);
  console.log(`2. Add your content to the 'content' array`);
  console.log(`3. Update the hero image and other metadata`);
  console.log(`4. Test your article at http://localhost:3000/blog/${slug}`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`Blog Post Generator`);
  console.log(``);
  console.log(`Usage:`);
  console.log(`  node scripts/create-blog-post.js "your-article-slug" "Your Article Title"`);
  console.log(``);
  console.log(`Examples:`);
  console.log(`  node scripts/create-blog-post.js "best-travel-apps" "Best Travel Apps for 2024"`);
  console.log(`  node scripts/create-blog-post.js "solo-travel-tips" "Solo Travel Tips for Beginners"`);
  process.exit(1);
}

const slug = args[0];
const title = args[1] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

// Validate slug
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('❌ Slug must contain only lowercase letters, numbers, and hyphens');
  process.exit(1);
}

createBlogPost(slug, title);
