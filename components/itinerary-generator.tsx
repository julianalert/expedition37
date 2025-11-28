'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ItineraryGenerator() {
  const [formData, setFormData] = useState({
    to: '',
    activities: '',
    duration: ''
  })
  const [generatingItinerary, setGeneratingItinerary] = useState(false)
  const [itinerary, setItinerary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.to.trim() || !formData.activities.trim() || !formData.duration) {
      setError('Please fill in all required fields!')
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
          destination: formData.to,
          interests: formData.activities,
          duration: formData.duration,
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

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-left">
            <div className="space-y-6">
              
              {/* Destination input */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="to">
                  Where do you plan to go? <span className="text-red-500">*</span>
                </label>
                <input 
                  id="to" 
                  name="to"
                  className="form-input w-full" 
                  type="text" 
                  required 
                  placeholder="E.g., Tokyo, Japan"
                  value={formData.to}
                  onChange={handleInputChange}
                />
              </div>

              {/* What do you want to do */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="activities">
                  What do you want to do? <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="activities" 
                  name="activities"
                  className="form-textarea text-sm py-2 w-full" 
                  rows={4} 
                  required 
                  placeholder="E.g., Visit temples, try local food, explore nightlife, hiking, museums, shopping..."
                  value={formData.activities}
                  onChange={handleInputChange}
                />
              </div>

              {/* Length of trip */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="duration">
                  Length of trip <span className="text-red-500">*</span>
                </label>
                <select 
                  id="duration" 
                  name="duration"
                  className="form-select text-sm py-2 w-full" 
                  required
                  value={formData.duration}
                  onChange={handleInputChange}
                >
                  <option value="">Select duration</option>
                  <option value="1-2 days">1-2 days</option>
                  <option value="3-4 days">3-4 days</option>
                  <option value="5-7 days">5-7 days (1 week)</option>
                  <option value="8-14 days">8-14 days (2 weeks)</option>
                  <option value="15-21 days">15-21 days (3 weeks)</option>
                  <option value="22-30 days">22-30 days (1 month)</option>
                  <option value="30+ days">30+ days (1+ month)</option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={generatingItinerary}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  {generatingItinerary ? 'Creating your itinerary...' : 'Create My Personalized Itinerary'}
                </button>
              </div>

            </div>
          </form>

          {/* Loading State */}
          {generatingItinerary && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-lg text-gray-700">Your personalized itinerary is being created...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          )}

          {/* Generated Itinerary */}
          {itinerary && !generatingItinerary && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Personalized Itinerary
              </h2>
              <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-li:my-1 prose-strong:font-semibold prose-strong:text-gray-900">
                <ReactMarkdown>{itinerary}</ReactMarkdown>
              </div>
              <button
                onClick={() => {
                  setItinerary(null)
                  setFormData({
                    to: '',
                    activities: '',
                    duration: ''
                  })
                  setError(null)
                }}
                className="mt-6 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Create a new itinerary
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
