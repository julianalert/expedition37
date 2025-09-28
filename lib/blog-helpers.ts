import { BlogArticleData, SimpleBlogArticle, BlogSection } from '@/types/blog';

// Convert simplified blog article to full blog article data
export function createBlogArticleData(simple: SimpleBlogArticle): BlogArticleData {
  // Convert simplified content to sections
  const sections: BlogSection[] = [];
  
  simple.content.forEach(contentBlock => {
    if (contentBlock.heading) {
      sections.push({
        type: 'heading',
        content: contentBlock.heading
      });
    }
    
    contentBlock.paragraphs.forEach(paragraph => {
      sections.push({
        type: 'paragraph',
        content: paragraph
      });
    });
    
    if (contentBlock.list) {
      sections.push({
        type: 'list',
        content: contentBlock.list.items,
        heading: contentBlock.list.heading
      });
    }
  });
  
  return {
    title: simple.title,
    description: simple.description,
    keywords: simple.keywords,
    canonicalSlug: simple.slug,
    ogImage: simple.heroImage,
    ogImageAlt: simple.heroImageAlt,
    publishDate: simple.publishDate,
    author: simple.author,
    readTime: simple.readTime,
    category: simple.category,
    heroImage: simple.heroImage,
    heroImageAlt: simple.heroImageAlt,
    excerpt: simple.excerpt,
    sections,
    cta: simple.cta
  };
}

// Helper function to create a blog post template file
export function generateBlogPostTemplate(simple: SimpleBlogArticle): string {
  return `import { generateMetadata } from '@/lib/metadata'
import BlogTemplate, { createBlogMetadata } from '@/components/blog-template'
import { createBlogArticleData } from '@/lib/blog-helpers'
import { SimpleBlogArticle } from '@/types/blog'

// Article data - edit these variables for your new blog post
const articleData: SimpleBlogArticle = {
  // SEO and Basic Info
  title: "${simple.title}",
  description: "${simple.description}",
  keywords: ${JSON.stringify(simple.keywords, null, 4)},
  slug: "${simple.slug}",
  
  // Publication Info
  publishDate: "${simple.publishDate}",
  author: "${simple.author}",
  readTime: "${simple.readTime}",
  category: "${simple.category}",
  
  // Hero Section
  heroImage: "${simple.heroImage}",
  heroImageAlt: "${simple.heroImageAlt}",
  excerpt: "${simple.excerpt}",
  
  // Article Content
  content: ${JSON.stringify(simple.content, null, 4)},
  
  // Call to Action
  cta: {
    title: "${simple.cta.title}",
    description: "${simple.cta.description}",
    buttonText: "${simple.cta.buttonText}",
    buttonLink: "${simple.cta.buttonLink}"
  }
}

// Generate metadata from article data
const metadataConfig = createBlogMetadata(createBlogArticleData(articleData))
export const metadata = generateMetadata(metadataConfig)

// Blog post component
export default function BlogPost() {
  return <BlogTemplate articleData={createBlogArticleData(articleData)} />
}`;
}

// Default template data for new articles
export const defaultArticleTemplate: SimpleBlogArticle = {
  title: "Your Article Title Here",
  description: "A compelling description of your article that will appear in search results and social media.",
  keywords: [
    "travel",
    "travel tips",
    "destination",
    "adventure",
    "travel guide"
  ],
  slug: "your-article-slug",
  
  publishDate: new Date().toISOString().split('T')[0],
  author: "Travel Team",
  readTime: "5 min read",
  category: "Travel Tips",
  
  heroImage: "/images/testimonial-01.jpg",
  heroImageAlt: "Description of your hero image",
  excerpt: "An engaging excerpt that summarizes your article and entices readers to continue reading.",
  
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
  
  cta: {
    title: "Ready to Explore?",
    description: "Find destinations that match your interests and travel style with our intelligent destination finder.",
    buttonText: "Find Your Perfect Destination",
    buttonLink: "/"
  }
};
