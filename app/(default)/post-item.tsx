import Link from 'next/link'

export default function PostItem({ ...props }) {
  return (
    <Link href={`/posts/${props.id}`} className="group block">
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
        
        {/* Featured indicator */}
        {props.featured && (
          <div className="absolute top-4 right-4 z-10">
            <svg className="w-5 h-5 fill-amber-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.143 5.143A4.29 4.29 0 0 1 6.857.857a.857.857 0 0 0-1.714 0A4.29 4.29 0 0 1 .857 5.143a.857.857 0 0 0 0 1.714 4.29 4.29 0 0 1 4.286 4.286.857.857 0 0 0 1.714 0 4.29 4.29 0 0 1 4.286-4.286.857.857 0 0 0 0-1.714Z" />
            </svg>
          </div>
        )}
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Rank */}
          <div className="flex justify-start">
            <div className="text-4xl font-bold text-white/90">
              {props.rank}
            </div>
          </div>
          
          {/* City and country */}
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors duration-200">
              {props.city}
            </h3>
            <p className="text-white/80 text-sm font-medium">
              {props.country}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
