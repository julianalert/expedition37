import { generateMetadata as generateMetadataHelper } from '@/lib/metadata'
import BlogTemplate, { createBlogMetadata } from '@/components/blog-template'
import { BlogArticleData } from '@/types/blog'

const articleData: BlogArticleData = {
  title: "Mexico Best Cenotes: A Practical Guide to the Most Beautiful Cenotes in the Yucatan Peninsula",
  description: "Discover the best cenotes in the Yucatan Peninsula with practical tips, prices, family advice, and honest reviews of the most beautiful cenotes of Mexico.",
  keywords: ["mexico best cenotes", "cenotes yucatan", "best cenotes yucatan", "cenotes in mexico", "cenotes yucatan peninsula", "gran cenote tulum", "cenote dos ojos", "cenote zaci", "cenote ik kil", "cenotes with kids mexico"],
  canonicalSlug: "mexico-best-cenotes-yucatan",

  ogImage: "/images/blog/Cenotes in Mexico.jpg",
  ogImageAlt: "Stunning turquoise cenote in the Yucatan Peninsula with dramatic light beams",

  publishDate: "2026-04-20",
  author: "Sarah S.",
  readTime: "16 min read",
  category: "Travel Itineraries",
  categoryColor: "green",

  heroImage: "/images/blog/Cenotes in Mexico.jpg",
  heroImageAlt: "Stunning turquoise cenote in the Yucatan Peninsula with dramatic light beams",
  excerpt: "The first time I climbed down into a cenote in the Yucatan Peninsula, my son asked me a very fair question. 'Papa… is this a cave or a pool?' Honestly? It felt like both.",

  sections: [
    {
      type: 'paragraph',
      content: "<em>Disclaimer: You may notice that I don't share personal photos of my family in this article. That's intentional. We travel together, but I choose not to publicly expose my children online. Their privacy matters more than content, and I prefer to keep our family moments offline.</em>"
    },
    {
      type: 'paragraph',
      content: "The first time I climbed down into a cenote in the <a href=\"https://www.trydetour.com/mexico/yucat-n-peninsula\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">Yucatan Peninsula</a>, my son asked me a very fair question."
    },
    {
      type: 'paragraph',
      content: "\"Papa… is this a cave or a pool?\""
    },
    {
      type: 'paragraph',
      content: "Honestly? It felt like both."
    },
    {
      type: 'paragraph',
      content: "We had been driving for 20 minutes on a dusty road outside Tulum. The air was heavy, humid. Then suddenly there was this wooden staircase going down into what looked like a hole in the earth. And at the bottom, the bluest water I had ever seen."
    },
    {
      type: 'paragraph',
      content: "If you are planning a trip to Mexico and searching for the best cenotes, I understand why. The cenotes in Yucatan Peninsula are one of the most unique natural experiences in the world. But not all cenotes of Mexico are equal. Some are magical. Some are overcrowded. Some are perfect with kids. Some are stressful."
    },
    {
      type: 'paragraph',
      content: "Let's talk about the real ones. The ones that work in real life."
    },

    {
      type: 'heading',
      content: 'What Are Cenotes in Mexico and Why Do They Matter?'
    },
    {
      type: 'paragraph',
      content: "Before choosing the best cenotes in the Yucatan, you need to understand what cenotes in Mexico actually are."
    },
    {
      type: 'paragraph',
      content: "Cenotes are natural sinkholes formed when limestone collapses and reveals underground freshwater pools. They are connected to an immense underground river system. According to Mexico's National Institute of Anthropology and History (INAH), the Maya considered cenotes sacred, often using them for ritual purposes."
    },
    {
      type: 'paragraph',
      content: "There are more than 6,000 documented cenotes in the Yucatan Peninsula alone, according to research by the National Autonomous University of Mexico (UNAM). That's not a marketing number. It's geological reality."
    },
    {
      type: 'paragraph',
      content: "This is why cenotes in Mexico are not just swimming spots. They are part of the cultural and ecological backbone of the region."
    },
    {
      type: 'paragraph',
      content: "And no, despite what some people search, there are no real Mexico City cenotes. If you want cenotes Yucatan Mexico style, you need to be in Quintana Roo or Yucatan state. Compared to cenotes in the United States, which exist in places like Florida but are rarely developed for tourism, Mexican cenotes are accessible, maintained, and part of the travel culture."
    },

    {
      type: 'image',
      content: '/images/blog/Kids friendly cenote.jpg',
      imageAlt: 'Kids swimming in a family-friendly open cenote in the Yucatan with clear shallow water',
      imageCaption: "Kids-friendly cenotes in the Yucatan Peninsula often feature shallow areas, easy stair access, and clear, calm water."
    },

    {
      type: 'heading',
      content: 'How to Choose the Right Cenote (Especially With Kids)'
    },
    {
      type: 'paragraph',
      content: "Here is where I speak as a father."
    },
    {
      type: 'paragraph',
      content: "A cenote can look incredible online and be a nightmare at noon with two tired children and no shade."
    },
    {
      type: 'paragraph',
      content: "Before choosing among the best cenotes in Mexico, ask yourself: Do I want easy access or adventure? Am I okay with crowds? Do I need bathrooms and lockers? Do my kids panic in dark caves?"
    },
    {
      type: 'paragraph',
      content: "There are three main types of cenotes in Yucatan Peninsula:"
    },
    {
      type: 'list',
      content: [
        "<strong>Open cenotes</strong> — Fully exposed, like natural pools. Great for families.",
        "<strong>Semi-open cenotes</strong> — Partial caves with dramatic light beams.",
        "<strong>Closed cave cenotes</strong> — Underground, darker, more intense."
      ]
    },
    {
      type: 'paragraph',
      content: "For us, open and semi-open cenotes worked best. Light reduces stress. Visibility matters when you are supervising kids."
    },

    {
      type: 'heading',
      content: 'Gran Cenote: The Safe Bet That Still Delivers'
    },
    {
      type: 'paragraph',
      content: "Gran Cenote, also called Tulum Mexico Gran Cenote, is the one everyone talks about."
    },
    {
      type: 'paragraph',
      content: "Is it crowded? Yes. Is it overhyped? A little. Is it still beautiful? Absolutely."
    },
    {
      type: 'paragraph',
      content: "We arrived at 8:15 AM. By 9:30 the parking lot was almost full. Early arrival is everything."
    },
    {
      type: 'paragraph',
      content: "The water clarity is extraordinary. You can see turtles swimming below you. There are wooden platforms for easy entry. The snorkeling here is fantastic, especially for first timers."
    },
    {
      type: 'list',
      content: [
        "Entrance fee: around $25 USD",
        "Life jackets: mandatory",
        "Best for: snorkeling and families"
      ]
    },
    {
      type: 'paragraph',
      content: "My honest take? If you want a reliable first cenote experience in the Yucatan, Gran Cenote is hard to beat. It is not wild or secret. But it works. Official site: <a href=\"https://www.grancenote.com\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">grancenote.com</a>"
    },

    {
      type: 'image',
      content: '/images/blog/Cenote dos ojos.jpg',
      imageAlt: 'Crystal clear underwater cave system at Cenote Dos Ojos in the Yucatan',
      imageCaption: "This is perhaps the most exceptional cenote, with sections that are sometimes underwater. Caution is advised for those who are not strong swimmers."
    },

    {
      type: 'heading',
      content: 'Dos Ojos: Where You Understand the Scale of the Cenotes of Mexico'
    },
    {
      type: 'paragraph',
      content: "Cenote Dos Ojos is part of one of the largest underwater cave systems in the world. The Sistema Sac Actun has been studied extensively by cave divers and <a href=\"https://www.nationalgeographic.com/science/article/mexico-underwater-cave-system\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">researchers</a>."
    },
    {
      type: 'paragraph',
      content: "This one feels different. Colder water. More cavern atmosphere. You feel like you are entering something ancient."
    },
    {
      type: 'list',
      content: [
        "Price: around $30 USD",
        "Best for: snorkeling and diving",
        "Car required"
      ]
    },
    {
      type: 'paragraph',
      content: "With kids under 6, I would hesitate. With teenagers or confident swimmers, it is incredible. You start to understand what cenotes in Mexico really are beyond Instagram."
    },

    {
      type: 'heading',
      content: "Ik Kil: Yes, It's Tourist. Yes, It's Still Stunning"
    },
    {
      type: 'paragraph',
      content: "Near Chichen Itza, Cenote Ik Kil is vertical and dramatic. Vines hang down. The opening at the top lets light pour in. It feels theatrical."
    },
    {
      type: 'list',
      content: [
        "Entrance: around $15 USD",
        "Best for: swimming and photos"
      ]
    },
    {
      type: 'paragraph',
      content: "Is it busy? Very. Especially with tour buses. But I'll say this: jumping into that deep blue water with vines above you feels like stepping into a movie scene. Official site: <a href=\"https://www.ikkil.com\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">ikkil.com</a>"
    },

    {
      type: 'heading',
      content: 'Cenote Azul: My Family Favorite'
    },
    {
      type: 'paragraph',
      content: "If you want one of the best cenotes in the Yucatan for kids, Cenote Azul near Playa del Carmen is a strong candidate."
    },
    {
      type: 'paragraph',
      content: "Open layout. Multiple shallow areas. You can move around easily. Less cave intensity."
    },
    {
      type: 'list',
      content: [
        "Entrance: $12–15 USD",
        "Accessibility: easy by car"
      ]
    },
    {
      type: 'paragraph',
      content: "This is where my kids stayed longest. No fear. Just swimming and jumping from small rocks. It may not be the most dramatic cenote in Mexico. But sometimes practicality wins."
    },

    {
      type: 'image',
      content: '/images/blog/cenote zaci.jpg',
      imageAlt: 'Cenote Zaci in Valladolid with dramatic rocky walls and turquoise water below',
      imageCaption: "The most fun for families is swinging on a vine and landing in the middle of the pool."
    },

    {
      type: 'heading',
      content: 'Cenote Zaci: The Easy One in Valladolid That Surprised Me'
    },
    {
      type: 'paragraph',
      content: "If you are staying in Valladolid, Cenote Zaci is probably the most convenient cenote you can visit."
    },
    {
      type: 'paragraph',
      content: "It is literally inside the town. No dusty road. No jungle track. No complicated logistics. You park, walk a few steps, and you're there."
    },
    {
      type: 'paragraph',
      content: "After visiting more remote cenotes in the Yucatan Peninsula, this felt almost too easy. But sometimes easy is exactly what you need."
    },
    {
      type: 'paragraph',
      content: "Cenote Zaci is semi-open. Part of it is covered by rock, part of it is exposed to the sky. The light inside changes throughout the day, which makes it surprisingly beautiful."
    },
    {
      type: 'list',
      content: [
        "Entrance fee: around $3–5 USD",
        "Accessibility: walkable from Valladolid center",
        "Best for: short visits, budget travelers, families"
      ]
    },
    {
      type: 'paragraph',
      content: "The water is slightly darker than places like Gran Cenote, but still clear enough for swimming. There are steps and platforms, making access manageable with kids."
    },
    {
      type: 'paragraph',
      content: "Is it the most dramatic of all the cenotes of Mexico? No. But here's what I liked: it feels local. You will see Mexican families swimming. Teenagers jumping. Less of the \"tour bus energy\" compared to more famous cenotes in Mexico."
    },
    {
      type: 'paragraph',
      content: "If you are visiting Chichen Itza or Ek Balam and staying overnight in Valladolid, Cenote Zaci is one of the most practical cenotes in Yucatan Peninsula to include without adding stress."
    },

    {
      type: 'heading',
      content: 'Cenote Suytun: Beautiful but Limited'
    },
    {
      type: 'paragraph',
      content: "You have seen the photos. The stone platform. The light beam. Suytun is beautiful. But it is controlled. Timed entries. Short visits."
    },
    {
      type: 'paragraph',
      content: "Price: around $15 USD. Great for photography. Less for long swims. If you care about pictures, yes. If you want to relax for hours, probably not."
    },

    {
      type: 'heading',
      content: 'Cenote Xcanche: The Balanced Choice'
    },
    {
      type: 'paragraph',
      content: "Near Ek Balam ruins, Cenote Xcanche felt calmer. Less crowded. Affordable. Rustic but organized. Entrance: $8–12 USD. After visiting Ek Balam, swimming here felt like a reward."
    },

    {
      type: 'heading',
      content: 'What Real People Say (Reddit & Forums)'
    },
    {
      type: 'paragraph',
      content: "Reading Reddit threads about cenotes in the Yucatan Peninsula, a pattern emerges."
    },
    {
      type: 'list',
      content: [
        "\"Go early or don't go.\"",
        "\"Rent a car.\"",
        "\"Secret cenotes are not always better.\""
      ]
    },
    {
      type: 'paragraph',
      content: "One user wrote: \"We tried finding hidden cenotes and spent more time driving bad roads than swimming.\" That matches our experience. The well known cenotes in Mexico are often better maintained."
    },
    {
      type: 'paragraph',
      content: "Some great Reddit threads: <a href=\"https://www.reddit.com/r/playadelcarmen/comments/1qma9m9/cenote_advice/\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">Cenote advice (r/playadelcarmen)</a> · <a href=\"https://www.reddit.com/r/playadelcarmen/comments/1mt7lnr/just_spent_10_years_exploring_hidden_cenotes_near/\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">10 years exploring hidden cenotes</a> · <a href=\"https://www.reddit.com/r/tulum/comments/1ku2ha6/which_cenotes_to_visit/\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">Which cenotes to visit (r/tulum)</a>"
    },

    {
      type: 'image',
      content: '/images/blog/Tacos al pastor.jpg',
      imageAlt: 'Tacos al pastor being served from a traditional trompo in Mexico',
      imageCaption: "Yucatan also offers the opportunity to taste the best tacos of your life, including tacos al pastor."
    },

    {
      type: 'heading',
      content: 'Local Guide Insight'
    },
    {
      type: 'paragraph',
      content: "I spoke with a local guide named Luis near Tulum. He told me:"
    },
    {
      type: 'quote',
      content: "Tourists try to visit five cenotes in one day. They end up tired. One good cenote in the morning is enough."
    },
    {
      type: 'paragraph',
      content: "He recommends alternating: ruins one day, cenotes the next. Makes sense."
    },

    {
      type: 'heading',
      content: 'How Much Do Cenotes in Mexico Cost?'
    },
    {
      type: 'paragraph',
      content: "Most cenotes in the Yucatan Peninsula cost between $10 and $35 USD. Budget around $30–40 USD per person per cenote including extras like locker rental, snorkel gear, and parking."
    },

    {
      type: 'heading',
      content: 'Quick Comparison Table'
    },
    {
      type: 'html',
      content: `<div class="cenotes-table-wrapper">
  <table class="cenotes-comparison">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price (USD)</th>
        <th>Accessibility</th>
        <th>Best For</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Gran Cenote</strong></td>
        <td>$25</td>
        <td>Car / Bike</td>
        <td>Snorkeling</td>
        <td>⭐ 4.5</td>
      </tr>
      <tr>
        <td><strong>Dos Ojos</strong></td>
        <td>$30</td>
        <td>Car</td>
        <td>Diving</td>
        <td>⭐ 4.7</td>
      </tr>
      <tr>
        <td><strong>Ik Kil</strong></td>
        <td>$15</td>
        <td>Car / Bus</td>
        <td>Swimming / Photos</td>
        <td>⭐ 4.3</td>
      </tr>
      <tr>
        <td><strong>Cenote Azul</strong></td>
        <td>$12</td>
        <td>Car</td>
        <td>Families</td>
        <td>⭐ 4.6</td>
      </tr>
      <tr>
        <td><strong>Suytun</strong></td>
        <td>$15</td>
        <td>Car</td>
        <td>Pictures</td>
        <td>⭐ 4.0</td>
      </tr>
      <tr>
        <td><strong>Zaci</strong></td>
        <td>$3–5</td>
        <td>On foot</td>
        <td>Budget / Families</td>
        <td>⭐ 4.2</td>
      </tr>
      <tr>
        <td><strong>Xcanche</strong></td>
        <td>$10</td>
        <td>Car / Bike</td>
        <td>Relaxed swim</td>
        <td>⭐ 4.4</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.cenotes-table-wrapper {
  overflow-x: auto;
  margin: 2rem 0;
}

.cenotes-comparison {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.cenotes-comparison th {
  background-color: #0e6b5e;
  color: white;
  padding: 0.875rem 1rem;
  text-align: left;
  font-weight: 600;
}

.cenotes-comparison td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}

.cenotes-comparison tbody tr:hover {
  background-color: #f0fdf9;
}

@media (max-width: 640px) {
  .cenotes-comparison th,
  .cenotes-comparison td {
    padding: 0.5rem 0.625rem;
    font-size: 0.875rem;
  }
}
</style>`
    },

    {
      type: 'heading',
      content: 'FAQ About Cenotes in Mexico'
    },
    {
      type: 'paragraph',
      content: "I get some of these questions all the time. From friends. From readers. From parents planning their first trip to the cenotes in Yucatan Peninsula."
    },

    {
      type: 'heading3',
      content: 'What are cenotes in Mexico exactly?'
    },
    {
      type: 'paragraph',
      content: "Cenotes are natural sinkholes formed when limestone collapses and exposes underground freshwater pools. They are part of a vast underground river system that runs through the Yucatan Peninsula. But culturally, they are much more. The Maya considered cenotes sacred. Archaeologists from INAH have found offerings, ceramics, and even human remains in some cenotes, particularly near Chichen Itza. They are geological wonders and historical sites at the same time."
    },

    {
      type: 'heading3',
      content: 'Where are the cenotes in Mexico?'
    },
    {
      type: 'paragraph',
      content: "Almost all of the famous cenotes of Mexico are located in the Yucatan Peninsula, specifically in Quintana Roo (Tulum, Playa del Carmen, Cancun area), Yucatan state (Valladolid, Merida area), and parts of Campeche. There are no real Mexico City cenotes. If you're flying into Cancun, that's your gateway to the best cenotes in the Yucatan."
    },

    {
      type: 'heading3',
      content: 'How many cenotes are there in Mexico?'
    },
    {
      type: 'paragraph',
      content: "There are more than 6,000 documented cenotes in the Yucatan Peninsula, according to studies from UNAM and regional geological surveys. Not all are open to the public. Many are on private land. Some are used only by local communities. But the number itself gives perspective."
    },

    {
      type: 'heading3',
      content: 'Are cenotes safe to swim in?'
    },
    {
      type: 'paragraph',
      content: "Yes, generally. The cenotes in Mexico are freshwater and naturally filtered through limestone. Many are tested and regulated if they are tourist sites. That said: always follow rules, wear life jackets when required, watch your children carefully, and respect depth markers. Open cenotes like Cenote Azul are easier for families. Deep cave cenotes like Dos Ojos require more attention."
    },

    {
      type: 'heading3',
      content: 'Are cenotes safe with kids?'
    },
    {
      type: 'paragraph',
      content: "Yes, but choose wisely. Open cenotes with shallow sections are ideal. Avoid narrow ladders if you have toddlers. Bring water shoes for rocky entrances. My personal rule: if access feels stressful before getting in the water, it will not be relaxing once inside."
    },

    {
      type: 'heading3',
      content: 'What is the best time to visit cenotes in the Yucatan?'
    },
    {
      type: 'paragraph',
      content: "Early morning. Always. Between 8:00 and 10:00 AM is ideal. After 11:00, tour buses arrive at popular cenotes like Gran Cenote and Ik Kil. Dry season (November to April) is generally more comfortable, but cenotes in Yucatan Peninsula are accessible year-round. More info <a href=\"https://www.trydetour.com/mexico/yucat-n-peninsula/best-time-to-visit\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">here</a>."
    },

    {
      type: 'heading3',
      content: 'Should I book cenote tours or go independently?'
    },
    {
      type: 'paragraph',
      content: "Cenote tours are convenient if you don't want to rent a car, prefer guided explanations, or want to combine 3–4 cenotes in one day. But tours are more expensive and less flexible. If you are comfortable driving, renting a car gives you control over timing, which is crucial for avoiding crowds."
    },

    {
      type: 'heading3',
      content: 'Are cenotes better than beaches?'
    },
    {
      type: 'paragraph',
      content: "Different experience. Beaches in Riviera Maya are about waves, sun, and open space. Cenotes in the Yucatan are about stillness, cool freshwater, and unique landscapes. Personally, I prefer alternating. Beach one day. Cenote the next."
    },

    {
      type: 'heading3',
      content: 'What to Bring When Visiting a Cenote'
    },
    {
      type: 'paragraph',
      content: "After a few cenotes in the Yucatan Peninsula, including one where we forgot half the useful stuff, I've learned something simple: preparation changes everything. Here's the practical checklist I now go through before leaving the hotel."
    },
    {
      type: 'list',
      content: [
        "<strong>Swimsuit already on</strong> — Changing areas at cenotes in Mexico are sometimes basic, sometimes crowded. Arriving in your swimsuit saves time and avoids stress.",
        "<strong>Light clothes that dry fast</strong> — You will be humid and slightly wet after. Avoid heavy cotton.",
        "<strong>Biodegradable sunscreen (or none)</strong> — Most cenotes of Mexico forbid regular sunscreen to protect the ecosystem. When in doubt, rely on shade and early arrival.",
        "<strong>Water shoes</strong> — Many cenotes in Yucatan Peninsula have rocky, uneven, or slippery entrances. Especially useful with children.",
        "<strong>Microfiber towel</strong> — Quick-dry towels are perfect. Regular beach towels become heavy and stay wet in the car.",
        "<strong>Cash in small bills</strong> — Many cenotes in Mexico do not accept credit cards. Bring small bills for entrance, lockers, and parking.",
        "<strong>Dry bag or waterproof pouch</strong> — For phone, car keys, and wallet. A dry bag means you can keep valuables near you.",
        "<strong>Snorkel mask</strong> — Some cenotes have crystal clear visibility. Bringing your own avoids rental fees and fits better.",
        "<strong>Reusable water bottle</strong> — The heat in the Yucatan can surprise you. Stay hydrated.",
        "<strong>Simple snacks</strong> — Especially if traveling with kids. Most cenotes do not have full restaurants.",
        "<strong>Change of clothes</strong> — Driving back in wet clothes is uncomfortable. Bring something dry.",
        "<strong>Plastic bag for wet items</strong> — Your car will thank you.",
        "<strong>Small first-aid basics</strong> — Just band-aids in case of small scrapes on rocks.",
        "<strong>Patience</strong> — Cenotes in Yucatan Peninsula are natural spaces. Access may be rustic. The beauty comes from that simplicity."
      ]
    },
    {
      type: 'paragraph',
      content: "And one last thing: <strong>go early.</strong> If you arrive at 8:30 AM, many of the best cenotes in Mexico feel calm and almost private. Arrive at noon, and the same place feels completely different."
    },

    {
      type: 'heading',
      content: 'Final Thoughts'
    },
    {
      type: 'paragraph',
      content: "The cenotes of Mexico are not about checking boxes. They are about rhythm."
    },
    {
      type: 'paragraph',
      content: "Go early. Choose fewer. Stay longer."
    },
    {
      type: 'paragraph',
      content: "And if your child asks whether it is a cave or a pool, just tell them the truth."
    },
    {
      type: 'paragraph',
      content: "It is both. And that is what makes the cenotes in Yucatan Peninsula unforgettable."
    }
  ],

  cta: {
    title: "Plan Your Yucatan Cenote Adventure",
    description: "Discover the best cenotes, ruins, and beaches in the Yucatan Peninsula — with practical tips for families, couples, and first-time visitors.",
    buttonText: "Explore the Yucatan Peninsula",
    buttonLink: "https://www.trydetour.com/mexico/yucat-n-peninsula"
  }
}

const metadataConfig = createBlogMetadata(articleData)
export const metadata = generateMetadataHelper(metadataConfig)

export default function MexicoCenotesPage() {
  return <BlogTemplate articleData={articleData} />
}
