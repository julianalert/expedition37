'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { slugToCountryName } from '@/lib/countryUtils'

interface ItineraryProps {
  country: Country | null
}

export default function Itinerary({ country }: ItineraryProps) {
  const [interests, setInterests] = useState('')
  const [duration, setDuration] = useState('1 week')
  const [generatingItinerary, setGeneratingItinerary] = useState(false)
  const [itinerary, setItinerary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)


  const handleGenerateItinerary = async () => {
    if (!interests.trim()) {
      setError('Please tell us what you want to do!')
      return
    }

    setGeneratingItinerary(true)
    setError(null)
    setItinerary(null)

    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: country?.name || 'Unknown Country',
          interests: interests,
          duration: duration,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate itinerary')
      }

      const data = await response.json()
      setItinerary(data.itinerary)
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.')
    } finally {
      setGeneratingItinerary(false)
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
                Itinerary for {displayCountryName}
              </h1>
              <p className="text-gray-600">
                Create a personalized travel itinerary for your trip to {displayCountryName}
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="space-y-6">
                {/* Interests Input */}
                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                    What do you want to do?
                  </label>
                  <textarea
                    id="interests"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="e.g., Visit major cities, explore nature, try local food, experience culture..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    disabled={generatingItinerary}
                  />
                </div>

                {/* Duration Dropdown */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                    Length of stay
                  </label>
                  <select
                    id="duration"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    disabled={generatingItinerary}
                  >
                    <option value="1 day">1 day</option>
                    <option value="2 days">2 days</option>
                    <option value="3 days">3 days</option>
                    <option value="5 days">5 days</option>
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                  </select>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleGenerateItinerary}
                  disabled={generatingItinerary}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {generatingItinerary ? 'Creating your itinerary...' : 'Create my personalized itinerary'}
                </button>
              </div>
            </div>

            {/* Loading State */}
            {generatingItinerary && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-lg text-gray-700">Your personalized itinerary is being created...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            )}

            {/* Generated Itinerary */}
            {itinerary && !generatingItinerary && (
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Personalized Itinerary
                </h2>
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-li:my-1 prose-strong:font-semibold prose-strong:text-gray-900">
                  <ReactMarkdown>{itinerary}</ReactMarkdown>
                </div>
                <button
                  onClick={() => {
                    setItinerary(null)
                    setInterests('')
                  }}
                  className="mt-6 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Create a new itinerary
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

