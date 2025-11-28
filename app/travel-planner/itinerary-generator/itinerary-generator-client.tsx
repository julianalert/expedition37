'use client'

import Image from 'next/image'
import ItineraryGenerator from '@/components/itinerary-generator'
import MaldivesImage from '@/public/images/blog/Maldives.jpg'
import Avatar01 from '@/public/images/avatar-01.jpg'
import Avatar02 from '@/public/images/avatar-02.jpg'
import Avatar03 from '@/public/images/avatar-03.jpg'
import Avatar04 from '@/public/images/avatar-04.jpg'

export default function ItineraryGeneratorClient() {
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
                Build a Personalized Travel <span className="font-nycd text-indigo-500 font-normal">Itinerary</span> in Seconds
              </h1>
              <p className="text-lg text-gray-500">
                Design your perfect trip, from 3-day city breaks to month-long adventures.
                <br className="hidden md:block" /> Create, customize, and plan smarter with our itinerary maker.
              </p>
              
              {/* Itinerary Generator Component */}
              <div className="max-w-4xl mx-auto">
                <ItineraryGenerator />
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
                <h3 className="text-lg font-bold text-gray-800 mb-3">What is an itinerary generator?</h3>
                <p className="text-gray-600">
                  An itinerary generator helps you automatically create a day-by-day travel plan for your trip. Instead of searching manually, it uses data and AI to build a personalized itinerary based on your destination, duration, and interests.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How does TryDetour's itinerary maker work?</h3>
                <p className="text-gray-600">
                  Just enter your destination, choose your trip length and write what you want to do during your stay. The tool instantly creates a suggested itinerary with top attractions, local experiences, and logical daily routes. You can adjust and personalize it anytime.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Is the itinerary generator free to use?</h3>
                <p className="text-gray-600">
                  Yes, it's completely free. You can generate unlimited travel itineraries without creating an account or paying any fees.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can I make an itinerary for any destination?</h3>
                <p className="text-gray-600">
                  Absolutely. TryDetour covers over 8,000 destinations worldwide but our itinerary generator can do more. Whether you're planning a weekend escape or a full month abroad, the tool adapts to your trip.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What makes TryDetour's itinerary planner different?</h3>
                <p className="text-gray-600">
                  Unlike generic itinerary tools, TryDetour combines AI personalization with real travel data (cost, distance, best time to visit, and even local vibes). It's designed to help travelers make better choices faster.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can travel agencies or groups use it?</h3>
                <p className="text-gray-600">
                  Yes! Many travel agents use TryDetour's itinerary generator to create custom plans for clients in seconds. It's perfect for professionals who want quick, structured itineraries with accurate travel data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
