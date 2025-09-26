'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
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
  const countryTabs = ['best-places-to-visit', 'best-time-to-visit', 'good-deals', 'alternatives']
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
