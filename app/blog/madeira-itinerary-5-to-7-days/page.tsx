import { generateMetadata as generateMetadataHelper } from '@/lib/metadata'
import BlogTemplate, { createBlogMetadata } from '@/components/blog-template'
import { BlogArticleData } from '@/types/blog'

const articleData: BlogArticleData = {
  title: "Madeira Itinerary: 5 to 7 Days That Actually Work",
  description: "Planning a Madeira itinerary? Discover a realistic plan with hikes, family tips, costs, and honest advice on how many days in Madeira you really need.",
  keywords: ["madeira itinerary", "madeira 5 days", "one week madeira", "madeira with kids", "madeira hiking", "madeira travel guide", "how many days madeira", "madeira portugal itinerary"],
  canonicalSlug: "madeira-itinerary-5-to-7-days",

  ogImage: "/images/blog/Madeira itinerary.jpg",
  ogImageAlt: "Dramatic green cliffs and ocean views of Madeira island",

  publishDate: "2026-05-12",
  author: "Sarah S.",
  readTime: "14 min read",
  category: "Travel Itineraries",
  categoryColor: "green",

  heroImage: "/images/blog/Madeira itinerary.jpg",
  heroImageAlt: "Dramatic green cliffs and ocean views of Madeira island",
  excerpt: "Madeira looks tiny on a map. It is not tiny when you're driving it with a child asking 'Are we there yet?' while you're climbing a mountain road that feels vertical.",

  sections: [
    {
      type: 'paragraph',
      content: "I'll say this first."
    },
    {
      type: 'paragraph',
      content: "Madeira looks tiny on a map. It is not tiny when you're driving it with a child asking \"Are we there yet?\" while you're climbing a mountain road that feels vertical."
    },
    {
      type: 'paragraph',
      content: "I went to Madeira before I had kids. I went again after. Two completely different trips. Both great. But structured very differently."
    },
    {
      type: 'paragraph',
      content: "So if you're searching for a Madeira itinerary, you're probably asking one of these questions:"
    },
    {
      type: 'list',
      content: [
        "How many days in Madeira do we really need?",
        "Is 5 days enough?",
        "Is Madeira doable with kids?",
        "Do we need a car?",
        "Are those hikes realistic or just Instagram traps?"
      ]
    },
    {
      type: 'paragraph',
      content: "Let's break this down like normal people planning a real trip."
    },

    {
      type: 'heading',
      content: 'Where Is Madeira and Why That Matters for Planning'
    },
    {
      type: 'paragraph',
      content: "<a href=\"https://www.trydetour.com/portugal/madeira\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">Madeira</a> is a Portuguese island in the Atlantic, closer to Morocco than Lisbon."
    },
    {
      type: 'paragraph',
      content: "It's small. About 57 km long. But here's the catch: it's vertical."
    },
    {
      type: 'paragraph',
      content: "The island rises straight out of the ocean into mountains. That means roads twist, tunnels cut through cliffs, and driving 30 km can take an hour."
    },
    {
      type: 'paragraph',
      content: "So when you build your Madeira itinerary, you're not planning distance. You're planning energy."
    },
    {
      type: 'paragraph',
      content: "That's especially important with kids."
    },

    {
      type: 'heading',
      content: 'How Many Days in Madeira Is Enough'
    },
    {
      type: 'paragraph',
      content: "Short answer?"
    },
    {
      type: 'paragraph',
      content: "5 days works. 7 days feels better."
    },
    {
      type: 'paragraph',
      content: "Here's why."
    },
    {
      type: 'paragraph',
      content: "If you try to do a Madeira itinerary for 5 days, you'll cover the highlights. But you won't have flexibility if:"
    },
    {
      type: 'list',
      content: [
        "It rains in the mountains.",
        "Your kid refuses to hike.",
        "You just feel tired."
      ]
    },
    {
      type: 'paragraph',
      content: "With one week in Madeira, you can swap days around depending on weather and mood."
    },
    {
      type: 'paragraph',
      content: "If you're a couple without kids and you're efficient, 5 days is fine. If you're traveling with a young child, I'd lean toward 6 or 7."
    },

    {
      type: 'heading',
      content: 'When to Visit Madeira'
    },
    {
      type: 'paragraph',
      content: "We went in May. That was perfect."
    },
    {
      type: 'paragraph',
      content: "Temperatures around 22°C. Not too hot for hiking. Not crowded."
    },
    {
      type: 'paragraph',
      content: "July and August are busier and warmer. Better for swimming, tougher for hiking."
    },
    {
      type: 'paragraph',
      content: "Winter is mild, but mountain clouds can block views."
    },
    {
      type: 'paragraph',
      content: "If hiking is important, aim for April to June or September. If swimming matters more, summer wins."
    },
    {
      type: 'paragraph',
      content: "More info about the <a href=\"https://www.trydetour.com/portugal/madeira/best-time-to-visit\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">best time to visit here</a>."
    },

    {
      type: 'image',
      content: '/images/blog/Map Madeira.png',
      imageAlt: 'Map of Madeira showing Funchal, the mountains, the west coast, and Porto Moniz',
      imageCaption: "It's not meant to be perfectly geographic, but it really helps visualize how Funchal, the mountains, the west coast, and Porto Moniz all connect when planning your week."
    },

    {
      type: 'heading',
      content: 'Where to Stay to Optimize Your Madeira Itinerary'
    },
    {
      type: 'paragraph',
      content: "Most travel blogs recommend splitting bases. In reality, that often increases friction."
    },
    {
      type: 'paragraph',
      content: "For a Madeira 5 day itinerary, staying in Funchal simplifies everything:"
    },
    {
      type: 'list',
      content: [
        "Largest restaurant concentration",
        "Central highway access",
        "Easier evening logistics"
      ]
    },
    {
      type: 'paragraph',
      content: "For a one week Madeira plan, you can consider:"
    },
    {
      type: 'list',
      content: [
        "4 nights Funchal",
        "3 nights west coast"
      ]
    },
    {
      type: 'paragraph',
      content: "But unless you strongly prefer rural silence, one base works fine."
    },
    {
      type: 'paragraph',
      content: "Couples benefit from Funchal's dining scene. Families benefit from not moving luggage."
    },

    {
      type: 'heading',
      content: 'Madeira Itinerary 5 Days – Realistic Rhythm'
    },
    {
      type: 'paragraph',
      content: "This plan is built for:"
    },
    {
      type: 'list',
      content: [
        "Couples who like hiking but also like sleeping",
        "Families who want adventure without meltdowns",
        "Travelers who care about energy management"
      ]
    },
    {
      type: 'paragraph',
      content: "No 12-stop Instagram days. No exhaustion competitions. Just balance."
    },

    {
      type: 'heading3',
      content: 'Day 1 – Funchal: Ease Into It'
    },
    {
      type: 'paragraph',
      content: "Arrival day is not mountain day. Keep it soft."
    },
    {
      type: 'paragraph',
      content: "Take the cable car up to Monte. The view over Funchal is wide and calm. Kids usually love it. Adults pretend they don't love it. They do."
    },
    {
      type: 'paragraph',
      content: "Walk through Monte Palace Gardens. It's shaded, spacious, manageable."
    },
    {
      type: 'paragraph',
      content: "Optional: the famous wicker basket toboggan ride. Is it touristy? Yes. Is it fun? Also yes."
    },
    {
      type: 'paragraph',
      content: "In the afternoon, explore Funchal Old Town. Rua de Santa Maria. Small restaurants. Bolo do caco bread with garlic butter."
    },
    {
      type: 'paragraph',
      content: "This first day is about adjusting. You don't need to prove anything yet."
    },

    {
      type: 'image',
      content: '/images/blog/pico do arieiro.jpg',
      imageAlt: 'Dramatic volcanic ridges and peaks of Pico do Arieiro at sunrise',
      imageCaption: 'The view from the top of Pico do Arieiro is perhaps the most beautiful on the island.'
    },

    {
      type: 'heading3',
      content: 'Day 2 – Pico do Arieiro (With Common Sense)'
    },
    {
      type: 'paragraph',
      content: "This is the iconic mountain hike. But here's the thing."
    },
    {
      type: 'paragraph',
      content: "Pico do Arieiro sits at 1,818 meters. Wind can be strong. Clouds can roll in fast."
    },
    {
      type: 'paragraph',
      content: "If you're traveling as a couple and enjoy hiking, go early. Sunrise if possible. The ridge toward Pico Ruivo is dramatic. Narrow sections. Volcanic rock. Real elevation."
    },
    {
      type: 'paragraph',
      content: "If you have young kids, don't feel pressure to do the full hike. Drive up. Enjoy the viewpoint. Walk a short stretch. Leave before fatigue kicks in."
    },
    {
      type: 'paragraph',
      content: "In the afternoon, consider a lighter levada walk like Ribeiro Frio. Much more manageable."
    },
    {
      type: 'paragraph',
      content: "This is not about conquering. It's about enjoying."
    },

    {
      type: 'image',
      content: '/images/blog/Santana house.jpg',
      imageAlt: 'Traditional triangular thatched house in Santana with bright red and blue details',
      imageCaption: "One of the traditional triangular houses in Santana, with its thick thatched roof and bright red and blue details. It's touristy, yes, but seeing it in person is still charming and gives you a real sense of Madeira's rural identity."
    },

    {
      type: 'heading3',
      content: 'Day 3 – The Wild East Side'
    },
    {
      type: 'paragraph',
      content: "Start with Santana. The traditional triangular houses are not life-changing, but they're culturally interesting and easy to visit."
    },
    {
      type: 'paragraph',
      content: "Then head to Ponta de São Lourenço. Completely different landscape. Dry. Windy. Rugged. Orange cliffs against deep blue water."
    },
    {
      type: 'paragraph',
      content: "The trail is exposed and sunny. Bring water."
    },
    {
      type: 'paragraph',
      content: "When we went with the kids, we walked about an hour and turned back. That was enough. You do not need to finish everything to enjoy it."
    },

    {
      type: 'heading3',
      content: 'Day 4 – The Big West Coast Loop (Madeira Road Day)'
    },
    {
      type: 'paragraph',
      content: "Mentally prepare. This day is stunning. And long."
    },
    {
      type: 'paragraph',
      content: "Start in Câmara de Lobos. Small fishing village. Simple. Authentic."
    },
    {
      type: 'paragraph',
      content: "Then Cabo Girão. The glass skywalk. Quick stop. Impressive drop."
    },
    {
      type: 'paragraph',
      content: "Drive toward Ponta do Sol. Coffee break. Continue to Fanal Forest."
    },
    {
      type: 'paragraph',
      content: "If there's mist, it feels unreal. Twisted trees. Soft light. Almost cinematic."
    },
    {
      type: 'paragraph',
      content: "Finish in Porto Moniz. The volcanic natural pools are unique. The water can be cold, but swimming there feels special."
    },
    {
      type: 'paragraph',
      content: "Drive back to Funchal. Tired. Satisfied."
    },

    {
      type: 'heading3',
      content: 'Day 5 – Levada + Beach'
    },
    {
      type: 'paragraph',
      content: "Choose one <a href=\"https://www.visitmadeira.com/en/what-to-do/nature-search/levadas-walks/\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">levada hike</a>."
    },
    {
      type: 'paragraph',
      content: "Levada das 25 Fontes is popular for a reason. Waterfalls. Lush vegetation. Moderate difficulty."
    },
    {
      type: 'paragraph',
      content: "It's not stroller-friendly. It's doable with older kids who can walk steadily."
    },
    {
      type: 'paragraph',
      content: "After hiking, head to Calheta Beach. It's one of the most family-friendly beaches in Madeira. Artificial sand. Calmer water."
    },
    {
      type: 'paragraph',
      content: "Ending the week with sand instead of cliffs feels right."
    },

    {
      type: 'heading',
      content: 'If You Have 1 Week in Madeira'
    },
    {
      type: 'paragraph',
      content: "The difference between a 5 day Madeira itinerary and one week in Madeira is breathing room."
    },

    {
      type: 'heading3',
      content: 'Day 6 – Slow Porto Moniz or North Coast'
    },
    {
      type: 'paragraph',
      content: "Go back to Porto Moniz and actually relax. Or explore the north coast slowly. No rushing."
    },

    {
      type: 'heading3',
      content: 'Day 7 – Dolphin Watching or Porto Santo'
    },
    {
      type: 'paragraph',
      content: "Boat tours are exciting and usually a highlight for kids. Or take the ferry to Porto Santo for a completely different beach experience with long sandy shores."
    },
    {
      type: 'paragraph',
      content: "Seven days allows flexibility. Weather backup. Rest. That matters more than people think."
    },

    {
      type: 'html',
      content: `<div class="my-8 text-center">
  <a
    href="https://www.trydetour.com/portugal/madeira/itinerary"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
  >
    Create Your Own Madeira Itinerary →
  </a>
</div>`
    },

    {
      type: 'heading',
      content: 'Must See Spots in Madeira (And Why)'
    },
    {
      type: 'heading3',
      content: 'Pico do Arieiro'
    },
    {
      type: 'paragraph',
      content: "Not just a viewpoint. A real mountain experience. The volcanic ridges and elevation make you feel small in the best way. Go early. Avoid midday crowds."
    },
    {
      type: 'heading3',
      content: 'Fanal Forest'
    },
    {
      type: 'paragraph',
      content: "This is where Madeira feels magical. Laurel trees twisted by wind. Rolling fog. Quiet. If you hit it on a misty day, it's unforgettable."
    },
    {
      type: 'image',
      content: '/images/blog/Porto Moniz.jpg',
      imageAlt: 'Natural volcanic rock pools of Porto Moniz with Atlantic waves crashing beyond',
      imageCaption: 'Swimming in the natural volcanic pools of Porto Moniz feels like floating safely in the Atlantic while waves crash dramatically just beyond the rocks.'
    },

    {
      type: 'heading3',
      content: 'Porto Moniz Natural Pools'
    },
    {
      type: 'paragraph',
      content: "Swimming in natural volcanic rock pools is something you won't find in many places. It's dramatic. Raw. Atlantic."
    },
    {
      type: 'heading3',
      content: 'Ponta de São Lourenço'
    },
    {
      type: 'paragraph',
      content: "The driest part of the island. Sharp cliffs. Open horizon. Wind in your face. Completely different from the green central mountains."
    },
    {
      type: 'heading3',
      content: 'Câmara de Lobos'
    },
    {
      type: 'paragraph',
      content: "Small fishing harbor. Colorful boats. No big production. It feels real."
    },

    {
      type: 'heading',
      content: 'Local Guide Perspective'
    },
    {
      type: 'paragraph',
      content: "We spoke with Miguel, a certified mountain guide in Madeira for over 15 years."
    },
    {
      type: 'quote',
      content: "Visitors underestimate wind. Visibility can disappear in minutes above 1,400 meters. Always check wind forecasts, not just rain."
    },
    {
      type: 'paragraph',
      content: "That aligns with Windy app data trends we analyzed for mountain conditions."
    },

    {
      type: 'heading',
      content: 'What Real Travelers Say About Visiting Madeira'
    },
    {
      type: 'paragraph',
      content: "Before going to Madeira the first time, I did what most of us do. I read Reddit. I read forums. I searched things like \"how many days in Madeira,\" \"Madeira itinerary 5 days too short,\" and \"is Madeira good with kids.\""
    },
    {
      type: 'paragraph',
      content: "And honestly? The online feedback is surprisingly consistent."
    },
    {
      type: 'paragraph',
      content: "One Reddit user in r/travel wrote: <em>\"Madeira is small on the map but don't underestimate the driving. The roads are steep and winding. Plan fewer stops than you think.\"</em>"
    },
    {
      type: 'paragraph',
      content: "That comment stuck with me. And it's true. People assume they can \"see the island in 3 days.\" Then they realize that elevation changes everything. A short drive can feel like a full mountain ascent."
    },
    {
      type: 'paragraph',
      content: "On <a href=\"https://www.tripadvisor.com/ShowForum-g189167-i141-Madeira_Madeira_Islands.html\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">TripAdvisor's Madeira forum</a>, one traveler said: \"Public transport is fine in Funchal, but if you want levadas and viewpoints, you need a car. It changes the entire experience.\""
    },
    {
      type: 'paragraph',
      content: "This comes up constantly. People who tried without a car often regret it. Especially hikers. If your Madeira Portugal itinerary includes Pico do Arieiro or 25 Fontes, a car isn't optional. It's freedom."
    },
    {
      type: 'paragraph',
      content: "Another common theme on <a href=\"https://www.lonelyplanet.com/thorntree\" class=\"text-blue-600 hover:text-blue-800 underline\" target=\"_blank\" rel=\"noopener noreferrer\">Lonely Planet's Thorn Tree archive</a> and Reddit: \"If you want all-day beach lounging, Madeira isn't ideal. If you love hiking and views, it's incredible.\""
    },
    {
      type: 'paragraph',
      content: "Madeira is not Algarve. It's cliffs, trails, and volcanic drama. Calheta and Porto Moniz are great, but you come here for landscapes first."
    },

    {
      type: 'heading',
      content: 'How Much Does Madeira Cost'
    },
    {
      type: 'paragraph',
      content: "Here's a realistic estimate depending on travel style."
    },
    {
      type: 'html',
      content: `<div class="madeira-table-wrapper">
  <table class="madeira-cost-table">
    <thead>
      <tr>
        <th>Travel Profile</th>
        <th>Accommodation / night</th>
        <th>Food / day</th>
        <th>Car rental / day</th>
        <th>Estimated 5-day total per person</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Budget couple</strong></td>
        <td>80 €</td>
        <td>25 €</td>
        <td>35 €</td>
        <td>700–850 €</td>
      </tr>
      <tr>
        <td><strong>Mid-range couple</strong></td>
        <td>140 €</td>
        <td>40 €</td>
        <td>40 €</td>
        <td>1,100–1,300 €</td>
      </tr>
      <tr>
        <td><strong>Family of 3</strong></td>
        <td>150 €</td>
        <td>70–90 € total</td>
        <td>40 €</td>
        <td>1,300–1,600 € total</td>
      </tr>
      <tr>
        <td><strong>Premium couple</strong></td>
        <td>250 €+</td>
        <td>60 €</td>
        <td>60 €</td>
        <td>1,800–2,200 €</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.madeira-table-wrapper {
  overflow-x: auto;
  margin: 2rem 0;
}

.madeira-cost-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.madeira-cost-table th {
  background-color: #1e6e3e;
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.madeira-cost-table td {
  padding: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}

.madeira-cost-table tbody tr:hover {
  background-color: #f0fdf4;
}

@media (max-width: 768px) {
  .madeira-cost-table {
    font-size: 0.875rem;
  }

  .madeira-cost-table th,
  .madeira-cost-table td {
    padding: 0.5rem;
  }
}
</style>`
    },
    {
      type: 'paragraph',
      content: "Madeira is not ultra-cheap. But it's not luxury-only either. Accommodation choice changes everything."
    },

    {
      type: 'heading',
      content: 'FAQ – The Questions People Actually Ask'
    },
    {
      type: 'heading3',
      content: 'How many days in Madeira is ideal?'
    },
    {
      type: 'paragraph',
      content: "Seven if you can. Five if you're organized. If you want weather flexibility and relaxed pacing, go for a full week."
    },
    {
      type: 'heading3',
      content: 'Do I absolutely need a car?'
    },
    {
      type: 'paragraph',
      content: "Yes. Public transport exists, but it doesn't align well with hikes and viewpoints. A car gives you control over your schedule. With kids, flexibility is everything."
    },
    {
      type: 'heading3',
      content: 'Is Madeira good with young kids?'
    },
    {
      type: 'paragraph',
      content: "Yes, if you adjust expectations. Avoid exposed mountain ridges with toddlers. Choose levadas with wider paths. Plan shorter days. Madeira works best for families who enjoy nature more than theme parks."
    },
    {
      type: 'heading3',
      content: 'Is Madeira good for swimming?'
    },
    {
      type: 'paragraph',
      content: "Yes, but not like a tropical beach destination. Porto Moniz and Calheta are your best options. Ocean temperatures are refreshing, not warm."
    },
    {
      type: 'heading3',
      content: 'Is Madeira good for photography?'
    },
    {
      type: 'paragraph',
      content: "Absolutely. Between Fanal Forest, mountain peaks, and north coast cliffs, it's one of Europe's most photogenic islands."
    },
    {
      type: 'heading3',
      content: "What's the biggest mistake people make?"
    },
    {
      type: 'paragraph',
      content: "Trying to do too much in 5 days. Madeira is small geographically but demanding physically. Leave margin."
    },

    {
      type: 'heading',
      content: 'Final Thoughts'
    },
    {
      type: 'paragraph',
      content: "Madeira doesn't try too hard. It's not flashy. It's not built around resorts."
    },
    {
      type: 'paragraph',
      content: "It's cliffs, wind, tunnels, and green mountains rising straight from the sea."
    },
    {
      type: 'paragraph',
      content: "The key to a good Madeira itinerary isn't maximizing stops. It's managing energy."
    },
    {
      type: 'paragraph',
      content: "When you get that balance right, whether 5 days or one week in Madeira, the island gives you something memorable."
    },
    {
      type: 'paragraph',
      content: "And usually, it's not the thing you expected."
    }
  ],

  cta: {
    title: "Plan Your Madeira Trip",
    description: "Build a realistic Madeira itinerary tailored to your travel style — whether you're hiking solo, exploring as a couple, or keeping up with kids.",
    buttonText: "Explore Madeira",
    buttonLink: "https://www.trydetour.com/portugal/madeira/itinerary"
  }
}

const metadataConfig = createBlogMetadata(articleData)
export const metadata = generateMetadataHelper(metadataConfig)

export default function MadeiraItineraryPage() {
  return <BlogTemplate articleData={articleData} />
}
