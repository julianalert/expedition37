import fs from 'fs';
import path from 'path';
import { SimpleBlogArticle } from '@/types/blog';

export interface BlogPostListing {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

// Function to extract blog post data from a page.tsx file
function extractBlogDataFromFile(filePath: string): BlogPostListing | null {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Look for the articleData object in the file
    const articleDataMatch = content.match(/const articleData: SimpleBlogArticle = \{([\s\S]*?)\}/);
    if (!articleDataMatch) {
      return null;
    }
    
    // Extract individual fields using regex
    const titleMatch = content.match(/title: ["']([^"']+)["']/);
    const excerptMatch = content.match(/excerpt: ["']([^"']+)["']/);
    const publishDateMatch = content.match(/publishDate: ["']([^"']+)["']/);
    const authorMatch = content.match(/author: ["']([^"']+)["']/);
    const readTimeMatch = content.match(/readTime: ["']([^"']+)["']/);
    const categoryMatch = content.match(/category: ["']([^"']+)["']/);
    const heroImageMatch = content.match(/heroImage: ["']([^"']+)["']/);
    const slugMatch = content.match(/slug: ["']([^"']+)["']/);
    
    if (!titleMatch || !excerptMatch || !publishDateMatch || !slugMatch) {
      return null;
    }
    
    return {
      id: slugMatch[1],
      title: titleMatch[1],
      excerpt: excerptMatch[1],
      publishedAt: publishDateMatch[1],
      author: authorMatch?.[1] || 'Travel Team',
      readTime: readTimeMatch?.[1] || '5 min read',
      category: categoryMatch?.[1] || 'Travel Tips',
      image: heroImageMatch?.[1] || '/images/testimonial-01.jpg',
    };
  } catch (error) {
    console.error(`Error reading blog post file ${filePath}:`, error);
    return null;
  }
}

// Function to discover all blog posts automatically
export function discoverBlogPosts(): BlogPostListing[] {
  const blogDir = path.join(process.cwd(), 'app', 'blog');
  const posts: BlogPostListing[] = [];
  
  try {
    // Get all directories in the blog folder
    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const postDir = path.join(blogDir, entry.name);
        const pageFile = path.join(postDir, 'page.tsx');
        
        // Check if page.tsx exists in this directory
        if (fs.existsSync(pageFile)) {
          const blogData = extractBlogDataFromFile(pageFile);
          if (blogData) {
            posts.push(blogData);
          }
        }
      }
    }
    
    // Sort posts by publication date (newest first)
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return posts;
  } catch (error) {
    console.error('Error discovering blog posts:', error);
    return [];
  }
}

// Function for static generation - gets blog posts at build time
export function getBlogPostsStatic(): BlogPostListing[] {
  return discoverBlogPosts();
}

// Legacy function to maintain compatibility with existing hardcoded posts
export function getLegacyBlogPosts(): BlogPostListing[] {
  return [
    // Legacy posts removed - all posts are now auto-discovered
  ];
}

// Combined function that gets both auto-discovered and legacy posts
export function getAllBlogPosts(): BlogPostListing[] {
  const discoveredPosts = discoverBlogPosts();
  const legacyPosts = getLegacyBlogPosts();
  
  // Combine and deduplicate by id
  const allPosts = [...discoveredPosts];
  
  for (const legacyPost of legacyPosts) {
    if (!allPosts.find(post => post.id === legacyPost.id)) {
      allPosts.push(legacyPost);
    }
  }
  
  // Sort by publication date (newest first)
  allPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
  return allPosts;
}
