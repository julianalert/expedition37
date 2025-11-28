'use client'

import { useState } from 'react'
import Image from 'next/image'
import MaldivesImage from '@/public/images/blog/Maldives.jpg'
import TestimonialsImage01 from '@/public/images/sarah.jpg'
import TestimonialsImage02 from '@/public/images/marcus.jpg'
import TestimonialsImage03 from '@/public/images/elena.jpg'
import TestimonialsImage04 from '@/public/images/david.png'
import TravelToolsTabs from '@/components/travel-tools-tabs'
import ItineraryGenerator from '@/components/itinerary-generator'
import BudgetCalculator from '@/components/budget-calculator'
import NearMe from '@/components/near-me'
import TravelQuiz from '@/components/travel-quiz'
import TravelPlannerHero from '@/components/travel-planner-hero'

export default function TravelPlannerClient() {
  const [activeTab, setActiveTab] = useState('itinerary')

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'itinerary':
        return <ItineraryGenerator />
      case 'budget':
        return <BudgetCalculator />
      case 'nearme':
        return <NearMe />
      case 'quiz':
        return <TravelQuiz />
      default:
        return <ItineraryGenerator />
    }
  }

  return (
    <>
      <TravelPlannerHero />
      
      {/* Travel Tools Tabs */}
      <div data-tabs-section>
        <TravelToolsTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      
      {/* Active Tool Component */}
      {renderActiveComponent()}
      
      {/* Travel Planning Tools Section */}
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-inter mb-4">Explore Our AI Travel Planner Tools</h2>
              <p className="text-lg text-gray-500">
               TryDetour's AI tools help you generate itineraries, find the best routes, calculate travel costs, and organize your trip in minutes.
              </p>
            </div>
            
            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Itinerary Generator */}
              <a href="/travel-planner/itinerary-generator" className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-indigo-500 to-purple-600">
                  {/* Available Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md border border-green-200">
                      Available
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">Itinerary Generator</h3>
                    <p className="text-white/80 text-sm">Create personalized day-by-day travel plans</p>
                  </div>
                </div>
              </a>

              {/* Budget Calculator */}
              <a href="/travel-planner/vacation-budget-calculator" className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-green-500 to-teal-600">
                  {/* Available Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md border border-green-200">
                      Available
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">Budget Calculator</h3>
                    <p className="text-white/80 text-sm">Estimate your total trip costs accurately</p>
                  </div>
                </div>
              </a>

              {/* Road Trip Calculator */}
              <div className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-orange-500 to-red-600">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-md border border-purple-200">
                      Coming Soon
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">Road Trip Calculator</h3>
                    <p className="text-white/80 text-sm">Plan routes, fuel costs, and stops</p>
                  </div>
                </div>
              </div>

              {/* Flight Time Calculator */}
              <div className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-blue-500 to-cyan-600">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-md border border-purple-200">
                      Coming Soon
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">Flight Time Calculator</h3>
                    <p className="text-white/80 text-sm">Calculate flight durations and layovers</p>
                  </div>
                </div>
              </div>

              {/* Packing List */}
              <a href="/travel-planner/travel-checklist" className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-pink-500 to-rose-600">
                  {/* Available Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md border border-green-200">
                      Available
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">Packing List</h3>
                    <p className="text-white/80 text-sm">Smart packing suggestions for any trip</p>
                  </div>
                </div>
              </a>

              {/* Currency Converter */}
              <div className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-yellow-500 to-orange-600">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-md border border-purple-200">
                      Coming Soon
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">Currency Converter</h3>
                    <p className="text-white/80 text-sm">Real-time exchange rates and conversions</p>
                  </div>
                </div>
              </div>

              {/* Near Me */}
              <a href="/travel-planner/near-me" className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-emerald-500 to-green-600">
                  {/* Available Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md border border-green-200">
                      Available
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">Near Me</h3>
                    <p className="text-white/80 text-sm">Discover attractions and services nearby</p>
                  </div>
                </div>
              </a>

              {/* Where Should I Go Quiz */}
              <a href="/travel-planner/quiz-where-should-i-travel" className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-purple-500 to-pink-600">
                  {/* Available Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md border border-green-200">
                      Available
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">Where Should I Go?</h3>
                    <p className="text-white/80 text-sm">Take our quiz to find your perfect destination</p>
                  </div>
                </div>
              </a>

              {/* Time Difference */}
              <div className="group block">
                <div className="relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-br from-violet-500 to-purple-600">
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-md border border-purple-200">
                      Coming Soon
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white mb-2">Time Difference</h3>
                    <p className="text-white/80 text-sm">Compare time zones across destinations</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-inter mb-4">Trusted by smart travelers</h2>
            <p className="text-lg text-gray-600">
              See how our AI travel planning tools are helping travelers plan better, faster, and smarter
            </p>
          </div>
          
          {/* Testimonials Grid - 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Testimonial 1 - Sarah Chen */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-20">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20h10l8.5-20H12L0 20zm21.5 0H32L40.5 0H34l-12.5 20z" fill="currentColor"/>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                      <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.2l-5.2 2.9 1-5.8L1.5 7.2l5.9-.9z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-800 font-medium mb-6 text-lg leading-relaxed">
                  "The AI Itinerary Generator saved me hours of planning! It created a perfect 7-day Southeast Asia itinerary with hidden gems I never would have found."
                </blockquote>

                {/* Tool used */}
                <div className="text-purple-600 text-sm font-semibold mb-4 px-3 py-1 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 inline-block">
                  🤖 Used: Itinerary Generator
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image 
                      src={TestimonialsImage01} 
                      alt="Sarah Chen"
                      width={50} 
                      height={50} 
                      className="rounded-full ring-2 ring-white shadow-lg"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-purple-600">
                      Sarah Chen
                    </div>
                    <div className="text-gray-600 text-sm">
                      29yo, San Francisco, USA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Marcus Johnson */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6 transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-20">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20h10l8.5-20H12L0 20zm21.5 0H32L40.5 0H34l-12.5 20z" fill="currentColor"/>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                      <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.2l-5.2 2.9 1-5.8L1.5 7.2l5.9-.9z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-800 font-medium mb-6 text-lg leading-relaxed">
                  "The Budget Calculator was incredibly accurate! It helped me plan my 3-month Europe trip within my exact budget, including all hidden costs."
                </blockquote>

                {/* Tool used */}
                <div className="text-blue-600 text-sm font-semibold mb-4 px-3 py-1 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 inline-block">
                  💰 Used: Budget Calculator
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image 
                      src={TestimonialsImage02} 
                      alt="Marcus Johnson"
                      width={50} 
                      height={50} 
                      className="rounded-full ring-2 ring-white shadow-lg"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-blue-600">
                      Marcus Johnson
                    </div>
                    <div className="text-gray-600 text-sm">
                      34yo, London, UK
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Elena Rodriguez */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-20">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20h10l8.5-20H12L0 20zm21.5 0H32L40.5 0H34l-12.5 20z" fill="currentColor"/>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                      <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.2l-5.2 2.9 1-5.8L1.5 7.2l5.9-.9z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-800 font-medium mb-6 text-lg leading-relaxed">
                  "The Road Trip Calculator made planning our cross-country adventure so easy! It calculated fuel costs, optimal routes, and perfect stops."
                </blockquote>

                {/* Tool used */}
                <div className="text-emerald-600 text-sm font-semibold mb-4 px-3 py-1 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 inline-block">
                  🚗 Used: Road Trip Calculator
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image 
                      src={TestimonialsImage03} 
                      alt="Elena Rodriguez"
                      width={50} 
                      height={50} 
                      className="rounded-full ring-2 ring-white shadow-lg"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-emerald-600">
                      Elena Rodriguez
                    </div>
                    <div className="text-gray-600 text-sm">
                      27yo, Barcelona, Spain
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 4 - David Kim */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-20">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20h10l8.5-20H12L0 20zm21.5 0H32L40.5 0H34l-12.5 20z" fill="currentColor"/>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                      <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.2l-5.2 2.9 1-5.8L1.5 7.2l5.9-.9z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-800 font-medium mb-6 text-lg leading-relaxed">
                  "The AI Packing List was a lifesaver for our family trip! It suggested everything we needed based on destination, weather, and activities."
                </blockquote>

                {/* Tool used */}
                <div className="text-amber-600 text-sm font-semibold mb-4 px-3 py-1 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 inline-block">
                  🎒 Used: Packing List Generator
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image 
                      src={TestimonialsImage04} 
                      alt="David Kim"
                      width={50} 
                      height={50} 
                      className="rounded-full ring-2 ring-white shadow-lg"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-amber-600">
                      David Kim
                    </div>
                    <div className="text-gray-600 text-sm">
                      42yo, Toronto, Canada
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Why Use TryDetour AI Tools Section */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-inter mb-6">Why Use TryDetour AI Tools</h2>
              <p className="text-lg text-gray-500 mb-8">
                Traditional travel planning takes hours of searching. With TryDetour's AI tools, you can instantly find destinations that match your interests, budget, and timeframe.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Who uses section */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Who uses TryDetour AI Tools?</h3>
                <p className="text-gray-600">
                  TryDetour is designed for anyone who loves to travel, from solo adventurers and families planning their next getaway, to travel agencies helping clients choose the perfect destination. Frequent flyers, digital nomads, and even first-time travelers use TryDetour to explore new places, compare options, and plan trips more efficiently.
                </p>
              </div>
              
              {/* How to use section */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">How do I use the tools?</h3>
                <p className="text-gray-600">
                  Select the tool you need, for example, the Itinerary Generator and fill the form. The AI instantly gives you personalized results.
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
                <h3 className="text-lg font-bold text-gray-800 mb-3">What is a travel planner?</h3>
                <p className="text-gray-600">
                  A travel planner is a set of tools that help you organize your trip, from choosing a destination to creating an itinerary and estimating your travel costs for instance. It's your all-in-one assistant to plan smarter and save time.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How does TryDetour's AI travel planner work?</h3>
                <p className="text-gray-600">
                  It combines destination data (cost, safety, lifestyle scores) with AI suggestions to create personalized travel plans for any traveler.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Do I have to book through TryDetour?</h3>
                <p className="text-gray-600">
                  No. TryDetour is not a booking platform. It's designed to help you explore, plan, and compare options before booking anywhere else. You stay in control of your trip from start to finish.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Are these tools free to use?</h3>
                <p className="text-gray-600">
                  Yes! All AI travel planner tools are completely free and you can use them without creating an account or paying anything.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">What kind of trips can I plan with TryDetour?</h3>
                <p className="text-gray-600">
                  Our tools adapt to any trip length, destination type, and travel style — solo, couple, family, or digital nomad.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">How is TryDetour different from other travel websites?</h3>
                <p className="text-gray-600">
                  Most platforms focus on booking flights or hotels. TryDetour helps you decide where to go and how to plan it. It's about smarter discovery, not transactions.
                </p>
              </div>

              {/* FAQ Item 7 */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Can I use the travel planner on mobile?</h3>
                <p className="text-gray-600">
                  Absolutely. TryDetour's tools are designed for mobile and desktop, so you can plan your next trip from your phone, tablet, or laptop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
