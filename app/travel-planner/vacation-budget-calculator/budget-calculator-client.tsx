'use client'

import Image from 'next/image'
import BudgetCalculator from '@/components/budget-calculator'
import MaldivesImage from '@/public/images/blog/Maldives.jpg'
import Avatar01 from '@/public/images/avatar-01.jpg'
import Avatar02 from '@/public/images/avatar-02.jpg'
import Avatar03 from '@/public/images/avatar-03.jpg'
import Avatar04 from '@/public/images/avatar-04.jpg'

export default function BudgetCalculatorClient() {
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
                Estimate Your Vacation <span className="font-nycd text-indigo-500 font-normal">Budget</span> Instantly
              </h1>
              <p className="text-lg text-gray-500">
                Use our free Vacation Budget Calculator to estimate the total cost of your next trip, from flights and accommodation to food, transport, and daily expenses.
                <br className="hidden md:block" /> Plan smarter and avoid surprises before you travel.
              </p>
              
              {/* Budget Calculator Component */}
              <div className="max-w-4xl mx-auto">
                <BudgetCalculator />
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
                <h3 className="text-lg font-bold text-gray-800 mb-3">What is a vacation budget calculator?</h3>
                <p className="text-gray-600">
                  A vacation budget calculator helps you estimate the total cost of your trip including flights, hotels, meals, local transport, and activities. It's a simple way to understand how much your vacation will really cost before you go.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How does TryDetour's cost calculator work?</h3>
                <p className="text-gray-600">
                  Just enter your destination, trip length, number of travelers and your standard of travel. Our calculator uses real travel data to estimate typical prices for accommodation, food, transport, and activities giving you a realistic budget overview in seconds.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Is the vacation cost calculator free?</h3>
                <p className="text-gray-600">
                  Yes! The tool is completely free to use. You don't need to create an account or pay any fees, just type your trip details and get instant results.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What makes this vacation calculator different?</h3>
                <p className="text-gray-600">
                  Unlike generic budget tools, TryDetour combines AI with live travel data from thousands of destinations. The result is a more accurate and transparent estimate that reflects current prices.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can I plan any type of trip with it?</h3>
                <p className="text-gray-600">
                  Absolutely. Whether you're traveling solo, as a couple, with friends, or organizing a family holiday, the calculator adapts to your travel style, duration, and location.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What expenses are included in the calculation?</h3>
                <div className="text-gray-600">
                  <p className="mb-3">Our budget tool considers major categories like:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Flights or transportation</li>
                    <li>Accommodation</li>
                    <li>Food & drinks</li>
                    <li>Local transport</li>
                    <li>Activities & entrance fees</li>
                    <li>Daily personal expenses</li>
                  </ul>
                </div>
              </div>

              {/* FAQ Item 7 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can travel agencies use the calculator?</h3>
                <p className="text-gray-600">
                  Yes. It's a great way for agencies and trip planners to provide fast cost estimates to clients or compare destinations based on budget ranges.
                </p>
              </div>

              {/* FAQ Item 8 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can I save or share my budget results?</h3>
                <p className="text-gray-600">
                  Yes. You can copy, export, or share your estimated trip cost with others to plan together or track expenses later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
