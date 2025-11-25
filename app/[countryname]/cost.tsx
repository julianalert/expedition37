'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { slugToCountryName, countryNameToSlug } from '@/lib/countryUtils'

interface CostProps {
  country: Country | null
}

const tabs = [
  { id: 'overview', name: 'Overview', href: '' },
  { id: 'best-places', name: 'Best places to visit', href: '/best-places-to-visit' },
  { id: 'best-time', name: 'Best time to visit', href: '/best-time-to-visit' },
  { id: 'cost', name: 'Cost', href: '/travel-cost' },
  { id: 'itinerary', name: 'Itinerary', href: '/itinerary' },
  { id: 'alternatives', name: 'Alternatives', href: '/alternatives' },
]

export default function Cost({ country }: CostProps) {
  const pathname = usePathname()
  const [days, setDays] = useState('7')
  const [people, setPeople] = useState('2')
  const [adults, setAdults] = useState('2')
  const [children, setChildren] = useState('0')
  const [budget, setBudget] = useState('normal')
  const [generatingCost, setGeneratingCost] = useState(false)
  const [costBreakdown, setCostBreakdown] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)


  const handleGenerateCost = async () => {
    setGeneratingCost(true)
    setError(null)
    setCostBreakdown(null)

    try {
      const response = await fetch('/api/cost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: country?.name || 'Unknown Country',
          days: days,
          people: people,
          adults: adults,
          children: children,
          budget: budget,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate cost breakdown')
      }

      const data = await response.json()
      setCostBreakdown(data.costBreakdown)
    } catch (err) {
      setError('Failed to generate travel cost breakdown. Please try again.')
    } finally {
      setGeneratingCost(false)
    }
  }

  const displayCountryName = country?.name || 'Unknown Country'

  return (
    <>
      {/* Country Hero Section */}
      <section className="w-full">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-12 pb-2 md:pb-4">
            {/* Back navigation */}
            <div className="mb-8">
              <a 
                href="/" 
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to all countries
              </a>
            </div>

            {/* Country hero section */}
            {country && (
              <div className="mb-0">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                  {/* Background image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${country.image})`,
                    }}
                  />
                  
                  {/* Semi-transparent overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
                  
                  {/* Featured indicator */}
                  {country.featured && (
                    <div className="absolute top-6 right-6 z-10">
                      <div className="flex items-center bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.143 5.143A4.29 4.29 0 0 1 6.857.857a.857.857 0 0 0-1.714 0A4.29 4.29 0 0 1 .857 5.143a.857.857 0 0 0 0 1.714 4.29 4.29 0 0 1 4.286 4.286.857.857 0 0 0 1.714 0 4.29 4.29 0 0 1 4.286-4.286.857.857 0 0 0 0-1.714Z" />
                        </svg>
                        Featured
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    {/* Continent */}
                    <div className="flex justify-start">
                      <div className="text-sm md:text-base font-medium text-white/80 bg-white/15 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full">
                        {country.continent || 'Travel Cost'}
                      </div>
                    </div>
                    
                    {/* Country name and cost indicator */}
                    <div className="text-left">
                      <div className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                        {displayCountryName}
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        <span className="text-xs md:text-sm text-white/80 bg-white/15 backdrop-blur-sm px-2 md:px-3 py-1 md:py-2 rounded-lg">
                          Travel Cost Calculator
                        </span>
                        {country.mood && country.mood.slice(0, 3).map((mood: string, index: number) => (
                          <span key={index} className="text-xs md:text-sm text-white/80 bg-white/15 backdrop-blur-sm px-2 md:px-3 py-1 md:py-2 rounded-lg">
                            {mood}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Country Tabs Navigation */}
      <section className="border-b border-gray-200 bg-white sticky top-0 z-40 mt-4 mb-4">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = tab.id === 'cost'
              const countrySlug = country ? countryNameToSlug(country.name) : ''
              const href = tab.id === 'overview' ? `/${countrySlug}` : `/${countrySlug}${tab.href}`
              
              return (
                <Link
                  key={tab.id}
                  href={href}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                    ${isActive
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="max-w-6xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {displayCountryName} Travel Cost Guide - How expensive is {displayCountryName}?
                </h1>
                <p className="text-gray-600">
                  Get a personalized travel cost breakdown for your trip to {displayCountryName}
                </p>
              </div>

            {/* Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="space-y-6">
                {/* Days Input */}
                <div>
                  <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
                    How many days?
                  </label>
                  <select
                    id="days"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    disabled={generatingCost}
                  >
                    <option value="3">3 days</option>
                    <option value="5">5 days</option>
                    <option value="7">1 week</option>
                    <option value="10">10 days</option>
                    <option value="14">2 weeks</option>
                    <option value="21">3 weeks</option>
                    <option value="30">1 month</option>
                  </select>
                </div>

                {/* People Input */}
                <div>
                  <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-2">
                    How many people?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="adults" className="block text-xs text-gray-500 mb-1">Adults</label>
                      <select
                        id="adults"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        value={adults}
                        onChange={(e) => {
                          setAdults(e.target.value)
                          setPeople((parseInt(e.target.value) + parseInt(children)).toString())
                        }}
                        disabled={generatingCost}
                      >
                        <option value="1">1 adult</option>
                        <option value="2">2 adults</option>
                        <option value="3">3 adults</option>
                        <option value="4">4 adults</option>
                        <option value="5">5 adults</option>
                        <option value="6">6 adults</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="children" className="block text-xs text-gray-500 mb-1">Children</label>
                      <select
                        id="children"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        value={children}
                        onChange={(e) => {
                          setChildren(e.target.value)
                          setPeople((parseInt(adults) + parseInt(e.target.value)).toString())
                        }}
                        disabled={generatingCost}
                      >
                        <option value="0">0 children</option>
                        <option value="1">1 child</option>
                        <option value="2">2 children</option>
                        <option value="3">3 children</option>
                        <option value="4">4 children</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Budget Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel style
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setBudget('budget')}
                      disabled={generatingCost}
                      className={`p-4 border rounded-lg text-center transition-colors ${
                        budget === 'budget'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                      } ${generatingCost ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="font-medium">Budget</div>
                      <div className="text-sm text-gray-500">Hostels, street food</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBudget('normal')}
                      disabled={generatingCost}
                      className={`p-4 border rounded-lg text-center transition-colors ${
                        budget === 'normal'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                      } ${generatingCost ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="font-medium">Normal</div>
                      <div className="text-sm text-gray-500">Mid-range hotels</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBudget('luxury')}
                      disabled={generatingCost}
                      className={`p-4 border rounded-lg text-center transition-colors ${
                        budget === 'luxury'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-gray-400'
                      } ${generatingCost ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="font-medium">Luxury</div>
                      <div className="text-sm text-gray-500">High-end hotels</div>
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleGenerateCost}
                  disabled={generatingCost}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  {generatingCost ? 'Calculating your travel cost...' : 'Get my travel cost'}
                </button>
              </div>
            </div>

            {/* Loading State */}
            {generatingCost && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-lg text-gray-700">Your personalized travel cost is being calculated...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            )}

            {/* Generated Cost Breakdown */}
            {costBreakdown && !generatingCost && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Personalized Travel Cost Breakdown
                </h2>
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-li:my-1 prose-strong:font-semibold prose-strong:text-gray-900">
                  <ReactMarkdown>{costBreakdown}</ReactMarkdown>
                </div>
                <button
                  onClick={() => {
                    setCostBreakdown(null)
                    setDays('7')
                    setPeople('2')
                    setAdults('2')
                    setChildren('0')
                    setBudget('normal')
                  }}
                  className="mt-6 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Calculate a new cost breakdown
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
