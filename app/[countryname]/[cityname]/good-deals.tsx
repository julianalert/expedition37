interface GoodDealsProps {
  city: City | null
}

export default function GoodDeals({ city }: GoodDealsProps) {
  if (!city) {
    return (
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="pt-4 pb-8 md:pt-4 md:pb-16">
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Place not found</h2>
              <p className="text-gray-600">Unable to load deals information.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Mock deals data
  const deals = [
    {
      id: 1,
      title: "Flight + Hotel Package",
      description: "Save up to 40% when you book flights and accommodation together",
      discount: "40% OFF",
      price: "From $899",
      provider: "Expedia",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Local Tours & Activities",
      description: "Discover hidden gems with local guides at special prices",
      discount: "25% OFF",
      price: "From $49",
      provider: "GetYourGuide",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Budget Accommodations",
      description: "Comfortable stays in hostels and guesthouses",
      discount: "30% OFF",
      price: "From $15/night",
      provider: "Hostelworld",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      title: "Car Rental Deals",
      description: "Explore at your own pace with discounted car rentals",
      discount: "35% OFF",
      price: "From $25/day",
      provider: "Rental Cars",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]

  return (
    <section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="pt-4 pb-8 md:pt-4 md:pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Good deals for {city.name}
              </h1>
              <p className="text-gray-600">
                Save money on your trip with these exclusive offers and discounts
              </p>
            </div>

            {/* Deals grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {deals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${deal.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {deal.discount}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="text-white font-semibold text-lg">{deal.price}</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{deal.title}</h3>
                      <span className="text-sm text-indigo-600 font-medium">{deal.provider}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{deal.description}</p>
                    <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium">
                      View Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional savings tips */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Money-saving tips for {city.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">💰</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Travel off-season</h4>
                    <p className="text-sm text-gray-600">Visit during shoulder seasons for better prices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🍜</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Eat like a local</h4>
                    <p className="text-sm text-gray-600">Try street food and local restaurants</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-sm">🚌</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Use public transport</h4>
                    <p className="text-sm text-gray-600">Buses and trains are often much cheaper</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
