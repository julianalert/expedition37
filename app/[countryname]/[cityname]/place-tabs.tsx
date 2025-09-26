'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cityNameToSlug } from '@/lib/cityUtils'
import { countryNameToSlug } from '@/lib/countryUtils'

interface PlaceTabsProps {
  placeName: string
  countryName: string
}

const tabs = [
  { id: 'overview', name: 'Overview', href: '' },
  { id: 'things-to-do', name: 'Things to do', href: '/things-to-do' },
  { id: 'best-time', name: 'Best time to visit', href: '/best-time-to-visit' },
  { id: 'alternatives', name: 'Alternatives', href: '/alternatives' },
  // { id: 'deals', name: 'Good deals', href: '/good-deals' } // Hidden as requested
]

export default function PlaceTabs({ placeName, countryName }: PlaceTabsProps) {
  const pathname = usePathname()
  const placeSlug = cityNameToSlug(placeName)
  const countrySlug = countryNameToSlug(countryName)
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname === `/${countrySlug}/${placeSlug}`) return 'overview'
    if (pathname === `/${countrySlug}/${placeSlug}/things-to-do`) return 'things-to-do'
    if (pathname === `/${countrySlug}/${placeSlug}/best-time-to-visit`) return 'best-time'
    if (pathname === `/${countrySlug}/${placeSlug}/alternatives`) return 'alternatives'
    return 'overview'
  }
  
  const activeTab = getActiveTab()

  return (
    <section className="border-b border-gray-200 bg-white sticky top-0 z-40 mt-4 mb-4">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const href = tab.id === 'overview' ? `/${countrySlug}/${placeSlug}` : `/${countrySlug}/${placeSlug}${tab.href}`
            
            return (
              <Link
                key={tab.id}
                href={href}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex-shrink-0
                  ${isActive
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
