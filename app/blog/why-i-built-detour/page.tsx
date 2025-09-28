import { generateMetadata as generateMetadataHelper } from '@/lib/metadata'
import BlogTemplate, { createBlogMetadata } from '@/components/blog-template'
import { BlogArticleData } from '@/types/blog'

// Article data
const articleData: BlogArticleData = {
  title: "Why Travel Planning is Broken - Manifesto",
  description: "The story behind Detour and why traditional travel planning fails to match travelers with destinations that truly fit their needs, budget, and personality.",
  keywords: ["travel planning", "destination discovery", "personalized travel", "travel technology", "startup story", "authentic travel experiences"],
  canonicalSlug: "why-i-built-detour",
  ogImage: "/images/blog/travel-planning.jpg",
  ogImageAlt: "Why I Built Detour - The story behind personalized travel planning",
  publishDate: "2025-09-25",
  author: "Clement B.",
  readTime: "8 min read",
  category: "Story",
  categoryColor: "purple",
  heroImage: "/images/blog/travel-planning.jpg",
  heroImageAlt: "Person planning travel with maps and laptop, representing the complexity of modern travel planning",
  excerpt: "After years of disappointing trips to must-visit destinations, I realized travel planning is fundamentally broken. Here is why I built Detour to help travelers find places that actually match who they are.",
  sections: [
    {
      type: "paragraph",
      content: "I've planned a lot of trips in my life. Probably too many."
    },
    {
      type: "paragraph",
      content: "I've spent entire weekends researching destinations, cross-referencing blog posts, arguing with friends about where to go next. I've booked flights to places that looked amazing online but felt completely wrong when I got there. I've had those conversations where someone asks \"How was your trip?\" and I pause just a little too long before saying \"Great!\""
    },
    {
      type: "paragraph",
      content: "Because it was fine. It was nice. But it wasn't... mine."
    },
    {
      type: "paragraph",
      content: "That's when I realized travel planning is fundamentally broken."
    },
    {
      type: "heading",
      content: "We're All Going to the Same Places"
    },
    {
      type: "paragraph",
      content: "Here's what happens: You decide you want to go somewhere. You Google \"best destinations for [whatever].\" You read three articles that all recommend the same five places. You pick one, book it, and hope for the best."
    },
    {
      type: "paragraph",
      content: "Meanwhile, there are 195 countries in the world. Thousands of cities. Millions of neighborhoods, beaches, mountains, and hidden corners that could be absolutely perfect for you. But you'll never find them because they don't show up in listicles titled \"10 Must-Visit Places Before You Die.\""
    },
    {
      type: "paragraph",
      content: "I started noticing this everywhere. My friends would come back from trips to the same handful of places, posting the same photos from the same viewpoints. Not because they lacked imagination, but because that's literally all the internet was showing them."
    },
    {
      type: "heading",
      content: "The Questions Nobody Asks"
    },
    {
      type: "paragraph",
      content: "The worst part? The travel industry treats us all like we want the same thing."
    },
    {
      type: "paragraph",
      content: "Nobody asks if you're the kind of person who needs good Wi-Fi or if you're trying to escape the internet entirely. Nobody cares if you have social anxiety and need quiet places, or if you thrive in chaotic, crowded cities. Nobody considers that maybe you want to feel safe walking around at night, or that your idea of romance is sharing a meal, not posing for sunset photos."
    },
    {
      type: "paragraph",
      content: "I remember planning a \"relaxing\" beach vacation and ending up somewhere with terrible food, expensive everything, and crowds of people exactly like me who had read the same \"hidden gem\" article. I spent a week stressed about money and annoyed by tourists. So much for relaxing."
    },
    {
      type: "paragraph",
      content: "That's when I started asking different questions: What if travel recommendations actually considered who you are and what you need right now?"
    },
    {
      type: "heading",
      content: "Building Something Different"
    },
    {
      type: "paragraph",
      content: "So I built Detour. Not as some grand business plan, but because I was genuinely frustrated with how bad destination discovery had become."
    },
    {
        type: "image",
        content: "/images/blog/detour.png",
        imageAlt: "Detour",
        imageCaption: "Find the best destination for you"
      },
    {
      type: "paragraph",
      content: "The idea is simple: instead of showing everyone the same places, we figure out what matters to you specifically. Your budget (the real one, not the Instagram one). Your safety concerns. Whether you want to blend in or stand out. Whether you're trying to impress someone on a date or just need to decompress after a brutal work season."
    },
    {
      type: "paragraph",
      content: "Then we suggest places you probably haven't heard of that match what you actually want."
    },
    {
      type: "heading",
      content: "Why This Matters to Me"
    },
    {
      type: "paragraph",
      content: "Look, I'm not trying to revolutionize the travel industry or anything dramatic like that. I just think we all deserve to spend our vacation time, which is limited and precious, in places that actually fit our lives."
    },
    {
      type: "paragraph",
      content: "You know that feeling when someone recommends a restaurant and it's exactly your taste, even though you never would have found it yourself? That's what I want travel to feel like."
    },
    {
      type: "paragraph",
      content: "The world is so much bigger and more interesting than the same 20 destinations everyone talks about. There are places out there that would be perfect for you specifically, at this exact moment in your life, with your current budget and needs and dreams."
    },
    {
      type: "paragraph",
      content: "You just need someone to help you find them."
    },
    {
      type: "heading",
      content: "What's Next"
    },
    {
      type: "paragraph",
      content: "Detour isn't perfect yet. We're constantly adding new destinations, refining our recommendations, learning from every traveler who tries something new. But we're getting better at matching people with places that actually make sense for them."
    },
    {
      type: "paragraph",
      content: "Every time someone discovers a destination through us and falls in love with it, I'm reminded why I started this. Travel shouldn't be about following someone else's path, it should be about finding your own."
    },
    {
      type: "paragraph",
      content: "Your next trip is out there waiting for you. It might be somewhere you've never considered, in a country you can't spell, during a season when \"nobody\" goes there. But it's yours."
    },
    {
      type: "paragraph",
      content: "Ready to take a detour?"
    }
  ],
  cta: {
    title: "Find Your Perfect Destination",
    description: "Stop following the crowd. Let us help you discover destinations that match your personality, budget, and travel style.",
    buttonText: "Start Planning Your Trip",
    buttonLink: "/"
  }
}

// Generate metadata from article data
const metadataConfig = createBlogMetadata(articleData)
export const metadata = generateMetadataHelper(metadataConfig)

// Blog post component
export default function WhyIBuiltDetourPage() {
  return <BlogTemplate articleData={articleData} />
}
