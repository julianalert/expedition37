'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function BudgetCalculator() {
  const [formData, setFormData] = useState({
    destination: '',
    days: '7',
    adults: '2',
    children: '0',
    budget: 'normal'
  })
  const [generatingCost, setGeneratingCost] = useState(false)
  const [costBreakdown, setCostBreakdown] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBudgetChange = (budgetType: string) => {
    setFormData(prev => ({
      ...prev,
      budget: budgetType
    }))
  }

  const handleGenerateCost = async () => {
    if (!formData.destination.trim()) {
      setError('Please enter a destination!')
      return
    }

    setGeneratingCost(true)
    setError(null)
    setCostBreakdown(null)

    try {
      const totalPeople = (parseInt(formData.adults) + parseInt(formData.children)).toString()
      
      const response = await fetch('/api/cost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: formData.destination,
          days: formData.days,
          people: totalPeople,
          adults: formData.adults,
          children: formData.children,
          budget: formData.budget,
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

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">

          {/* Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-left">
            <div className="space-y-6">
              
              {/* Destination Input */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="destination">
                  Where do you plan to go? <span className="text-red-500">*</span>
                </label>
                <input 
                  id="destination" 
                  name="destination"
                  className="form-input w-full" 
                  type="text" 
                  required 
                  placeholder="E.g., Tokyo, Japan"
                  value={formData.destination}
                  onChange={handleInputChange}
                  disabled={generatingCost}
                />
              </div>

              {/* Days and People Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Days Input */}
                <div>
                  <label htmlFor="days" className="block text-sm font-medium mb-1">
                    How many days? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="days"
                    name="days"
                    className="form-select text-sm py-2 w-full"
                    value={formData.days}
                    onChange={handleInputChange}
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
                  <label className="block text-sm font-medium mb-1">
                    How many people? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <select
                        id="adults"
                        name="adults"
                        className="form-select text-sm py-2 w-full"
                        value={formData.adults}
                        onChange={handleInputChange}
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
                      <select
                        id="children"
                        name="children"
                        className="form-select text-sm py-2 w-full"
                        value={formData.children}
                        onChange={handleInputChange}
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

              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Travel style <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => handleBudgetChange('budget')}
                    disabled={generatingCost}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      formData.budget === 'budget'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${generatingCost ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="font-medium">Budget</div>
                    <div className="text-sm text-gray-500">Hostels, street food</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBudgetChange('normal')}
                    disabled={generatingCost}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      formData.budget === 'normal'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${generatingCost ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="font-medium">Normal</div>
                    <div className="text-sm text-gray-500">Mid-range hotels</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBudgetChange('luxury')}
                    disabled={generatingCost}
                    className={`p-4 border rounded-lg text-center transition-colors ${
                      formData.budget === 'luxury'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-gray-400'
                    } ${generatingCost ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
              <div className="pt-4">
                <button 
                  onClick={handleGenerateCost}
                  disabled={generatingCost}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                >
                  {generatingCost ? 'Calculating your travel cost...' : 'Get My Travel Cost Breakdown'}
                </button>
              </div>

            </div>
          </div>

          {/* Loading State */}
          {generatingCost && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-lg text-gray-700">Your personalized travel cost is being calculated...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          )}

          {/* Generated Cost Breakdown */}
          {costBreakdown && !generatingCost && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Personalized Travel Cost Breakdown
              </h2>
              <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-li:my-1 prose-strong:font-semibold prose-strong:text-gray-900">
                <ReactMarkdown>{costBreakdown}</ReactMarkdown>
              </div>
              <button
                onClick={() => {
                  setCostBreakdown(null)
                  setFormData({
                    destination: '',
                    days: '7',
                    adults: '2',
                    children: '0',
                    budget: 'normal'
                  })
                  setError(null)
                }}
                className="mt-6 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Calculate a new cost breakdown
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
