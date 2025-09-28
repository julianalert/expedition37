import { generateMetadata, SITE_CONFIG, MetadataConfig } from '@/lib/metadata'
import Link from 'next/link'
import Image from 'next/image'
import { BlogArticleData, BlogSection } from '@/types/blog'

interface BlogTemplateProps {
  articleData: BlogArticleData;
}

// Helper function to generate metadata config from article data
export function createBlogMetadata(data: BlogArticleData): MetadataConfig {
  return {
    seo: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      canonical: `${SITE_CONFIG.url}/blog/${data.canonicalSlug}`,
      robots: 'index, follow',
      author: SITE_CONFIG.author,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${SITE_CONFIG.url}/blog/${data.canonicalSlug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}${data.ogImage}`,
          width: data.ogImageWidth || 1200,
          height: data.ogImageHeight || 630,
          alt: data.ogImageAlt,
          type: 'image/jpeg',
        },
      ],
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitter,
      creator: SITE_CONFIG.twitter,
      title: data.title,
      description: data.description,
      images: [`${SITE_CONFIG.url}${data.ogImage}`],
    },
  }
}

// Helper function to get category colors
function getCategoryColorClasses(color: string = 'indigo') {
  const colorMap = {
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.indigo;
}

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Component to render different section types
function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6">
          {section.content}
        </p>
      );
    
    case 'heading':
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
          {section.content}
        </h2>
      );
    
    case 'list':
      return (
        <div key={index}>
          {section.heading && (
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {section.heading}
            </h3>
          )}
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            {Array.isArray(section.content) && section.content.map((item, itemIndex) => (
              <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      );
    
    case 'quote':
      return (
        <blockquote key={index} className="border-l-4 border-indigo-500 pl-4 py-2 my-6 text-lg italic text-gray-700 bg-gray-50 rounded-r-lg">
          {section.content}
        </blockquote>
      );
    
    case 'image':
      return (
        <div key={index} className="my-8">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src={section.content as string}
              alt={section.imageAlt || 'Article image'}
              fill
              className="object-cover"
            />
          </div>
          {section.imageCaption && (
            <p className="text-sm text-gray-500 text-center mt-2 italic">
              {section.imageCaption}
            </p>
          )}
        </div>
      );
    
    default:
      return null;
  }
}

export default function BlogTemplate({ articleData }: BlogTemplateProps) {
  const {
    title,
    publishDate,
    author,
    readTime,
    category,
    categoryColor,
    heroImage,
    heroImageAlt,
    excerpt,
    sections,
    cta,
    canonicalSlug,
  } = articleData;

  return (
    <>
      {/* Article Hero */}
      <article className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/blog" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                  Blog
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-600">{title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className={`px-3 py-1 rounded-full font-medium ${getCategoryColorClasses(categoryColor)}`}>
                {category}
              </span>
              <time dateTime={publishDate}>
                {formatDate(publishDate)}
              </time>
              <span>•</span>
              <span>{readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4 text-gray-900">
              {title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => renderSection(section, index))}

            {/* Call to Action */}
            <div className={`${cta.backgroundColor || 'bg-gradient-to-r from-green-50 to-indigo-50'} rounded-2xl p-6 md:p-8 mt-8`}>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {cta.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {cta.description}
              </p>
              <Link 
                href={cta.buttonLink}
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
              >
                {cta.buttonText}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Published by {author} on {formatDate(publishDate)}
              </div>
              <Link 
                href="/blog"
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
              >
                ← Back to Blog
              </Link>
            </div>
          </footer>

        </div>
      </article>
    </>
  );
}
