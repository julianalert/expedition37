'use client'

import { useState, useEffect } from 'react'
import { useFilters } from '@/contexts/FilterContext'
import getAllContinents, { ContinentWithEmoji } from '@/lib/getAllContinents'
import getAllCountries from '@/lib/getAllCountries'
import getAllCities from '@/lib/getAllCities'

export default function Sidebar() {
  const { filters, updateFilters, clearFilters } = useFilters()
  const [continents, setContinents] = useState<ContinentWithEmoji[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [cities, setCities] = useState<City[]>([])

  useEffect(() => {
    getAllContinents().then(setContinents)
    getAllCountries().then(setCountries)
    getAllCities().then(setCities)
  }, [])

  const handleContinentChange = (continent: string, checked: boolean) => {
    const newContinents = checked 
      ? [...filters.continents, continent]
      : filters.continents.filter((c: string) => c !== continent)
    updateFilters({ continents: newContinents })
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

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ budget: e.target.value })
  }

  const handleAdditionalChange = (additional: string, checked: boolean) => {
    const newAdditional = checked 
      ? [...filters.additional, additional]
      : filters.additional.filter((a: string) => a !== additional)
    updateFilters({ additional: newAdditional })
  }

  const handleVacationGoalChange = (goal: string, checked: boolean) => {
    const newVacationGoals = checked 
      ? [...filters.vacationGoal, goal]
      : filters.vacationGoal.filter((g: string) => g !== goal)
    updateFilters({ vacationGoal: newVacationGoals })
  }

  // Function to get count of countries or cities in a continent
  const getContinentCount = (continentName: string): number => {
    if (filters.filterType === 'countries') {
      return countries.filter((country: Country) => country.continent === continentName).length
    } else {
      // For cities, we need to count cities whose countries are in this continent
      return cities.filter((city: City) => {
        const cityCountry = countries.find((country: Country) => country.id === city.country)
        return cityCountry && cityCountry.continent === continentName
      }).length
    }
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
                      <span className="text-sm text-gray-600 ml-2">{continent.emoji} {continent.name} ({getContinentCount(continent.name)})</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vacation Goal */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">What's your vacation goal?</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleVacationGoalChange('relax', !filters.vacationGoal.includes('relax'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.vacationGoal.includes('relax')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🧘 Relax
                </button>
                <button
                  onClick={() => handleVacationGoalChange('explore-culture', !filters.vacationGoal.includes('explore-culture'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.vacationGoal.includes('explore-culture')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🏛️ Explore a culture
                </button>
                <button
                  onClick={() => handleVacationGoalChange('have-fun', !filters.vacationGoal.includes('have-fun'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.vacationGoal.includes('have-fun')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🎉 Have fun
                </button>
                <button
                  onClick={() => handleVacationGoalChange('sports-activities', !filters.vacationGoal.includes('sports-activities'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.vacationGoal.includes('sports-activities')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  ⚽ Engage in sports activities
                </button>
                <button
                  onClick={() => handleVacationGoalChange('romantic', !filters.vacationGoal.includes('romantic'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.vacationGoal.includes('romantic')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  💕 Romantic
                </button>
              </div>
            </div>

            {/* What matters to you */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">What matters to you?</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">👮‍♂️ Safety</span>
                  <div className="form-switch">
                    <input 
                      type="checkbox" 
                      id="safety-toggle" 
                      className="sr-only" 
                      checked={filters.criteria.includes('safety')} 
                      onChange={() => handleCriteriaChange('safety', !filters.criteria.includes('safety'))} 
                    />
                    <label htmlFor="safety-toggle">
                      <span className="bg-white shadow-xs" aria-hidden="true" />
                      <span className="sr-only">Safety</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">📡 Fast internet</span>
                  <div className="form-switch">
                    <input 
                      type="checkbox" 
                      id="fast-internet-toggle" 
                      className="sr-only" 
                      checked={filters.criteria.includes('fast-internet')} 
                      onChange={() => handleCriteriaChange('fast-internet', !filters.criteria.includes('fast-internet'))} 
                    />
                    <label htmlFor="fast-internet-toggle">
                      <span className="bg-white shadow-xs" aria-hidden="true" />
                      <span className="sr-only">Fast internet</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">💨 Clean air</span>
                  <div className="form-switch">
                    <input 
                      type="checkbox" 
                      id="clean-air-toggle" 
                      className="sr-only" 
                      checked={filters.criteria.includes('clean-air')} 
                      onChange={() => handleCriteriaChange('clean-air', !filters.criteria.includes('clean-air'))} 
                    />
                    <label htmlFor="clean-air-toggle">
                      <span className="bg-white shadow-xs" aria-hidden="true" />
                      <span className="sr-only">Clean air</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">💎 Hidden gem</span>
                  <div className="form-switch">
                    <input 
                      type="checkbox" 
                      id="hidden-gem-toggle" 
                      className="sr-only" 
                      checked={filters.criteria.includes('hidden-gem')} 
                      onChange={() => handleCriteriaChange('hidden-gem', !filters.criteria.includes('hidden-gem'))} 
                    />
                    <label htmlFor="hidden-gem-toggle">
                      <span className="bg-white shadow-xs" aria-hidden="true" />
                      <span className="sr-only">Hidden gem</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">🔥 Popular now</span>
                  <div className="form-switch">
                    <input 
                      type="checkbox" 
                      id="popular-now-toggle" 
                      className="sr-only" 
                      checked={filters.criteria.includes('popular-now')} 
                      onChange={() => handleCriteriaChange('popular-now', !filters.criteria.includes('popular-now'))} 
                    />
                    <label htmlFor="popular-now-toggle">
                      <span className="bg-white shadow-xs" aria-hidden="true" />
                      <span className="sr-only">Popular now</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">👦 Family Friendly</span>
                  <div className="form-switch">
                    <input 
                      type="checkbox" 
                      id="family-friendly-toggle" 
                      className="sr-only" 
                      checked={filters.criteria.includes('family-friendly')} 
                      onChange={() => handleCriteriaChange('family-friendly', !filters.criteria.includes('family-friendly'))} 
                    />
                    <label htmlFor="family-friendly-toggle">
                      <span className="bg-white shadow-xs" aria-hidden="true" />
                      <span className="sr-only">Family Friendly</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Filter */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Weekly Budget</div>
              <label className="sr-only">Weekly Budget</label>
              <select 
                className="form-select w-full"
                value={filters.budget}
                onChange={handleBudgetChange}
              >
                <option value="">Any budget</option>
                <option value="<1k">💰 &lt;US$1K/week</option>
                <option value="<2k">💸 &lt;US$2K/week</option>
                <option value="<3k">💵 &lt;US$3K/week</option>
              </select>
            </div>

            {/* You may also want */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">You may also want...</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleAdditionalChange('amazing-food', !filters.additional.includes('amazing-food'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.additional.includes('amazing-food')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🍜 Amazing Food
                </button>
                <button
                  onClick={() => handleAdditionalChange('nightlife', !filters.additional.includes('nightlife'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.additional.includes('nightlife')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🍸 Nightlife
                </button>
                <button
                  onClick={() => handleAdditionalChange('great-for-dating', !filters.additional.includes('great-for-dating'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.additional.includes('great-for-dating')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  💕 Great for dating
                </button>
                <button
                  onClick={() => handleAdditionalChange('eco-friendly', !filters.additional.includes('eco-friendly'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.additional.includes('eco-friendly')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🌱 Eco friendly
                </button>
                <button
                  onClick={() => handleAdditionalChange('dog-friendly', !filters.additional.includes('dog-friendly'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.additional.includes('dog-friendly')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🐕 Dog friendly
                </button>
                <button
                  onClick={() => handleAdditionalChange('lgbtq-friendly', !filters.additional.includes('lgbtq-friendly'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.additional.includes('lgbtq-friendly')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🏳️‍🌈 LGBTQ+ friendly
                </button>
                <button
                  onClick={() => handleAdditionalChange('low-racism', !filters.additional.includes('low-racism'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.additional.includes('low-racism')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🤝 Low racism
                </button>
                <button
                  onClick={() => handleAdditionalChange('muslim-friendly', !filters.additional.includes('muslim-friendly'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.additional.includes('muslim-friendly')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  ☪️ Muslim friendly
                </button>
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