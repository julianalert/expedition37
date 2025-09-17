import Link from 'next/link'
import { countryNameToSlug } from '@/lib/countryUtils'

export default function PostItem({ ...props }) {
  const countrySlug = countryNameToSlug(props.name)
  return (
    <Link href={`/${countrySlug}/where-to-go`} className="group block">
      <div className="relative h-80 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${props.image})`,
          }}
        />
        
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        
        {/* Rank indicator */}
        <div className={`absolute top-4 z-10 ${props.featured ? 'right-12' : 'right-4'}`}>
          <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-2 py-1 rounded-full border border-white/30">
            #{props.rank}
          </div>
        </div>

        {/* Featured indicator */}
        {props.featured && (
          <div className="absolute top-4 right-4 z-10">
            <svg className="w-5 h-5 fill-amber-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.143 5.143A4.29 4.29 0 0 1 6.857.857a.857.857 0 0 0-1.714 0A4.29 4.29 0 0 1 .857 5.143a.857.857 0 0 0 0 1.714 4.29 4.29 0 0 1 4.286 4.286.857.857 0 0 0 1.714 0 4.29 4.29 0 0 1 4.286-4.286.857.857 0 0 0 0-1.714Z" />
            </svg>
          </div>
        )}
        
        {/* Continent indicator */}
        <div className="absolute top-4 left-4 z-10">
          <div className="text-sm font-medium text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            {props.continent}
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Empty top section - continent moved to absolute positioning */}
          <div></div>
          
          {/* Country name */}
          <div className="text-left">
            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors duration-200">
              {props.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {props.mood && props.mood.slice(0, 3).map((mood: string, index: number) => (
                <span key={index} className="text-xs text-white/60 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md">
                  {mood}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
