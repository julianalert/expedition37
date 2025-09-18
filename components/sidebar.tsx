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

  const handleBudgetChange = (budget: string, checked: boolean) => {
    const newBudgets = checked 
      ? [...filters.budget, budget]
      : filters.budget.filter((b: string) => b !== budget)
    updateFilters({ budget: newBudgets })
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
            {/* What matters to you */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">What matters to you?</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCriteriaChange('safety', !filters.criteria.includes('safety'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.criteria.includes('safety')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  👮‍♂️ Safety
                </button>
                <button
                  onClick={() => handleCriteriaChange('fast-internet', !filters.criteria.includes('fast-internet'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.criteria.includes('fast-internet')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  📡 Fast internet
                </button>
                <button
                  onClick={() => handleCriteriaChange('clean-air', !filters.criteria.includes('clean-air'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.criteria.includes('clean-air')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  💨 Clean air
                </button>
                <button
                  onClick={() => handleCriteriaChange('hidden-gem', !filters.criteria.includes('hidden-gem'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.criteria.includes('hidden-gem')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  💎 Hidden gem
                </button>
                <button
                  onClick={() => handleCriteriaChange('popular-now', !filters.criteria.includes('popular-now'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.criteria.includes('popular-now')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  🔥 Popular now
                </button>
                <button
                  onClick={() => handleCriteriaChange('family-friendly', !filters.criteria.includes('family-friendly'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.criteria.includes('family-friendly')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  👦 Family Friendly
                </button>
              </div>
            </div>

            {/* Budget Filter */}
            <div>
              <div className="text-sm text-gray-800 font-semibold mb-3">Monthly Budget</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleBudgetChange('<1k', !filters.budget.includes('<1k'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.budget.includes('<1k')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  💰 &lt;US$1K/mo
                </button>
                <button
                  onClick={() => handleBudgetChange('<2k', !filters.budget.includes('<2k'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.budget.includes('<2k')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  💸 &lt;US$2K/mo
                </button>
                <button
                  onClick={() => handleBudgetChange('<3k', !filters.budget.includes('<3k'))}
                  className={`
                    px-3 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer border
                    ${filters.budget.includes('<3k')
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                      : 'text-gray-600 border-gray-200 bg-white hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                    }
                  `}
                >
                  💵 &lt;US$3K/mo
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