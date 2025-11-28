'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function NearMe() {
  const [locationData, setLocationData] = useState<{
    latitude: number
    longitude: number
    city?: string
    country?: string
  } | null>(null)
  const [gettingLocation, setGettingLocation] = useState(false)
  const [generatingResults, setGeneratingResults] = useState(false)
  const [results, setResults] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = () => {
    setGettingLocation(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.')
      setGettingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Try to get city/country name from coordinates using reverse geocoding
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
          const locationInfo = await response.json()
          
          setLocationData({
            latitude,
            longitude,
            city: locationInfo.city || locationInfo.locality,
            country: locationInfo.countryName
          })
        } catch (err) {
          // If reverse geocoding fails, just use coordinates
          setLocationData({
            latitude,
            longitude
          })
        }
        
        setGettingLocation(false)
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please allow location access and try again.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        
        setError(errorMessage)
        setGettingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }

  const findNearbyPlaces = async () => {
    if (!locationData) return

    setGeneratingResults(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/near-me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          city: locationData.city,
          country: locationData.country
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to find nearby places')
      }

      const data = await response.json()
      setResults(data.results)
    } catch (err) {
      setError('Failed to find nearby places. Please try again.')
    } finally {
      setGeneratingResults(false)
    }
  }

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">

          {/* Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm text-left">
            <div className="space-y-6">
              
              {/* Location Section */}
              <div className="text-center">
                {!locationData ? (
                  <div>
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Amazing Places Near You</h3>
                    <p className="text-gray-600 mb-6">
                      Allow us to access your location to discover interesting places, cities, airports, and hotels nearby.
                    </p>
                    <button
                      onClick={getCurrentLocation}
                      disabled={gettingLocation}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {gettingLocation ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Getting your location...
                        </span>
                      ) : (
                        'Get My Location'
                      )}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Location Found!</h3>
                    <p className="text-gray-600 mb-4">
                      {locationData.city && locationData.country 
                        ? `${locationData.city}, ${locationData.country}`
                        : `${locationData.latitude.toFixed(4)}, ${locationData.longitude.toFixed(4)}`
                      }
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={findNearbyPlaces}
                        disabled={generatingResults}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {generatingResults ? 'Finding nearby places...' : 'Find Nearby Places'}
                      </button>
                      <button
                        onClick={() => {
                          setLocationData(null)
                          setResults(null)
                          setError(null)
                        }}
                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors cursor-pointer"
                      >
                        Use Different Location
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

            </div>
          </div>

          {/* Loading State */}
          {generatingResults && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mb-4"></div>
              <p className="text-lg text-gray-700">Discovering amazing places near you...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          )}

          {/* Generated Results */}
          {results && !generatingResults && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Amazing Places Near You
              </h2>
              <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:my-4 prose-li:my-1 prose-strong:font-semibold prose-strong:text-gray-900">
                <ReactMarkdown>{results}</ReactMarkdown>
              </div>
              <button
                onClick={() => {
                  setResults(null)
                  setLocationData(null)
                  setError(null)
                }}
                className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Search a new location
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
