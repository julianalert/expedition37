'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { slugToCountryName } from '@/lib/countryUtils'

interface CostProps {
  country: Country | null
}

export default function Cost({ country }: CostProps) {
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
  )
}
