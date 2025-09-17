'use client'

import { useEffect } from 'react'
import PlaceHeader from './place-header'
import PlaceTabs from './place-tabs'

const Sticky = require('sticky-js')

interface PlaceLayoutClientProps {
  children: React.ReactNode
  placeName: string
  countryName: string
}

export default function PlaceLayoutClient({ children, placeName, countryName }: PlaceLayoutClientProps) {
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
      {/* Place header section - full width */}
      <PlaceHeader placeName={placeName} countryName={countryName} />
      
      {/* Tab navigation */}
      <PlaceTabs placeName={placeName} countryName={countryName} />
      
      {/* Tab content */}
      {children}
    </>
  )
}
