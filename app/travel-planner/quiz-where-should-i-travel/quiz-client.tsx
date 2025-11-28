'use client'

import Image from 'next/image'
import Link from 'next/link'
import TravelQuiz from '@/components/travel-quiz'
import MaldivesImage from '@/public/images/blog/Maldives.jpg'
import PostItem from '@/app/(default)/post-item'

// Famous destinations using the same structure as homepage countries
const famousDestinations = [
  {
    id: 146,
    name: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    continent: 'Asia',
    mood: ['beach', 'islands', 'relaxed', 'spiritual'],
    rank: 10,
    overallRating: 88,
    costRating: 85,
    safetyRating: 75,
    funRating: 90,
    foodRating: 85
  },
  {
    id: 71,
    name: 'France',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    continent: 'Europe',
    mood: ['romantic', 'cultural', 'luxury', 'artistic'],
    rank: 4,
    overallRating: 92,
    costRating: 45,
    safetyRating: 88,
    funRating: 95,
    foodRating: 98
  },
  {
    id: 126,
    name: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    continent: 'Asia',
    mood: ['modern', 'tech', 'urban', 'efficient'],
    rank: 8,
    overallRating: 90,
    costRating: 35,
    safetyRating: 95,
    funRating: 88,
    foodRating: 92
  },
  {
    id: 196,
    name: 'South Africa',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    continent: 'Africa',
    mood: ['scenic', 'wine', 'adventure', 'coastal'],
    rank: 15,
    overallRating: 87,
    costRating: 75,
    safetyRating: 65,
    funRating: 92,
    foodRating: 80
  },
  {
    id: 999,
    name: 'Iceland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    continent: 'Europe',
    mood: ['nature', 'adventure', 'unique', 'peaceful'],
    rank: 25,
    overallRating: 89,
    costRating: 25,
    safetyRating: 98,
    funRating: 85,
    foodRating: 70
  },
  {
    id: 998,
    name: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    continent: 'North America',
    mood: ['diverse', 'urban', 'iconic', 'energetic'],
    rank: 12,
    overallRating: 85,
    costRating: 40,
    safetyRating: 78,
    funRating: 95,
    foodRating: 88
  }
]

export default function QuizClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Bg */}
        <div className="absolute inset-0 bg-linear-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true" />

        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-28 pb-8 md:pt-36 md:pb-16">
            {/* Hero content */}
            <div className="max-w-6xl text-center mx-auto">
              {/* Copy */}
              <h1 className="h1 font-inter mb-6">
                Can't Decide Where to Go? Let the Travel <span className="font-nycd text-indigo-500 font-normal">Quiz</span> Choose for You
              </h1>
              <p className="text-lg text-gray-500">
                Answer a few questions and let our smart travel quiz suggest your next dream destination.
              </p>
              
              {/* Travel Quiz Component */}
              <div className="max-w-4xl mx-auto">
                <TravelQuiz />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Famous Destinations Cards Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-inter mb-4">Explore the World's Most Loved Destinations</h2>
            <p className="text-lg text-gray-600">
              Not sure where to start? Explore six of the world's most famous travel destinations loved by millions of travelers for their culture, beauty, and vibe. Click any card to explore guides, costs, and itineraries.
            </p>
          </div>
          
          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {famousDestinations.map((destination, index) => (
              <PostItem key={destination.id} {...destination} hideContinentTag={false} />
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose Tips Section */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-inter mb-6">How to Choose the Right Destination</h2>
              <p className="text-lg text-gray-600">
                Choosing where to go can be the hardest part of planning a trip. Here are some ways to narrow it down and make sure your next destination feels right for you.
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Tip 1 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Where should I start when choosing a destination?</h3>
                <p className="text-gray-600">
                  Start with your goal. Do you need rest or excitement? Are you trying to escape routine or explore something new? Matching your mood to your trip type helps avoid disappointment — no one wants to party in a sleepy town or meditate in the middle of a festival.
                </p>
              </div>

              {/* Tip 2 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How important are time and budget when planning?</h3>
                <p className="text-gray-600">
                  They're essential. A short weekend trip might call for a quick flight or a nearby road trip, while a two-week vacation can justify going further abroad. Think realistically about what fits your schedule and finances. Tools like the Vacation Budget Calculator can help you plan costs and avoid surprises.
                </p>
              </div>

              {/* Tip 3 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Does the season really matter that much?</h3>
                <p className="text-gray-600">
                  Absolutely. The best time to visit a destination can change everything — from prices to experiences. Avoid extreme heat, monsoon seasons, or times when attractions are closed. A little timing research often turns a good trip into a great one.
                </p>
              </div>

              {/* Tip 4 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What if I still can't decide where to go?</h3>
                <p className="text-gray-600">
                  Focus on your interests rather than geography. If you love food, look for cities known for their cuisine. If you crave nature, explore destinations famous for their landscapes. TryDetour makes this easy by letting you filter destinations by vibe, budget, and travel style.
                </p>
              </div>

              {/* Tip 5 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What's the best way to find the "perfect" destination?</h3>
                <p className="text-gray-600">
                  There's no universal answer. The right destination isn't about following trends — it's about discovering what kind of traveler you are. The more you know your travel personality, the easier it becomes to choose places that truly fit you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section for Classic TryDetour */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={MaldivesImage}
            alt="Beautiful Maldives destination"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="py-16 md:py-24">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-inter mb-6 text-white">
                Find Your Next Travel Destination Effortlessly
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Tired of endless searching? TryDetour helps you discover the best places to go based on your interests, budget, and travel style. Explore over 8,000 destinations worldwide with cost insights, itineraries, safety ratings, and local vibes.
              </p>
              <a 
                href="/" 
                className="btn text-indigo-600 bg-white hover:bg-gray-100 shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Explore Destinations
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-inter mb-6">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How does the travel quiz work?</h3>
                <p className="text-gray-600">
                  Just answer 10 short questions about your travel preferences, and our system will suggest destinations that match your personality and vacation goals.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Is it based on real data or just for fun?</h3>
                <p className="text-gray-600">
                  A bit of both. The quiz uses data from popular travel destinations and combines it with your answers to recommend relevant options.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can I retake the quiz?</h3>
                <p className="text-gray-600">
                  Yes, you can take it as many times as you want. Change your answers and discover new destinations that might fit different moods or trips.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Does it include budget considerations?</h3>
                <p className="text-gray-600">
                  Not directly, but you can use our Vacation Budget Calculator afterward to estimate the cost of traveling to your suggested destinations.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can this quiz help travel agents or groups?</h3>
                <p className="text-gray-600">
                  Absolutely. It's a fun and simple way for travel agents or friends planning together to find destinations that appeal to everyone.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What if I already know where I want to go?</h3>
                <p className="text-gray-600">
                  You can still take the quiz for inspiration. It might reveal similar destinations or alternatives you haven't considered yet.
                </p>
              </div>

              {/* FAQ Item 7 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Is it free to use?</h3>
                <p className="text-gray-600">
                  Yes, TryDetour's Travel Quiz is completely free and does not require any sign-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
