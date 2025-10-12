import { generateMetadata as generateMetadataHelper } from '@/lib/metadata'
import { createBlogMetadata } from '@/components/blog-template'
import { BlogArticleData, BlogSection } from '@/types/blog'
import KosherItalyTable from '@/components/KosherItalyTable'
import Link from 'next/link'
import Image from 'next/image'

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
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

// Article data
const articleData: BlogArticleData = {
  title: "Italy Kosher Travel Guide: Where to Eat, Stay, and Sip Across Rome, Milan, Venice, and Tuscany",
  description: "From Rome's Jewish quarter to the kosher wineries of Tuscany, via My Kosher Hotel in Canazei in the Alps, here's how to explore Italy the kosher way.",
  keywords: ["kosher travel", "Italy kosher", "Jewish Italy", "kosher restaurants", "kosher hotels", "Rome Jewish Quarter", "kosher wine", "Tuscany kosher", "Venice kosher", "Milan kosher"],
  canonicalSlug: "kosher-italy",
  
  ogImage: "/images/blog/Italy Kosher Travel Guide.jpg",
  ogImageAlt: "Italy's most beautiful destinations with kosher-friendly accommodations and restaurants",
  
  publishDate: "2025-10-12",
  author: "Sarah S.",
  readTime: "12 min read",
  category: "Travel Guide",
  categoryColor: "purple",
  
  heroImage: "/images/blog/Italy Kosher Travel Guide.jpg",
  heroImageAlt: "Italy's most beautiful destinations with kosher-friendly accommodations and restaurants",
  excerpt: "From Rome's Jewish quarter to the kosher wineries of Tuscany, via My Kosher Hotel in Canazei in the Alps, here's how to explore Italy the kosher way.",
  
  sections: [
    {
      type: 'paragraph',
      content: "Traveling in Italy as a Jewish visitor is a deeply layered experience. The country isn't just home to breathtaking cathedrals and Renaissance art, it's also home to one of the oldest Jewish communities in Europe. Jews have lived in Italy for more than 2,000 years (a new museum explores this long relationship in Ferrara), long before the unification of the country itself."
    },
    {
      type: 'paragraph',
      content: "From the narrow lanes of Rome's Jewish Quarter to the grand canals of Venice and the Alpine peaks of Canazei, Jewish history is everywhere. And today, Italy's Jewish community continues to thrive. Small but proud, with kosher restaurants, schools, and synagogues spread across the country."
    },
    {
      type: 'paragraph',
      content: "But if you keep kosher, traveling here can be… tricky. Deliciously so, but tricky nonetheless. Kosher food isn't always easy to find, and kosher accommodations are rare outside major cities. Still, with some planning, Italy offers an unforgettable experience where Jewish heritage, food, and beauty blend seamlessly."
    },
    {
      type: 'heading',
      content: "Finding Kosher in Italy: Easier Said Than Done"
    },
    {
      type: 'paragraph',
      content: "Let's be honest, Italy is a foodie paradise, but it's not naturally geared toward kosher travelers. Between prosciutto-heavy antipasti and seafood-laden pasta, kosher dining requires a little extra effort."
    },
    {
      type: 'paragraph',
      content: "In big cities like Rome and Milan, you'll find established kosher restaurants and bakeries. But venture into smaller towns, and you'll quickly realize how rare kosher options are. That's why most kosher travelers plan around cities with existing Jewish infrastructure or rely on hotels that cater specifically to kosher guests."
    },
    {
      type: 'paragraph',
      content: "Kosher-friendly accommodations are limited. In most regions, you'll find either My Kosher Hotel in Canazei (a one-of-a-kind property in the Alps) or a handful of kosher apartments in major cities like Rome and Milan. Activities, too, often need to be planned through Jewish community centers or local Chabad houses."
    },
    {
      type: 'paragraph',
      content: "Still, it's not impossible. The growing network of kosher travel services in Italy, combined with welcoming Jewish communities, means you can enjoy everything Italy has to offer without compromising your traditions."
    },
    {
      type: 'paragraph',
      content: "👉 Tip: Visit the <a href=\"https://www.ucei.it/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Union of Jewish Communities in Italy</a> before your trip for updates on kosher restaurants and synagogues."
    },
    {
      type: 'heading',
      content: "A Kosher Itinerary Through Italy"
    },
    {
      type: 'paragraph',
      content: "To make things easier, we've built an itinerary that connects five key destinations for kosher travelers:"
    }
  ],
  
  cta: {
    title: "Plan Your Italian Adventure",
    description: "Looking for more destination guides? Explore our Italy travel section for more tips on where to go, what to eat, and how to make the most of your trip.",
    buttonText: "Explore Italy",
    buttonLink: "/italy"
  }
};

