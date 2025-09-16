import getAllDestinations from '@/lib/getAllDestinations'
import PostItem from './post-item'
import Newsletter from '@/components/newsletter'
import Testimonials from '@/components/testimonials'

interface Destination {
  id: number,
  rank: number,
  city: string,
  country: string,
  image: string,
  featured: boolean,
}

export default async function PostsList() {
  const destinationsData: Promise<Destination[]> = getAllDestinations()
  const destinations = await destinationsData

  return (
    <div className="pb-8 md:pb-16" id="destinations">
      {/* Cards grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination, index) => {
          const items = [];
          
          // Add the destination item
          items.push(
            <PostItem key={destination.id} {...destination} />
          );
          
          // Add testimonials after the 9th destination (index 8)
          if (index === 8 && destinations.length > 9) {
            items.push(
              <div key="testimonials" className="md:col-span-2 lg:col-span-3">
                <Testimonials />
              </div>
            );
          }
          
          // Add newsletter after the 12th destination (index 11)
          if (index === 14 && destinations.length > 15) {
            items.push(
              <div key="newsletter" className="md:col-span-2 lg:col-span-3">
                <Newsletter />
              </div>
            );
          }
          
          return items;
        }).flat()}
      </div>
    </div>
  )
}
