export const metadata = {
  title: 'Home - JobBoard',
  description: 'Page description',
}
import Hero from '@/components/hero'
import PressLogos from '@/components/press-logos'
import Sidebar from '@/components/sidebar'
import PostsList from './posts-list'
import { FilterProvider } from '@/contexts/FilterContext'

export default function Home() {
  return (
    <>
      <Hero />
      {/* <PressLogos /> */}

      {/*  Page content */}
      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="py-8 md:py-16">
            <FilterProvider>
              <div className="md:flex md:justify-between" data-sticky-container>

                <Sidebar />

                {/* Main content */}
                <div className="md:grow">
                  <PostsList />

                </div>

              </div>
            </FilterProvider>
          </div>
        </div>
      </section>
    </>
  )
}