// Generate metadata from article data
const metadataConfig = createBlogMetadata(articleData)
export const metadata = generateMetadataHelper(metadataConfig)

// Component to render different section types
function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: section.content as string }} />
      );
    
    case 'heading':
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
          {section.content}
        </h2>
      );
    
    case 'heading3':
      return (
        <h3 key={index} className="text-xl md:text-2xl font-semibold text-gray-900 mt-6 mb-3">
          {section.content}
        </h3>
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

// Blog post component
export default function KosherItalyPage() {
  // Split sections: content before and after table
  const sectionsBeforeTable = articleData.sections;
  
  const sectionsAfterTable: BlogSection[] = [
    {
      type: 'paragraph',
      content: "This route offers the perfect balance of culture, faith, and food—without compromising your dietary needs."
    },
    {
      type: 'image',
      content: '/images/blog/Roma Ghetto.jpg',
      imageAlt: 'The Jewish Quarter in Rome with historic buildings and cobblestone streets',
      imageCaption: 'The ghetto in Rome is one of the oldest and most vibrant in Europe.'
    },
    {
      type: 'heading',
      content: "Rome: The Beating Heart of Jewish Italy"
    },
    {
      type: 'paragraph',
      content: "No place in Italy tells the story of Jewish life like Rome. The city's Jewish Quarter, Il Ghetto, dates back to 1555 and still feels alive today. Synagogues, restaurants, and bakeries fill the cobblestone streets along the Tiber River."
    },
    {
      type: 'paragraph',
      content: "And the food? It's extraordinary."
    },
    {
      type: 'heading3',
      content: "Kosher Restaurants in Rome"
    },
    {
      type: 'paragraph',
      content: "Start with Ba'Ghetto, the most famous kosher restaurant group in Italy. Their flagship in Via del Portico d'Ottavia serves Roman-Jewish classics like carciofi alla giudia (deep-fried artichokes), homemade pasta, and kosher-certified wines."
    },
    {
      type: 'paragraph',
      content: "Other must-tries:"
    },
    {
      type: 'list',
      content: [
        "<strong>Yotvata Dairy Restaurant:</strong> a cozy dairy spot known for its pasta and cheesecake.",
        "<strong>La Taverna del Ghetto:</strong> a fine dining option under rabbinical supervision."
      ]
    },
    {
      type: 'paragraph',
      content: "All these restaurants are within walking distance of the Great Synagogue of Rome, which also hosts the Jewish Museum of Rome, a must-visit for understanding the resilience of the community."
    },
    {
      type: 'image',
      content: '/images/blog/Terra di Seta Kosher Winery.jpg',
      imageAlt: 'Terra di Seta winery in Tuscany with vineyards and rolling hills',
      imageCaption: 'Terra di Seta is the only winery in Italy whose entire wine production, from grapes owned, has obtained the kosher certification.'
    },
    {
      type: 'heading',
      content: "Kosher Winery in Tuscany: Tradition in a Bottle"
    },
    {
      type: 'paragraph',
      content: "Italy's wine culture might seem off-limits to kosher travelers but it's not. Two Tuscan wineries, in particular, have redefined what kosher winemaking can look like."
    },
    {
      type: 'heading3',
      content: "Terra di Seta"
    },
    {
      type: 'paragraph',
      content: "Located near Siena, this family-run winery is 100% kosher and organic. The owners, Daniele and Maria Pellegrini, combine Tuscan tradition with Jewish heritage to produce elegant Chianti Classico wines under strict rabbinical supervision."
    },
    {
      type: 'paragraph',
      content: "You can visit their vineyards, tour the cellar, and enjoy tastings paired with kosher cheeses. It's one of the most scenic and welcoming kosher wine experiences in Europe."
    },
    {
      type: 'heading3',
      content: "Cantina Giuliano"
    },
    {
      type: 'paragraph',
      content: "Founded by a young couple from Israel and Tuscany, Cantina Giuliano is both a kosher winery and boutique restaurant in the heart of Tuscany. The food is kosher-meat certified, the wines are handcrafted, and the atmosphere feels like dining in someone's home."
    },
    {
      type: 'paragraph',
      content: "You can spend the afternoon learning about kosher winemaking while enjoying views of the Tuscan hills, a rare and memorable experience for observant travelers."
    },
    {
      type: 'image',
      content: "/images/blog/Ba'Ghetto Milan.png",
      imageAlt: 'Interior of Ba\'Ghetto restaurant in Milan with traditional Italian-Jewish decor',
      imageCaption: 'Ba\'Ghetto is a must-visit place to sample typical dishes such as Jewish artichokes.'
    },
    {
      type: 'heading',
      content: "Milan: Kosher in the Fashion Capital"
    },
    {
      type: 'paragraph',
      content: "Milan isn't just about fashion and finance, it's also home to a vibrant Jewish population, with a handful of kosher restaurants and shops that keep the community well-fed and connected."
    },
    {
      type: 'heading3',
      content: "Kosher Food in Milan"
    },
    {
      type: 'paragraph',
      content: "One name stands out here too: Ba'Ghetto Milan. Their Milan location serves kosher Mediterranean and Roman-style dishes: think falafel, brisket, and Israeli salads right in the city center."
    },
    {
      type: 'paragraph',
      content: "If you're craving something sweet, visit Kosher Cakes Milano, a small patisserie known for its parve desserts and warm hospitality."
    },
    {
      type: 'paragraph',
      content: "The Milan Jewish Community Center and Synagogue of Via Guastalla are both worth a visit if you want to connect with locals or attend a Shabbat service."
    },
    {
      type: 'image',
      content: '/images/blog/Venice Italy.jpg',
      imageAlt: 'Venice canals with gondolas and historic architecture',
      imageCaption: 'Venice and its canals will be an unforgettable memory, especially for a romantic getaway.'
    },
    {
      type: 'heading',
      content: "Venice: Where History Floats"
    },
    {
      type: 'paragraph',
      content: "Venice is hauntingly beautiful and deeply tied to Jewish history. The city's Jewish Ghetto, established in 1516, is the oldest in the world. It's still home to active synagogues, a museum, and a few kosher dining options."
    },
    {
      type: 'heading3',
      content: "Kosher Food in Venice"
    },
    {
      type: 'paragraph',
      content: "Once again, Ba'Ghetto Venice leads the way. Their Venetian branch sits near the Ghetto Nuovo and offers fish-based dishes, pastas, and kosher wines. Try the grilled branzino or the artichoke risotto."
    },
    {
      type: 'paragraph',
      content: "There's also Gam Gam Kosher Restaurant, run by the Chabad of Venice. It's located right by the canal, offering kosher meat meals and a friendly, communal vibe."
    },
    {
      type: 'paragraph',
      content: "For travelers visiting during Pesach or Sukkot, Chabad often organizes events, communal meals, and Shabbat dinners. You can check their schedules on the <a href=\"https://www.jewishvenice.org/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Chabad of Venice website</a>."
    },
    {
      type: 'heading',
      content: "Canazei and My Kosher Hotel Italy: Faith Meets the Dolomites"
    },
    {
      type: 'paragraph',
      content: "If there's one name that every kosher traveler in Europe knows, it's My Kosher Hotel. Nestled in Canazei, in the Dolomites of Northern Italy, this four-star retreat is a dream for observant travelers."
    },
    {
      type: 'paragraph',
      content: "Here, you don't have to ask if the food is kosher, it's the entire point. The hotel runs under the strict supervision of Rabbi Menachem Lazar, offering glatt kosher cuisine, a Mikveh, and a Shabbat elevator."
    },
    {
      type: 'paragraph',
      content: "Meals are prepared fresh daily: warm challah, local trout, and Italian dishes adapted to kosher guidelines. During ski season, guests can head straight from the slopes to a hearty Shabbat dinner. In summer, hiking trails and alpine meadows surround the property, creating a perfect blend of spirituality and nature."
    },
    {
      type: 'paragraph',
      content: "Every detail has been thought through: Eruv, minyan, and even a sukkah during the holidays. It's not just a hotel; it's a haven."
    },
    {
      type: 'paragraph',
      content: "More info: <a href=\"https://www.mykosherhotel.it/#CANAZEI\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">My Kosher Hotel official site</a>."
    },
    {
      type: 'heading',
      content: "Tips for Traveling Kosher in Italy"
    },
    {
      type: 'list',
      content: [
        "<strong>Plan ahead:</strong> Kosher restaurants outside Rome or Milan may close for holidays or weekends. Always check hours or call ahead.",
        "<strong>Stock up before travel days:</strong> Bring snacks, tuna, or pre-packaged kosher food for train rides.",
        "<strong>Book Shabbat stays early:</strong> In Venice and Canazei especially, kosher accommodations fill up months in advance.",
        "<strong>Use Jewish Travel resources:</strong> Chabad Italy lists kosher eateries, synagogues, and minyan schedules.",
        "<strong>Stay central:</strong> Whether it's Rome's Ghetto or Milan's city center, staying near kosher infrastructure saves you time and stress."
      ]
    },
    {
      type: 'heading',
      content: "Final Thoughts"
    },
    {
      type: 'paragraph',
      content: "Italy might not be the easiest destination for kosher travelers but it's one of the most rewarding. Few places in the world blend Jewish heritage, breathtaking landscapes, and culinary passion quite like this."
    },
    {
      type: 'paragraph',
      content: "From the Jewish Quarter of Rome to the alpine air of Canazei, from a glass of kosher Chianti in Tuscany to candlelit dinners in Venice, every stop tells a story of survival, reinvention, and joy."
    },
    {
      type: 'paragraph',
      content: "Travel here with curiosity, a bit of planning, and an open heart—you'll leave with more than great meals. You'll leave with memories steeped in both Jewish history and Italian soul."
    }
  ];

  return (
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
            <li className="text-gray-600">{articleData.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className={`px-3 py-1 rounded-full font-medium ${getCategoryColorClasses(articleData.categoryColor)}`}>
              {articleData.category}
            </span>
            <time dateTime={articleData.publishDate}>
              {formatDate(articleData.publishDate)}
            </time>
            <span>•</span>
            <span>{articleData.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4 text-gray-900">
            {articleData.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {articleData.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
          <Image
            src={articleData.heroImage}
            alt={articleData.heroImageAlt}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {/* Render sections before table */}
          {sectionsBeforeTable.map((section, index) => renderSection(section, index))}
          
          {/* Insert custom table component */}
          <div className="not-prose my-10">
            <KosherItalyTable />
          </div>
          
          {/* Render sections after table */}
          {sectionsAfterTable.map((section, index) => renderSection(section, sectionsBeforeTable.length + index))}

          {/* Call to Action */}
          <div className={`${articleData.cta.backgroundColor || 'bg-gradient-to-r from-green-50 to-indigo-50'} rounded-2xl p-6 md:p-8 mt-8`}>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {articleData.cta.title}
            </h3>
            <p className="text-gray-700 mb-4">
              {articleData.cta.description}
            </p>
            <Link 
              href={articleData.cta.buttonLink}
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              {articleData.cta.buttonText}
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
              Published by {articleData.author} on {formatDate(articleData.publishDate)}
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
  );
}

