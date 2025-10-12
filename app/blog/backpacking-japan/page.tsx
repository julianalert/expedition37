import { generateMetadata as generateMetadataHelper } from '@/lib/metadata'
import { createBlogMetadata } from '@/components/blog-template'
import { BlogArticleData, BlogSection } from '@/types/blog'
import BackpackingJapanCostTable from '@/components/BackpackingJapanCostTable'
import JapanEventsTable from '@/components/JapanEventsTable'
import JapanBackpackerSpots from '@/components/JapanBackpackerSpots'
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
  title: "Can You Backpack in Japan? A Complete Guide to Costs, Itineraries, and Tips",
  description: "Can you backpack in Japan? Learn how much it costs, how to prepare, where to go, and the best itineraries for budget travelers.",
  keywords: ["backpacking Japan", "Japan budget travel", "Japan itinerary", "cheap travel Japan", "Japan backpacker", "JR Pass", "Japan hostels", "Tokyo backpacking", "Kyoto travel", "Japan travel guide"],
  canonicalSlug: "backpacking-japan",
  
  ogImage: "/images/blog/Backpacking Japan Guide .jpg",
  ogImageAlt: "Backpacker exploring Japan's temples and cities on a budget",
  
  publishDate: "2025-10-08",
  author: "Sarah S. Team",
  readTime: "15 min read",
  category: "Backpacking",
  categoryColor: "blue",
  
  heroImage: "/images/blog/Backpacking Japan Guide .jpg",
  heroImageAlt: "Backpacker exploring Japan's temples and cities on a budget",
  excerpt: "Can you backpack in Japan? Absolutely. Learn how much it costs, how to prepare, where to go, and the best itineraries for independent travelers.",
  
  sections: [
    {
      type: 'heading',
      content: "Can You Backpack in Japan?"
    },
    {
      type: 'paragraph',
      content: "Absolutely. You can backpack in Japan, but it looks a little different than in Southeast Asia. Don't expect $3 hostels and $1 pad thai. Instead, picture capsule hotels, cheap convenience store meals, and bullet trains that run on the second."
    },
    {
      type: 'paragraph',
      content: "Backpacking in Tokyo is possible, you'll lean on hostels, Airbnbs, and internet cafés for affordable stays. Out in the countryside, you'll find guesthouses (minshuku), hostels, and even free campsites. Some travelers even try \"wild camping\" in rural areas, though you'll want to check local rules."
    },
    {
      type: 'paragraph',
      content: "So, can you backpack in Japan? Yes. It's not dirt cheap, but it's one of the most rewarding countries for independent travelers."
    },
    {
      type: 'heading',
      content: "How Much Does It Cost to Backpack Japan?"
    },
    {
      type: 'paragraph',
      content: "Japan has a reputation for being expensive, but a little planning goes a long way. The big costs are transport and accommodation. Food, surprisingly, can be cheap if you use convenience stores and ramen shops."
    },
    {
      type: 'paragraph',
      content: "Here's a rough budget breakdown per day:"
    }
  ],
  
  cta: {
    title: "Plan Your Japan Adventure",
    description: "Ready to explore Japan? Use our destination finder to discover the best places to visit, when to go, and how to make the most of your backpacking adventure.",
    buttonText: "Explore Japan",
    buttonLink: "https://www.trydetour.com/japan"
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
export default function BackpackingJapanPage() {
  // Split sections: content before first table
  const sectionsBeforeFirstTable = articleData.sections;
  
  // Content after first table (cost table) and before events table
  const sectionsAfterCostTable: BlogSection[] = [
    {
      type: 'paragraph',
      content: "A <a href=\"https://www.reddit.com/r/backpacking/comments/1bg8zxl/backpacking_in_japan/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Reddit traveler</a> summed it up well: \"I spent around $1800 for a month. Not Southeast Asia cheap, but if you eat at 7-Eleven, ride buses, and stay in dorms, it's manageable.\""
    },
    {
      type: 'heading',
      content: "Money-Saving Tips for Backpackers"
    },
    {
      type: 'list',
      content: [
        "<strong>Eat at convenience stores:</strong> 7-Eleven, FamilyMart, and Lawson have bento boxes, onigiri, and noodles for ¥300–¥600 ($2–$5). Healthier and cheaper than restaurants.",
        "<strong>Try gyudon chains:</strong> Places like Sukiya or Matsuya serve rice bowls for ¥400–¥600 ($3–$5). Perfect fuel for long walking days.",
        "<strong>Skip the Rail Pass if you're slow-traveling:</strong> If you only visit 2–3 cities, local or night buses are far cheaper than the nationwide JR Pass. A Tokyo → Kyoto bus is $30 vs nearly $100 on the bullet train.",
        "<strong>Take night buses:</strong> They save one night of accommodation while moving you between cities. Companies like Willer Express have English booking sites.",
        "<strong>Stay in hostels with free breakfast:</strong> Many include toast, eggs, or rice. That's one meal off your budget.",
        "<strong>Use manga cafés in emergencies:</strong> Not glamorous, but for $12–$18 you get Wi-Fi, drinks, and a reclining chair.",
        "<strong>Book through Japanese hostel sites:</strong> Sites like Rakuten Travel sometimes show lower prices than Booking.com.",
        "<strong>Carry a reusable bottle:</strong> Tap water is clean and free. Buying bottled water at ¥120 a pop adds up over weeks."
      ]
    },
    {
      type: 'heading',
      content: "Preparing for Your Backpacking Trip"
    },
    {
      type: 'paragraph',
      content: "Backpacking Japan isn't like heading into the Himalayas with a tent and dehydrated meals. It's a mix of high-tech cities and rural villages, and you'll be moving constantly between trains, hostels, temples, and onsens. That means what you pack--and how you pack it--can make or break your trip."
    },
    {
      type: 'paragraph',
      content: "Here's what seasoned travelers recommend:"
    },
    {
      type: 'heading3',
      content: "Versatile, Lightweight Clothing"
    },
    {
      type: 'paragraph',
      content: "Japan has four distinct seasons, so your clothing will depend on timing. In spring and autumn, think layers: 2 pairs of shorts or light trousers, 3–5 t-shirts, and a thin sweater or fleece for evenings. In winter, you'll want thermal layers and a real jacket (Japan can hit freezing). In summer, it's humid so breathable fabrics are your best friend. Don't forget a rain jacket or poncho if you're traveling in the June–July rainy season."
    },
    {
      type: 'paragraph',
      content: "The golden rule: pack things you can mix and match, wash in a hostel sink, and wear multiple times. Japanese laundromats are cheap and easy, so you don't need 14 outfits."
    },
    {
      type: 'heading3',
      content: "The Backpack Itself"
    },
    {
      type: 'paragraph',
      content: "Bullet trains have limited luggage space, so a 40–50L backpack is perfect. Anything larger and you'll struggle squeezing through busy Tokyo stations. Look for one with front access, digging from the top in a crowded train aisle is no fun. A small daypack for exploring cities or hikes is also worth carrying."
    },
    {
      type: 'heading3',
      content: "Shoes That Can Handle Miles"
    },
    {
      type: 'paragraph',
      content: "You'll walk more in Japan than almost anywhere else. From Tokyo station transfers to temple trails in Kyoto, expect 15,000-20,000 steps daily. A solid pair of walking shoes or trail runners is essential. Pack flip-flops or slides too for hostel showers, onsens, or simply giving your feet a break."
    },
    {
      type: 'heading3',
      content: "Tech & Power Essentials"
    },
    {
      type: 'list',
      content: [
        "<strong>Adaptor:</strong> Japan uses Type A/B plugs at 100 volts. If you're from Europe or Asia, you'll definitely need an adaptor.",
        "<strong>Portable charger:</strong> Google Maps and translation apps drain batteries fast. Bring a power bank--it will save you on long train rides.",
        "<strong>eSIM or SIM card:</strong> Many foreign SIMs don't work. Grab an eSIM before arrival or pick up a local one at the airport. Japan Wireless is a popular choice."
      ]
    },
    {
      type: 'heading3',
      content: "Toiletries & Health"
    },
    {
      type: 'paragraph',
      content: "Japanese pharmacies are excellent but often labeled only in Japanese. A few things are worth packing from home:"
    },
    {
      type: 'list',
      content: [
        "<strong>Tampons:</strong> Pads are more common, tampons less so. Bring your own if you use them.",
        "<strong>Sunscreen:</strong> Japanese sunscreen is great, but many brands include whitening agents you may not want.",
        "<strong>Basic meds:</strong> Painkillers, antihistamines, or anything prescription."
      ]
    },
    {
      type: 'paragraph',
      content: "Onsens and public baths require you to bring a small towel. Most hostels rent them, but it's cheaper to carry your own."
    },
    {
      type: 'heading3',
      content: "Extras That Make a Difference"
    },
    {
      type: 'list',
      content: [
        "<strong>Reusable water bottle:</strong> Japan's tap water is clean, safe, and available everywhere.",
        "<strong>Camera:</strong> Your phone works fine, but a camera helps capture temple interiors or night scenes better.",
        "<strong>Card game or small social item:</strong> Backpackers in Japan often bond in hostels or capsule lounges. Something like Uno or Monopoly Deal goes a long way when breaking the ice.",
        "<strong>Notebook or pen:</strong> Many travelers jot down train times or notes since Wi-Fi isn't everywhere. Plus, it feels good to keep a travel log."
      ]
    },
    {
      type: 'heading3',
      content: "Cultural Packing Tip"
    },
    {
      type: 'paragraph',
      content: "Bring socks. Lots of them. You'll be taking your shoes off constantly: temples, guesthouses, even some restaurants. Having clean socks matters more in Japan than almost anywhere else."
    },
    {
      type: 'image',
      content: '/images/blog/Japan in autumn .jpg',
      imageAlt: 'Japanese temple surrounded by vibrant autumn foliage',
      imageCaption: 'Autumn in Japan offers stunning foliage and comfortable temperatures for backpacking.'
    },
    {
      type: 'heading',
      content: "When to Go in Japan"
    },
    {
      type: 'paragraph',
      content: "Timing is important, especially given the <a href=\"https://www.trydetour.com/japan/best-time-to-visit\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">changes in temperature</a> over the months."
    },
    {
      type: 'paragraph',
      content: "Spring (March–May) is magical with cherry blossoms, mild weather, and hanami picnics. Autumn (September–November) is cooler, with fiery maple leaves in Kyoto, Nikko, and Hokkaido."
    },
    {
      type: 'paragraph',
      content: "Winter is great for skiing in Hokkaido but cold and more expensive in cities. Summer has vibrant festivals like Gion Matsuri, but prepare for heat and humidity."
    }
  ];

  // Content after events table and before spots table
  const sectionsAfterEventsTable: BlogSection[] = [
    {
      type: 'image',
      content: '/images/blog/Capsule hotel.jpg',
      imageAlt: 'Modern capsule hotel interior with individual sleeping pods',
      imageCaption: 'Capsule hotels offer a uniquely Japanese and affordable accommodation experience.'
    },
    {
      type: 'heading',
      content: "Transportation and Accommodation for Backpackers"
    },
    {
      type: 'paragraph',
      content: "Getting around Japan is part of the adventure — but also one of the biggest drains on your budget. Here's how to think about it:"
    },
    {
      type: 'heading3',
      content: "Trains: Fast but Pricey"
    },
    {
      type: 'paragraph',
      content: "Japan's train system is world-famous for a reason. The Shinkansen (bullet trains) connect Tokyo, Kyoto, Osaka, Hiroshima, and beyond with speed and comfort. But they're not cheap: Tokyo → Kyoto on the Nozomi service costs about ¥14,000 (~$95) one way. That adds up fast if you're city-hopping."
    },
    {
      type: 'paragraph',
      content: "👉 If you're covering multiple regions, consider a Japan Rail Pass. A 7-day nationwide pass currently costs about ¥50,000 (~$330). It sounds steep, but if you take just two or three long rides (say, Tokyo → Kyoto → Hiroshima → Tokyo), you'll break even. <a href=\"https://japanrailpass.net/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Check Japan Rail Pass prices here</a>."
    },
    {
      type: 'paragraph',
      content: "If you're focusing on one area, <a href=\"https://www.jreast.co.jp/multi/en/passes.html\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">regional passes</a> like the JR East Pass (good for Tokyo + Nikko + Tohoku) or JR Kansai Pass (Kyoto, Osaka, Nara) are much cheaper and more flexible. JR East regional passes start around ¥20,000 (~$130) for 5 days of unlimited travel."
    },
    {
      type: 'heading3',
      content: "Buses: Cheap but Slower"
    },
    {
      type: 'paragraph',
      content: "If you're not in a hurry, buses are your best friend. A night bus from Tokyo to Kyoto costs about ¥5,000 (~$30) and doubles as a night's accommodation. Companies like <a href=\"https://willerexpress.com/en/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Willer Express</a> even have English booking sites and offer bus passes that cover unlimited trips over several days."
    },
    {
      type: 'paragraph',
      content: "Example:"
    },
    {
      type: 'list',
      content: [
        "Tokyo → Osaka night bus = 8 hours, ¥5,000–8,000 (~$30–$55).",
        "Tokyo → Sendai bus = 5 hours, ~¥4,000 (~$27)."
      ]
    },
    {
      type: 'paragraph',
      content: "You'll save a lot, but you'll sacrifice sleep quality compared to a capsule bed or train."
    },
    {
      type: 'heading3',
      content: "Local Transport: Subways and IC Cards"
    },
    {
      type: 'paragraph',
      content: "In cities, subways and local trains are efficient and safe. A single ride is usually ¥200–¥350 (~$1.50–$2.50). The easiest way to pay is with a rechargeable IC card like Suica or Pasmo in Tokyo, or Icoca in Kansai. You can even use these cards in convenience stores."
    },
    {
      type: 'paragraph',
      content: "👉 Quick tip: you can now add Suica/Pasmo to Apple Wallet or Google Pay and skip the physical card entirely."
    },
    {
      type: 'heading3',
      content: "Accommodation for Backpackers"
    },
    {
      type: 'paragraph',
      content: "Japan doesn't have $3 dorm beds like Thailand, but you'll still find budget-friendly options if you know where to look."
    },
    {
      type: 'list',
      content: [
        "<strong>Hostels:</strong> Expect ¥2,500–¥4,000 ($17–$27) per night in big cities. Clean, modern, and social. Example: K's House Hostel chain (Tokyo, Kyoto, Hiroshima).",
        "<strong>Capsule Hotels:</strong> A very Japanese experience. You get a private pod with shared facilities. Prices range ¥3,000–¥5,000 ($20–$35). Example: Nine Hours capsule hotels, known for futuristic design.",
        "<strong>Manga Cafés (Net Cafés):</strong> Quirky and cheap. For ¥1,500–¥2,500 ($10–$17), you get a reclining chair or small cubicle, unlimited Wi-Fi, and free soft drinks. Not luxurious, but handy for one or two nights. <a href=\"https://manboo.co.jp/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Manboo</a> is a popular chain.",
        "<strong>Guesthouses & Minshuku:</strong> Family-run lodgings often found in smaller towns. Prices vary ¥4,000–¥6,000 ($27–$40), sometimes with meals included. Great for cultural immersion.",
        "<strong>Airbnb:</strong> Common in cities like Tokyo and Osaka, but prices usually start higher (~$40–$70 per night for a private room)."
      ]
    },
    {
      type: 'paragraph',
      content: "A Reddit traveler put it bluntly: \"I slept in manga cafés three nights. Honestly not bad. Wi-Fi, free drinks, and a reclining chair - cheaper than Tokyo hostels.\""
    },
    {
      type: 'heading3',
      content: "Backpacker Strategy"
    },
    {
      type: 'paragraph',
      content: "Mix and match. Use hostels for socializing, capsules for novelty, and night buses to save cash. If you're traveling rural Japan, try a minshuku to experience Japanese hospitality."
    },
    {
      type: 'image',
      content: '/images/blog/Kinkakuji temple.jpg',
      imageAlt: 'Kinkaku-ji golden temple in Kyoto reflected in pond',
      imageCaption: 'Kinkaku-ji temple in Kyoto is a must-see for any backpacker exploring Japan.'
    },
    {
      type: 'heading',
      content: "Must-See Destinations for Backpackers"
    },
    {
      type: 'paragraph',
      content: "There are <a href=\"https://www.trydetour.com/japan/best-places-to-visit\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">so many great places to visit</a> but backpacking in Japan isn't just about ticking off cities, it's about chasing contrasts. Neon nights in Shinjuku followed by quiet bamboo trails in Arashiyama. Slurping ramen at 2 a.m., then feeding deer under temple roofs older than most countries. The shortlist below covers the classics, but with a backpacker lens, what it feels like, when to go, and how long to stay so you don't rush the good parts."
    }
  ];

  // Content after spots table to end
  const sectionsAfterSpotsTable: BlogSection[] = [
    {
      type: 'image',
      content: '/images/blog/Nikko .jpg',
      imageAlt: 'Nikko waterfall surrounded by lush green forest',
      imageCaption: 'Nikko offers stunning natural beauty and historic shrines just a day trip from Tokyo.'
    },
    {
      type: 'heading',
      content: "Sample Itineraries"
    },
    {
      type: 'heading3',
      content: "2 Weeks: Tokyo and Surroundings"
    },
    {
      type: 'paragraph',
      content: "If you only have 14 days, stick close to Tokyo and take side trips. It's cheaper, less exhausting, and still rich in variety."
    },
    {
      type: 'list',
      content: [
        "<strong>Day 1–3:</strong> <a href=\"https://www.trydetour.com/japan/tokyo\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Tokyo</a>. Explore Shibuya crossing, Asakusa temples, and quirky neighborhoods like Shimokitazawa. Nightlife in Shinjuku is a must.",
        "<strong>Day 4:</strong> Nikko. Mountains, waterfalls, and shrines. Easy train ride from Tokyo.",
        "<strong>Day 5–6:</strong> Kamakura and <a href=\"https://www.trydetour.com/japan/yokohama\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Yokohama</a>. Coastal hikes, the Great Buddha, and Chinatown.",
        "<strong>Day 7–9:</strong> <a href=\"https://www.trydetour.com/japan/hakone\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Hakone</a> and <a href=\"https://www.trydetour.com/japan/fuji-five-lakes\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Mount Fuji area</a>. Hot springs, open-air museums, and Fuji views.",
        "<strong>Day 10–12:</strong> Back in Tokyo. Check Akihabara's arcades, Harajuku fashion, and Tsukiji markets.",
        "<strong>Day 13–14:</strong> Free days. Use them to wander, revisit favorite spots, or take a day trip you missed."
      ]
    },
    {
      type: 'heading3',
      content: "1 Month: Across Japan"
    },
    {
      type: 'paragraph',
      content: "With 30 days, you can take the classic trail--Tokyo down through Kansai, then west to Hiroshima, and finally up to Hokkaido."
    },
    {
      type: 'list',
      content: [
        "<strong>Day 1–4:</strong> <a href=\"https://www.trydetour.com/japan/tokyo\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Tokyo</a>. Neighborhood-hopping, temples, food, nightlife.",
        "<strong>Day 5–7:</strong> <a href=\"https://www.trydetour.com/japan/kyoto\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Kyoto</a>. Shrines, bamboo forests, and tea ceremonies.",
        "<strong>Day 8–9:</strong> Nara. Day trips to feed deer and explore ancient temples.",
        "<strong>Day 10–12:</strong> <a href=\"https://www.trydetour.com/japan/osaka\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Osaka</a>. Dive into street food culture.",
        "<strong>Day 13–15:</strong> <a href=\"https://www.trydetour.com/japan/hiroshima\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 underline hover:text-blue-800\">Hiroshima</a> & Miyajima. Peace Memorial and island hiking.",
        "<strong>Day 16–20:</strong> Kyushu (Fukuoka & Beppu). Foodie scene plus hot springs.",
        "<strong>Day 21–27:</strong> Hokkaido. Sapporo, mountain hikes, onsens, and nature trails.",
        "<strong>Day 28–30:</strong> Return to Tokyo. Shopping, nightlife, and a final ramen crawl."
      ]
    },
    {
      type: 'paragraph',
      content: "This route balances major cities with countryside escapes--and gives you space to slow down."
    },
    {
      type: 'heading',
      content: "Final Thoughts"
    },
    {
      type: 'paragraph',
      content: "Backpacking Japan isn't \"cheap\" in the Southeast Asia sense, but it's absolutely possible. With a bit of planning, you can eat for $7, sleep for $20, and still explore temples, onsens, and neon streets that feel like another world."
    },
    {
      type: 'paragraph',
      content: "Yes, you can backpack in Japan. Yes, it costs a little more. But if you time it right and travel light, you'll come home with stories that feel priceless--from ramen at 2 a.m. to maple leaves glowing red in Kyoto."
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
          {/* Render sections before first table */}
          {sectionsBeforeFirstTable.map((section, index) => renderSection(section, index))}
          
          {/* Insert cost table */}
          <div className="not-prose my-10">
            <BackpackingJapanCostTable />
          </div>
          
          {/* Render sections after cost table */}
          {sectionsAfterCostTable.map((section, index) => renderSection(section, sectionsBeforeFirstTable.length + index))}
          
          {/* Insert events table */}
          <div className="not-prose my-10">
            <JapanEventsTable />
          </div>
          
          {/* Render sections after events table */}
          {sectionsAfterEventsTable.map((section, index) => renderSection(section, sectionsBeforeFirstTable.length + sectionsAfterCostTable.length + index))}
          
          {/* Insert spots table */}
          <div className="not-prose my-10">
            <JapanBackpackerSpots />
          </div>
          
          {/* Render sections after spots table */}
          {sectionsAfterSpotsTable.map((section, index) => renderSection(section, sectionsBeforeFirstTable.length + sectionsAfterCostTable.length + sectionsAfterEventsTable.length + index))}

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

