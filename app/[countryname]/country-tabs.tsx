'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { countryNameToSlug } from '@/lib/countryUtils'

interface CountryTabsProps {
  countryName: string
}

const tabs = [
  { id: 'where-to-go', name: 'Where to go', href: '/where-to-go' },
  { id: 'best-time', name: 'Best time to visit', href: '/best-time-to-visit' },
  { id: 'deals', name: 'Good deals', href: '/good-deals' }
]

export default function CountryTabs({ countryName }: CountryTabsProps) {
  const pathname = usePathname()
  const countrySlug = countryNameToSlug(countryName)
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname === `/${countrySlug}/where-to-go`) return 'where-to-go'
    if (pathname === `/${countrySlug}/best-time-to-visit`) return 'best-time'
    if (pathname === `/${countrySlug}/good-deals`) return 'deals'
    return 'where-to-go'
  }
  
  const activeTab = getActiveTab()

  return (
    <section className="border-b border-gray-200 bg-white sticky top-0 z-40 mt-4 mb-4">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const href = `/${countrySlug}${tab.href}`
            
            return (
              <Link
                key={tab.id}
                href={href}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
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
