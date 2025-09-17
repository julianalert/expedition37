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

  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ continent: e.target.value })
  }

  const handleMoodChange = (mood: string, checked: boolean) => {
    const newMoods = checked 
      ? [...filters.moods, mood]
      : filters.moods.filter(m => m !== mood)
    updateFilters({ moods: newMoods })
  }

  const handleCriteriaChange = (criteria: string, checked: boolean) => {
    const newCriteria = checked 
      ? [...filters.criteria, criteria]
      : filters.criteria.filter(c => c !== criteria)
    updateFilters({ criteria: newCriteria })
  }

  return (
    <aside className="mb-8 md:mb-0 md:w-80 lg:w-96 md:mr-6 lg:mr-8 md:shrink-0">
      <div data-sticky="" data-margin-top="32" data-sticky-for="768" data-sticky-wrap="">
        <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-5">
          <div className="absolute top-5 right-5 leading-none">
            <button 
              onClick={clearFilters}
              className="text-sm font-medium text-indigo-500 hover:underline cursor-pointer"
            >
              Clear
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
            {/* Group 4 */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Where do you want to go?</div>
              <label className="sr-only">Continent</label>
              <select 
                className="form-select w-full"
                value={filters.continent}
                onChange={handleContinentChange}
              >
                <option value="Anywhere">🗺️ Anywhere</option>
                {continents.map((continent) => (
                  <option key={continent.name} value={continent.name}>
                    {continent.emoji} {continent.name}
                  </option>
                ))}
              </select>
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