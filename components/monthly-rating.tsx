'use client'

interface MonthlyRatingProps {
  bestTimeToVisit: MonthlyRating[] | string | null | undefined
  placeName?: string
}

// Helper function to get emoji based on rating
const getRatingEmoji = (rating: string): string => {
  switch (rating) {
    case 'good':
      return '🟢'
    case 'medium':
      return '🟡'
    case 'bad':
      return '🔴'
    default:
      return '🟡'
  }
}

// Helper function to get month abbreviations
const getMonthAbbreviation = (month: string): string => {
  const monthMap: { [key: string]: string } = {
    'January': 'jan',
    'February': 'feb',
    'March': 'mar',
    'April': 'apr',
    'May': 'may',
    'June': 'jun',
    'July': 'jul',
    'August': 'aug',
    'September': 'sep',
    'October': 'oct',
    'November': 'nov',
    'December': 'dec'
  }
  return monthMap[month] || month.toLowerCase().slice(0, 3)
}

// Helper function to parse JSON string if needed
const parseRatingData = (data: MonthlyRating[] | string | null | undefined): MonthlyRating[] => {
  if (!data) return []
  
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (error) {
      console.error('Error parsing bestTimeToVisit data:', error)
      return []
    }
  }
  
  return data
}

export default function MonthlyRating({ bestTimeToVisit, placeName }: MonthlyRatingProps) {
  const ratingData = parseRatingData(bestTimeToVisit)

  if (!ratingData || ratingData.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        When to visit {placeName}
      </h2>
      
      {/* Month headers */}
      <div className="grid grid-cols-12 gap-2 mb-4">
        {ratingData.map((monthData, index) => (
          <div key={index} className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-2">
              {getMonthAbbreviation(monthData.month)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Rating emojis */}
      <div className="grid grid-cols-12 gap-2">
        {ratingData.map((monthData, index) => (
          <div key={index} className="text-center">
            <div 
              className="text-2xl transition-transform hover:scale-110 cursor-default"
              title={`${monthData.month}: ${monthData.rating}`}
            >
              {getRatingEmoji(monthData.rating)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🟢</span>
            <span>Great time to visit</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">🟡</span>
            <span>Okay to visit</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">🔴</span>
            <span>Avoid if possible</span>
          </div>
        </div>
      </div>
    </div>
  )
}
