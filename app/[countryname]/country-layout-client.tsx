'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import HeaderLogo from '@/components/ui/header-logo'
import Footer from '@/components/ui/footer'
import { FilterProvider } from '@/contexts/FilterContext'
import CountryHeader from './country-header'
import CountryTabs from './country-tabs'

const Sticky = require('sticky-js')

interface CountryLayoutClientProps {
  children: React.ReactNode
  countryName: string
}

export default function CountryLayoutClient({ children, countryName }: CountryLayoutClientProps) {
  const pathname = usePathname()
  
  // Check if we're on a city page
  const pathSegments = pathname.split('/').filter(Boolean)
  // City pages have either 2 segments (/country/city) or 3+ segments (/country/city/tab)
  // But we need to exclude country-level tabs like /country/best-places-to-visit
  const countryTabs = ['best-places-to-visit', 'best-time-to-visit', 'cost', 'itinerary', 'good-deals', 'alternatives']
  const isCityPage = pathSegments.length >= 2 && !countryTabs.includes(pathSegments[1])
  
  // Initialize sticky functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      const stickyEls = document.querySelectorAll('[data-sticky]');
      if (stickyEls.length > 0) {
        const sticky = new Sticky('[data-sticky]');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {/* Navbar with white background and bottom border */}
      <header className="w-full z-30 bg-white border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="shrink-0 mr-4">
              <HeaderLogo />
            </div>

            {/* Desktop navigation */}
            <nav className="flex grow">
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 lg:px-5 py-2 flex items-center transition-colors duration-200" href="/blog">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <FilterProvider>
        {/* Only show country header and tabs if NOT on a city page */}
        {!isCityPage && (
          <>
            {/* Country header section - full width */}
            <CountryHeader countryName={countryName} />
            
            {/* Tab navigation */}
            <CountryTabs countryName={countryName} />
          </>
        )}
        
        {/* Tab content */}
        {children}
      </FilterProvider>
      <Footer />
    </>
  )
}
