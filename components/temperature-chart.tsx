'use client'

interface TemperatureChartProps {
  temperature: MonthlyTemperature[] | string | null | undefined
  placeName?: string
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
const parseTemperatureData = (data: MonthlyTemperature[] | string | null | undefined): MonthlyTemperature[] => {
  if (!data) return []
  
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (error) {
      console.error('Error parsing temperature data:', error)
      return []
    }
  }
  
  return data
}

// Helper function to get temperature color based on value
const getTemperatureColor = (temp: number): string => {
  if (temp <= 10) return 'bg-blue-500' // Cold - Blue
  if (temp <= 20) return 'bg-cyan-500' // Cool - Cyan
  if (temp <= 25) return 'bg-green-500' // Mild - Green
  if (temp <= 30) return 'bg-yellow-500' // Warm - Yellow
  if (temp <= 35) return 'bg-orange-500' // Hot - Orange
  return 'bg-red-500' // Very Hot - Red
}

// Helper function to calculate bar height based on temperature range
const getBarHeight = (temp: number, minTemp: number, maxTemp: number): number => {
  const range = maxTemp - minTemp
  if (range === 0) return 50 // Default height if all temperatures are the same
  const normalizedTemp = (temp - minTemp) / range
  return Math.max(20, normalizedTemp * 120) // Min height 20px, max height 120px
}

export default function TemperatureChart({ temperature, placeName }: TemperatureChartProps) {
  const temperatureData = parseTemperatureData(temperature)

  if (!temperatureData || temperatureData.length === 0) {
    return null
  }

  // Calculate min and max temperatures for scaling
  const temperatures = temperatureData.map(t => t.avg_temp)
  const minTemp = Math.min(...temperatures)
  const maxTemp = Math.max(...temperatures)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Average Temperature by Month
      </h3>
      
      {/* Chart container */}
      <div className="relative">
        {/* Temperature bars */}
        <div className="flex items-end justify-between mb-4 px-2" style={{ height: '140px' }}>
          {temperatureData.map((monthData, index) => {
            const barHeight = getBarHeight(monthData.avg_temp, minTemp, maxTemp)
            const colorClass = getTemperatureColor(monthData.avg_temp)
            
            return (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                {/* Temperature value */}
                <div className="text-xs font-medium text-gray-600 mb-1">
                  {monthData.avg_temp}°
                </div>
                
                {/* Bar */}
                <div 
                  className={`w-full rounded-t-sm ${colorClass} transition-all duration-300 hover:opacity-80 cursor-default`}
                  style={{ height: `${barHeight}px` }}
                  title={`${monthData.month}: ${monthData.avg_temp}°C`}
                />
              </div>
            )
          })}
        </div>
        
        {/* Month labels */}
        <div className="flex justify-between px-2">
          {temperatureData.map((monthData, index) => (
            <div key={index} className="flex-1 text-center mx-1">
              <div className="text-sm font-medium text-gray-600">
                {getMonthAbbreviation(monthData.month)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Temperature scale legend */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Cold (≤10°)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-cyan-500 rounded"></div>
            <span>Cool (11-20°)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Mild (21-25°)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Warm (26-30°)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>Hot (31-35°)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Very Hot (>35°)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
