// Blog post interfaces and types
export interface BlogArticleData {
  // SEO and Metadata
  title: string;
  description: string;
  keywords: string[];
  canonicalSlug: string; // The URL slug (e.g., 'budget-travel-secrets')
  
  // Open Graph Image
  ogImage: string; // Path to image (e.g., '/images/testimonial-01.jpg')
  ogImageAlt: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  
  // Article Info
  publishDate: string; // Format: 'YYYY-MM-DD'
  author: string;
  readTime: string; // e.g., '7 min read'
  category: string;
  categoryColor?: 'green' | 'blue' | 'purple' | 'indigo' | 'red' | 'yellow';
  
  // Hero Section
  heroImage: string; // Path to main article image
  heroImageAlt: string;
  excerpt: string; // Subtitle/description under the title
  
  // Content sections
  sections: BlogSection[];
  
  // Call to Action
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundColor?: string; // Optional custom background
  };
}

export interface BlogSection {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'image';
  content: string | string[]; // String for paragraph/heading/quote, array for lists
  heading?: string; // For lists, optional heading
  imageAlt?: string; // For images
  imageCaption?: string; // Optional image caption
}

// Helper type for easy article creation
export interface SimpleBlogArticle {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  
  publishDate: string;
  author: string;
  readTime: string;
  category: string;
  
  heroImage: string;
  heroImageAlt: string;
  excerpt: string;
  
  // Simplified content - just paragraphs and headings
  content: {
    heading?: string;
    paragraphs: string[];
    list?: {
      heading: string;
      items: string[];
    };
  }[];
  
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}
