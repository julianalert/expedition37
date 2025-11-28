'use client'

import Image from 'next/image'
import NearMe from '@/components/near-me'
import MaldivesImage from '@/public/images/blog/Maldives.jpg'

export default function NearMeClient() {
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
                Discover Amazing Places <span className="font-nycd text-indigo-500 font-normal">Near You</span>
              </h1>
              <p className="text-lg text-gray-500">
                Find interesting attractions, hidden gems, hotels, and local experiences around your current location.
                <br className="hidden md:block" /> Explore what's nearby and discover your next adventure.
              </p>
              
              {/* Near Me Component */}
              <div className="max-w-4xl mx-auto">
                <NearMe />
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
                <h3 className="text-lg font-bold text-gray-800 mb-3">How does the "Near Me" tool work?</h3>
                <p className="text-gray-600">
                  The tool uses your device's GPS location to find your coordinates, then uses AI to discover interesting places, attractions, hotels, and hidden gems within your area. You'll get personalized recommendations based on your exact location.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Is my location data safe and private?</h3>
                <p className="text-gray-600">
                  Yes, absolutely. Your location is only used to generate recommendations and is not stored or shared. The location data stays on your device and is only sent to our AI service to provide you with relevant nearby suggestions.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What if I don't want to share my location?</h3>
                <p className="text-gray-600">
                  That's completely fine! The tool only works with your permission. If you prefer not to share your location, you can use our other travel planning tools like the Itinerary Generator or Budget Calculator instead.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What kind of places will I discover?</h3>
                <p className="text-gray-600">
                  You'll discover a wide variety of places including top attractions, museums, restaurants, hotels, natural spots, hidden gems, nearby cities, airports, shopping areas, and local experiences that match different interests and preferences.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How accurate are the location-based recommendations?</h3>
                <p className="text-gray-600">
                  Our AI uses your precise GPS coordinates to provide highly accurate recommendations. The suggestions include distances, travel times, and are tailored to your specific location to ensure relevance and accuracy.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can I use this tool while traveling?</h3>
                <p className="text-gray-600">
                  Absolutely! The "Near Me" tool is perfect for travelers. Whether you're in a new city, exploring a different country, or just want to discover something new in your hometown, it works anywhere in the world.
                </p>
              </div>

              {/* FAQ Item 7 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Is the Near Me tool free to use?</h3>
                <p className="text-gray-600">
                  Yes! Like all our travel planning tools, the Near Me feature is completely free to use. No account required, no hidden fees - just instant recommendations based on your location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
