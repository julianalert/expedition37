'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function PackingChecklist() {
  const [formData, setFormData] = useState({
    destination: '',
    travelerType: '',
    duration: '',
    specificities: ''
  })
  const [generatingChecklist, setGeneratingChecklist] = useState(false)
  const [checklist, setChecklist] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const travelerTypes = [
    { value: 'solo-male', label: 'Solo Traveler (Male)' },
    { value: 'solo-female', label: 'Solo Traveler (Female)' },
    { value: 'couple', label: 'Couple' },
    { value: 'family', label: 'Family with Kids' },
    { value: 'friends', label: 'Group of Friends' }
  ]

  const durations = [
    { value: 'weekend', label: 'Weekend (2-3 days)' },
    { value: 'short', label: 'Short trip (4-7 days)' },
    { value: 'medium', label: 'Medium trip (1-2 weeks)' },
    { value: 'long', label: 'Long trip (3-4 weeks)' },
    { value: 'extended', label: 'Extended trip (1+ months)' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!formData.destination.trim() || !formData.travelerType || !formData.duration) {
      setError('Please fill in all required fields')
      return
    }

    setGeneratingChecklist(true)

    try {
      const response = await fetch('/api/packing-checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: formData.destination.trim(),
          travelerType: formData.travelerType,
          duration: formData.duration,
          specificities: formData.specificities.trim()
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate packing checklist')
      }

      const data = await response.json()
      setChecklist(data.checklist)
    } catch (error) {
      console.error('Error generating packing checklist:', error)
      setError('Sorry, there was an error generating your packing checklist. Please try again.')
    } finally {
      setGeneratingChecklist(false)
    }
  }

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-left">
            <div className="space-y-6">
              
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="destination">
                  Where are you going? <span className="text-red-500">*</span>
                </label>
                <input 
                  id="destination" 
                  name="destination"
                  className="form-input w-full" 
                  type="text" 
                  required 
                  placeholder="E.g., Paris, Tokyo, Bali..."
                  value={formData.destination}
                  onChange={handleInputChange}
                />
              </div>

              {/* Traveler Type */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="travelerType">
                  Who is traveling? <span className="text-red-500">*</span>
                </label>
                <select 
                  id="travelerType" 
                  name="travelerType"
                  className="form-select w-full" 
                  required
                  value={formData.travelerType}
                  onChange={handleInputChange}
                >
                  <option value="">Select traveler type</option>
                  {travelerTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="duration">
                  How long are you staying? <span className="text-red-500">*</span>
                </label>
                <select 
                  id="duration" 
                  name="duration"
                  className="form-select w-full" 
                  required
                  value={formData.duration}
                  onChange={handleInputChange}
                >
                  <option value="">Select trip duration</option>
                  {durations.map((dur) => (
                    <option key={dur.value} value={dur.value}>
                      {dur.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specificities */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="specificities">
                  Any specificities?
                </label>
                <textarea 
                  id="specificities" 
                  name="specificities"
                  className="form-textarea text-sm py-2 w-full" 
                  rows={4} 
                  placeholder="E.g., Beach activities, hiking, business meetings, photography, cold weather, formal events..."
                  value={formData.specificities}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Tell us about planned activities, special interests, or specific needs for your trip
                </p>
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
                  disabled={generatingChecklist}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  {generatingChecklist ? 'Creating your packing checklist...' : 'Generate My Packing Checklist'}
                </button>
              </div>

            </div>
          </form>

          {/* Loading State */}
          {generatingChecklist && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-lg text-gray-700">Your personalized packing checklist is being created...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          )}

          {/* Generated Checklist */}
          {checklist && !generatingChecklist && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Personalized Packing Checklist
              </h2>
              <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-li:my-1 prose-strong:font-semibold prose-strong:text-gray-900">
                <ReactMarkdown>{checklist}</ReactMarkdown>
              </div>
              <button
                onClick={() => {
                  setChecklist(null)
                  setFormData({
                    destination: '',
                    travelerType: '',
                    duration: '',
                    specificities: ''
                  })
                  setError(null)
                }}
                className="mt-6 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Create a new packing checklist
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
