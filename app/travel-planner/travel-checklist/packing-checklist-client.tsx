'use client'

import Image from 'next/image'
import PackingChecklist from '@/components/packing-checklist'
import MaldivesImage from '@/public/images/blog/Maldives.jpg'

export default function PackingChecklistClient() {
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
                Create Your Smart Travel <span className="font-nycd text-indigo-500 font-normal">Packing Checklist</span>
              </h1>
              <p className="text-lg text-gray-500 mb-8">
                Generate your perfect packing list for any trip. Add details like destination, duration and activities to get a travel items checklist that fits you perfectly.
              </p>
              
              {/* Packing Checklist Component */}
              <div className="max-w-4xl mx-auto">
                <PackingChecklist />
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
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75 -z-10" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Find Your Next Travel Destination Effortlessly
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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
                <h3 className="text-lg font-bold text-gray-800 mb-3">What is a travel packing checklist?</h3>
                <p className="text-gray-600">
                  A travel packing checklist is a personalized list of items you need to pack for your specific trip. It helps ensure you don't forget essential items and pack appropriately for your destination, activities, and trip duration.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How does TryDetour's packing checklist work?</h3>
                <p className="text-gray-600">
                  Simply enter your destination, trip duration, travel group type, and any specific activities you plan to do. Our AI analyzes this information and generates a customized packing list tailored to your needs, considering factors like climate, culture, and activities.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Is the packing checklist generator free?</h3>
                <p className="text-gray-600">
                  Yes! The travel packing checklist generator is completely free to use. You don't need to create an account or pay any fees to generate your personalized packing list.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can I customize my packing list?</h3>
                <p className="text-gray-600">
                  Absolutely! The generated checklist serves as a comprehensive starting point. You can add or remove items based on your personal preferences, specific needs, or unique circumstances for your trip.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Does it work for all types of trips?</h3>
                <p className="text-gray-600">
                  Yes! Whether you're going on a business trip, family vacation, solo adventure, romantic getaway, or group expedition, our tool adapts to your travel style and generates appropriate recommendations for any destination and duration.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What makes this different from generic packing lists?</h3>
                <p className="text-gray-600">
                  Unlike generic lists, our AI considers your specific destination's climate, culture, activities, and travel duration. It also adapts based on your travel group (solo, couple, family, friends) to provide truly personalized recommendations.
                </p>
              </div>

              {/* FAQ Item 7 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can I save or share my packing checklist?</h3>
                <p className="text-gray-600">
                  Yes! You can copy your generated packing checklist to save it or share it with travel companions. This makes it easy to coordinate packing and ensure everyone is prepared for the trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
