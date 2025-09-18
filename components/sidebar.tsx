'use client'

import { useState, useEffect } from 'react'
import { useFilters } from '@/contexts/FilterContext'
import getAllContinents, { ContinentWithEmoji } from '@/lib/getAllContinents'

export default function Sidebar() {
  const { filters, updateFilters, clearFilters } = useFilters()
  const [continents, setContinents] = useState<ContinentWithEmoji[]>([])

  useEffect(() => {
    getAllContinents().then(setContinents)
  }, [])

  const handleContinentChange = (continent: string, checked: boolean) => {
    const newContinents = checked 
      ? [...filters.continents, continent]
      : filters.continents.filter((c: string) => c !== continent)
    updateFilters({ continents: newContinents })
  }

  const handleMoodChange = (mood: string, checked: boolean) => {
    const newMoods = checked 
      ? [...filters.moods, mood]
      : filters.moods.filter((m: string) => m !== mood)
    updateFilters({ moods: newMoods })
  }

  const handleCriteriaChange = (criteria: string, checked: boolean) => {
    const newCriteria = checked 
      ? [...filters.criteria, criteria]
      : filters.criteria.filter((c: string) => c !== criteria)
    updateFilters({ criteria: newCriteria })
  }

  const handleFilterTypeChange = (filterType: 'countries' | 'places') => {
    updateFilters({ filterType })
  }

  return (
    <aside className="mb-8 md:mb-0 md:w-80 lg:w-96 md:mr-6 lg:mr-8 md:shrink-0">
      <div data-sticky="" data-margin-top="32" data-sticky-for="768" data-sticky-wrap="">
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-5">
          {/* Header with title and clear button */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button 
              onClick={clearFilters}
              className="text-sm font-medium text-indigo-500 hover:underline cursor-pointer"
            >
              Clear
            </button>
          </div>

          {/* Filter Type Toggle */}
          <div className="mb-6">
            <div className="flex rounded-lg border border-gray-200 p-1 bg-white">
              <button
                onClick={() => handleFilterTypeChange('countries')}
                className={`
                  flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer
                  ${filters.filterType === 'countries'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                Countries
              </button>
              <button
                onClick={() => handleFilterTypeChange('places')}
                className={`
                  flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer
                  ${filters.filterType === 'places'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                Places
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
            {/* Group 4 */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Where do you want to go?</div>
              <ul className="space-y-2">
                {continents.map((continent: ContinentWithEmoji) => (
                  <li key={continent.name}>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="form-checkbox"
                        checked={filters.continents.includes(continent.name)}
                        onChange={(e) => handleContinentChange(continent.name, e.target.checked)}
                      />
                      <span className="text-sm text-gray-600 ml-2">{continent.emoji} {continent.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {/* Group 2 */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">What's your mood</div>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox"
                      checked={filters.moods.includes('beach')}
                      onChange={(e) => handleMoodChange('beach', e.target.checked)}
                    />
                    <span className="text-sm text-gray-600 ml-2">🏖️ Beach</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox"
                      checked={filters.moods.includes('urban')}
                      onChange={(e) => handleMoodChange('urban', e.target.checked)}
                    />
                    <span className="text-sm text-gray-600 ml-2">🏙️ Urban</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox"
                      checked={filters.moods.includes('cultural')}
                      onChange={(e) => handleMoodChange('cultural', e.target.checked)}
                    />
                    <span className="text-sm text-gray-600 ml-2">🏛️ Cultural</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox"
                      checked={filters.moods.includes('affordable')}
                      onChange={(e) => handleMoodChange('affordable', e.target.checked)}
                    />
                    <span className="text-sm text-gray-600 ml-2">💰 Affordable</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="form-checkbox"
                      checked={filters.moods.includes('vibrant')}
                      onChange={(e) => handleMoodChange('vibrant', e.target.checked)}
                    />
                    <span className="text-sm text-gray-600 ml-2">✨ Vibrant</span>
                  </label>
                </li>
              </ul>
            </div>
            {/* Group 1 */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Criterias</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox"
                    checked={filters.criteria.includes('modern')}
                    onChange={(e) => handleCriteriaChange('modern', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 ml-2">🏢 Modern</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox"
                    checked={filters.criteria.includes('historic')}
                    onChange={(e) => handleCriteriaChange('historic', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 ml-2">🏛️ Historic</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox"
                    checked={filters.criteria.includes('coastal')}
                    onChange={(e) => handleCriteriaChange('coastal', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 ml-2">🌊 Coastal</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox"
                    checked={filters.criteria.includes('nightlife')}
                    onChange={(e) => handleCriteriaChange('nightlife', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 ml-2">🎉 Nightlife</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox"
                    checked={filters.criteria.includes('adventure')}
                    onChange={(e) => handleCriteriaChange('adventure', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 ml-2">🏔️ Adventure</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox"
                    checked={filters.criteria.includes('peaceful')}
                    onChange={(e) => handleCriteriaChange('peaceful', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 ml-2">🕊️ Peaceful</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox"
                    checked={filters.criteria.includes('artistic')}
                    onChange={(e) => handleCriteriaChange('artistic', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 ml-2">🎨 Artistic</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox"
                    checked={filters.criteria.includes('emerging')}
                    onChange={(e) => handleCriteriaChange('emerging', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600 ml-2">💎 Emerging</span>
                </label>
              </div>
            </div>
            
            {/* Group 3
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Remote Only</div>
              <div className="flex items-center">
                <div className="form-switch">
                  <input type="checkbox" id="remote-toggle" className="sr-only" checked={remoteJob} onChange={() => setRemoteJob(!remoteJob)} />
                  <label htmlFor="remote-toggle">
                    <span className="bg-white shadow-xs" aria-hidden="true" />
                    <span className="sr-only">Remote Only</span>
                  </label>
                </div>
                <div className="text-sm text-gray-400 italic ml-2">{remoteJob ? 'On' : 'Off'}</div>
              </div>
            </div> */}
            {/* Group 3 
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Salary Range</div>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm text-gray-600 ml-2">$20K - $50K</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm text-gray-600 ml-2">$50K - $100K</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm text-gray-600 ml-2">&gt; $100K</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-sm text-gray-600 ml-2">Drawing / Painting</span>
                  </label>
                </li>
              </ul>
            </div>*/}
            
          </div>
        </div>
      </div>
    </aside>
  )
}