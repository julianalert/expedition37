import Image from 'next/image'
import TestimonialsImage01 from '@/public/images/sarah.jpg'
import TestimonialsImage02 from '@/public/images/marcus.jpg'
import TestimonialsImage03 from '@/public/images/elena.jpg'
import TestimonialsImage04 from '@/public/images/david.png'
import TestimonialsImage05 from '@/public/images/aisha.png'
import TestimonialsImage06 from '@/public/images/james.jpg'
import TestimonialsImage07 from '@/public/images/sofia.jpg'
import TestimonialsImage08 from '@/public/images/olivier.jpg'
import TestimonialsImage09 from '@/public/images/fatima.png'
import TestimonialsImage10 from '@/public/images/lucas.jpg'
import TestimonialsImage11 from '@/public/images/priya.jpg'
import TestimonialsImage12 from '@/public/images/miguel.jpg'


export default function HomepageTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "San Francisco, USA",
      age: "29yo",
      image: TestimonialsImage01,
      quote: "Detour helped me discover the perfect hidden gems in Southeast Asia. The personalized recommendations were spot-on, and I had the most incredible adventure of my life!",
      destination: "Discovered: Palawan, Philippines",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      nameColor: "text-purple-600",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Johnson",
      location: "London, UK",
      age: "34yo",
      image: TestimonialsImage02,
      quote: "As a digital nomad, finding destinations with fast internet and great coworking spaces was crucial. This platform nailed it every time!",
      destination: "Discovered: Lisbon, Portugal",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      nameColor: "text-blue-600",
      rating: 5
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      location: "Barcelona, Spain",
      age: "27yo",
      image: TestimonialsImage03,
      quote: "The budget filters saved me so much time! I found amazing destinations that matched my tight student budget perfectly.",
      destination: "Discovered: Prague, Czech Republic",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      nameColor: "text-emerald-600",
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      location: "Toronto, Canada",
      age: "42yo",
      image: TestimonialsImage04,
      quote: "Planning a family vacation was overwhelming until I found this. The family-friendly filters and safety ratings gave me peace of mind.",
      destination: "Discovered: Costa Rica",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      nameColor: "text-amber-600",
      rating: 5
    },
    {
      id: 5,
      name: "Aisha Patel",
      location: "Mumbai, India",
      age: "31yo",
      image: TestimonialsImage05,
      quote: "I was looking for a romantic getaway that wasn't too touristy. The hidden gems filter led us to the most magical week in Slovenia!",
      destination: "Discovered: Lake Bled, Slovenia",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
      borderColor: "border-rose-200",
      nameColor: "text-rose-600",
      rating: 5
    },
    {
      id: 6,
      name: "James Thompson",
      location: "Sydney, Australia",
      age: "38yo",
      image: TestimonialsImage06,
      quote: "The seasonal recommendations are incredible. I never would have thought to visit Japan in autumn, but it was absolutely perfect!",
      destination: "Discovered: Kyoto, Japan",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200",
      nameColor: "text-indigo-600",
      rating: 5
    },
    {
      id: 7,
      name: "Sofia Martinez",
      location: "Mexico City, Mexico",
      age: "26yo",
      image: TestimonialsImage07,
      quote: "I wanted to explore Europe but avoid the crowds. The hidden gems filter showed me incredible places I'd never heard of before!",
      destination: "Discovered: Faroe Islands",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
      borderColor: "border-violet-200",
      nameColor: "text-violet-600",
      rating: 5
    },
    {
      id: 8,
      name: "Oliver Chen",
      location: "Singapore",
      age: "33yo",
      image: TestimonialsImage08,
      quote: "As someone who travels for work, the fast internet filter was a game-changer. Found amazing destinations where I could work remotely.",
      destination: "Discovered: Tallinn, Estonia",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
      borderColor: "border-cyan-200",
      nameColor: "text-cyan-600",
      rating: 5
    },
    {
      id: 9,
      name: "Fatima Al-Rashid",
      location: "Dubai, UAE",
      age: "29yo",
      image: TestimonialsImage09,
      quote: "Finding Muslim-friendly destinations used to be so challenging. This platform made it effortless to plan my perfect halal vacation!",
      destination: "Discovered: Sarajevo, Bosnia",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      nameColor: "text-green-600",
      rating: 5
    },
    {
      id: 10,
      name: "Lucas Andersson",
      location: "Stockholm, Sweden",
      age: "35yo",
      image: TestimonialsImage10,
      quote: "The eco-friendly filter helped me find sustainable travel options that aligned with my values. Incredible experience in Costa Rica!",
      destination: "Discovered: Monteverde, Costa Rica",
      bgColor: "bg-gradient-to-br from-lime-50 to-green-50",
      borderColor: "border-lime-200",
      nameColor: "text-lime-600",
      rating: 5
    },
    {
      id: 11,
      name: "Priya Sharma",
      location: "Delhi, India",
      age: "28yo",
      image: TestimonialsImage11,
      quote: "Traveling solo as a woman requires careful planning. The safety ratings and recommendations gave me confidence to explore new places.",
      destination: "Discovered: Reykjavik, Iceland",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
      borderColor: "border-pink-200",
      nameColor: "text-pink-600",
      rating: 5
    },
    {
      id: 12,
      name: "Miguel Santos",
      location: "São Paulo, Brazil",
      age: "41yo",
      image: TestimonialsImage12,
      quote: "The nightlife and food scene filters are amazing! Found the perfect city that combined incredible cuisine with vibrant nightlife.",
      destination: "Discovered: Buenos Aires, Argentina",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      nameColor: "text-orange-600",
      rating: 5
    }
  ]

  const StarIcon = () => (
    <svg className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
      <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.2l-5.2 2.9 1-5.8L1.5 7.2l5.9-.9z"/>
    </svg>
  )

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by travelers worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of adventurers who've discovered their perfect destinations with our personalized recommendations
          </p>
          <div className="flex items-center justify-center mt-6 space-x-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <span className="text-gray-600 font-medium">4.9/5 from 2,847 travelers</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className={`${testimonial.bgColor} ${testimonial.borderColor} border-2 rounded-2xl p-6 transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out relative overflow-hidden`}
            >
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-20">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20h10l8.5-20H12L0 20zm21.5 0H32L40.5 0H34l-12.5 20z" fill="currentColor"/>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-800 font-medium mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Destination discovered */}
                <div className={`${testimonial.nameColor} text-sm font-semibold mb-4 px-3 py-1 rounded-full ${testimonial.bgColor} border ${testimonial.borderColor} inline-block`}>
                  ✈️ {testimonial.destination}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={50} 
                      height={50} 
                      className="rounded-full ring-2 ring-white shadow-lg"
                    />
                  </div>
                  <div>
                    <div className={`font-bold ${testimonial.nameColor}`}>
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.age}, {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Testimonials - Text-Only Cards with Different UI */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">More travelers share their discoveries</h3>
          
          {/* Compact Text-Only Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quote Card Style */}
            <div className="bg-white border-l-4 border-indigo-500 p-6 shadow-lg rounded-r-xl">
              <div className="flex items-start space-x-2 mb-4">
                <svg className="w-6 h-6 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <div>
                  <p className="text-gray-800 font-medium italic">"The LGBTQ+ friendly filter was a game-changer for planning my honeymoon. Found the most welcoming destinations!"</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-indigo-600">Alex Rivera</span>
                      <span className="text-gray-500"> • 28yo, Miami, USA</span>
                    </div>
                    <div className="text-xs text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">
                      ✈️ Found: Reykjavik, Iceland
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-emerald-500 p-6 shadow-lg rounded-r-xl">
              <div className="flex items-start space-x-2 mb-4">
                <svg className="w-6 h-6 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <div>
                  <p className="text-gray-800 font-medium italic">"Dog-friendly destinations filter saved my vacation! Finally traveled with my golden retriever to amazing places."</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-emerald-600">Jenny Park</span>
                      <span className="text-gray-500"> • 33yo, Seoul, South Korea</span>
                    </div>
                    <div className="text-xs text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                      ✈️ Found: Banff, Canada
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-purple-500 p-6 shadow-lg rounded-r-xl">
              <div className="flex items-start space-x-2 mb-4">
                <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <div>
                  <p className="text-gray-800 font-medium italic">"Clean air filter led me to the most breathable cities. Perfect for my asthma-friendly getaway!"</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-purple-600">Roberto Silva</span>
                      <span className="text-gray-500"> • 45yo, Mexico City, Mexico</span>
                    </div>
                    <div className="text-xs text-purple-500 bg-purple-50 px-2 py-1 rounded-full">
                      ✈️ Found: Zurich, Switzerland
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-rose-500 p-6 shadow-lg rounded-r-xl">
              <div className="flex items-start space-x-2 mb-4">
                <svg className="w-6 h-6 text-rose-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <div>
                  <p className="text-gray-800 font-medium italic">"The low racism filter gave me confidence as a solo Black traveler. Found incredibly welcoming communities!"</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-rose-600">Amara Johnson</span>
                      <span className="text-gray-500"> • 29yo, Atlanta, USA</span>
                    </div>
                    <div className="text-xs text-rose-500 bg-rose-50 px-2 py-1 rounded-full">
                      ✈️ Found: Copenhagen, Denmark
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Cards - Different Style */}
          <div className="mt-12">
            <div className="flex overflow-x-auto pb-4 space-x-6 scrollbar-hide">
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.2l-5.2 2.9 1-5.8L1.5 7.2l5.9-.9z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-2xl">🎨</span>
                </div>
                <p className="text-gray-800 mb-4 font-medium">"Amazing for creative nomads! Found cities with thriving art scenes and affordable studio spaces."</p>
                <div className="border-t border-yellow-300 pt-3">
                  <div className="font-semibold text-yellow-800">Yuki Tanaka</div>
                  <div className="text-sm text-yellow-700">Graphic Designer • 26yo, Osaka, Japan</div>
                  <div className="text-xs text-yellow-600 mt-1">🎯 Discovered: Berlin, Germany</div>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-green-100 to-teal-100 p-6 rounded-2xl border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.2l-5.2 2.9 1-5.8L1.5 7.2l5.9-.9z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-2xl">🏔️</span>
                </div>
                <p className="text-gray-800 mb-4 font-medium">"Hiking paradise recommendations were incredible! Found trails that weren't overcrowded with tourists."</p>
                <div className="border-t border-green-300 pt-3">
                  <div className="font-semibold text-green-800">Lars Nielsen</div>
                  <div className="text-sm text-green-700">Outdoor Guide • 31yo, Bergen, Norway</div>
                  <div className="text-xs text-green-600 mt-1">🎯 Discovered: Dolomites, Italy</div>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.2l-5.2 2.9 1-5.8L1.5 7.2l5.9-.9z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-2xl">📚</span>
                </div>
                <p className="text-gray-800 mb-4 font-medium">"Perfect for digital detox! Found destinations with minimal internet but rich local experiences."</p>
                <div className="border-t border-blue-300 pt-3">
                  <div className="font-semibold text-blue-800">Marie Dubois</div>
                  <div className="text-sm text-blue-700">Writer • 37yo, Lyon, France</div>
                  <div className="text-xs text-blue-600 mt-1">🎯 Discovered: Bhutan</div>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.2l-5.2 2.9 1-5.8L1.5 7.2l5.9-.9z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-2xl">🏖️</span>
                </div>
                <p className="text-gray-800 mb-4 font-medium">"Beach lover's dream! Found pristine coastlines away from the typical tourist traps."</p>
                <div className="border-t border-purple-300 pt-3">
                  <div className="font-semibold text-purple-800">Isabella Costa</div>
                  <div className="text-sm text-purple-700">Marine Biologist • 28yo, Rio de Janeiro, Brazil</div>
                  <div className="text-xs text-purple-600 mt-1">🎯 Discovered: Fernando de Noronha, Brazil</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
