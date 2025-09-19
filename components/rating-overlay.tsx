'use client'

import React from 'react'

interface RatingOverlayProps {
  overallRating?: number
  costRating?: number
  safetyRating?: number
  funRating?: number
  foodRating?: number
}

interface RatingBarProps {
  label: string
  rating: number
  icon: React.ReactNode
}

const RatingBar: React.FC<RatingBarProps> = ({ label, rating, icon }) => {
  // Convert rating from 20-100 scale to 0-100 percentage for the bar width
  const percentage = Math.max(0, Math.min(100, ((rating - 20) / 80) * 100))
  
  // Dynamic color based on rating score
  const getColorClass = (score: number): string => {
    if (score >= 75) return 'bg-green-500'      // Good: green (75+)
    if (score >= 50) return 'bg-yellow-500'     // Middle: yellow (50-74)
    if (score >= 30) return 'bg-orange-500'     // Low: orange (30-49)
    return 'bg-red-500'                         // Very low: red (below 30)
  }
  
  const color = getColorClass(rating)
  
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex items-center gap-2 w-20">
        <div className="text-white/90 text-xs">{icon}</div>
        <span className="text-white/90 text-xs font-medium">{label}</span>
      </div>
      <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-white/90 text-xs font-bold w-8 text-right">
        {Math.round(rating)}
      </div>
    </div>
  )
}

const RatingOverlay: React.FC<RatingOverlayProps> = ({
  overallRating,
  costRating,
  safetyRating,
  funRating,
  foodRating
}) => {
  // Debug: Log received rating values
  console.log('RatingOverlay received:', {
    overallRating,
    costRating,
    safetyRating,
    funRating,
    foodRating
  })
  
  // Use default values if ratings are undefined
  const finalOverallRating = overallRating ?? 75
  const finalCostRating = costRating ?? 65
  const finalSafetyRating = safetyRating ?? 85
  const finalFunRating = funRating ?? 70
  const finalFoodRating = foodRating ?? 80
  const ratings = [
    {
      label: 'Overall',
      rating: finalOverallRating,
      icon: <span>⭐</span>
    },
    {
      label: 'Cost',
      rating: finalCostRating,
      icon: <span>💰</span>
    },
    {
      label: 'Safety',
      rating: finalSafetyRating,
      icon: <span>🛡️</span>
    },
    {
      label: 'Fun',
      rating: finalFunRating,
      icon: <span>🎉</span>
    },
    {
      label: 'Food',
      rating: finalFoodRating,
      icon: <span>🍽️</span>
    }
  ]

  return (
    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 rounded-xl">
      <div className="w-full max-w-xs">
        {ratings.map((rating, index) => (
          <RatingBar
            key={index}
            label={rating.label}
            rating={rating.rating}
            icon={rating.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default RatingOverlay
