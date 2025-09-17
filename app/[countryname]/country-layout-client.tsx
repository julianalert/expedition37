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
  
  // Check if we're on a city page (has 3+ segments: /country/city/tab)
  const pathSegments = pathname.split('/').filter(Boolean)
  const isCityPage = pathSegments.length >= 3
  
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
