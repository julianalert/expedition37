'use client'

import Image from 'next/image'
import Avatar01 from '@/public/images/avatar-01.jpg'
import Avatar02 from '@/public/images/avatar-02.jpg'
import Avatar03 from '@/public/images/avatar-03.jpg'
import Avatar04 from '@/public/images/avatar-04.jpg'

export default function TravelPlannerHero() {
  const scrollToTools = () => {
    const tabsSection = document.querySelector('[data-tabs-section]')
    if (tabsSection) {
      tabsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 bg-linear-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-28 pb-8 md:pt-36 md:pb-16">
          {/* Hero content */}
          <div className="max-w-6xl text-center md:text-left">
            {/* Copy */}
            <h1 className="h1 font-inter mb-6">
              Travel Planner <span className="font-nycd text-indigo-500 font-normal">Tools</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              All your travel tools in one place, from itinerary generators to budget calculators.
              <br className="hidden md:block" /> TryDetour helps you explore, plan, and prepare effortlessly.
            </p>
            {/* Button + Avatars */}
            <div className="sm:flex sm:items-center sm:justify-center md:justify-start space-y-6 sm:space-y-0 sm:space-x-5">
              <div>
                <button 
                  onClick={scrollToTools}
                  className="btn text-white bg-indigo-500 hover:bg-indigo-600 shadow-xs"
                >
                  Discover the tools
                </button>
              </div>
              <div className="sm:flex sm:items-center sm:justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="inline-flex -space-x-3 -ml-0.5">
                  <Image
                    className="rounded-full border-2 border-indigo-50 box-content"
                    src={Avatar01}
                    width={32}
                    height={32}
                    alt="Avatar 01"
                  />
                  <Image
                    className="rounded-full border-2 border-indigo-50 box-content"
                    src={Avatar02}
                    width={32}
                    height={32}
                    alt="Avatar 02"
                  />
                  <Image
                    className="rounded-full border-2 border-indigo-50 box-content"
                    src={Avatar03}
                    width={32}
                    height={32}
                    alt="Avatar 03"
                  />
                  <Image
                    className="rounded-full border-2 border-indigo-50 box-content"
                    src={Avatar04}
                    width={32}
                    height={32}
                    alt="Avatar 04"
                  />
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Already helped <span className="text-indigo-500">2,847</span> travelers plan their trips
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
