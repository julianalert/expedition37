import Link from 'next/link'
import HeaderLogo from '@/components/ui/header-logo'

export default function Header() {
  return (
    <header className="absolute w-full z-30">
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
                <Link className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 lg:px-5 py-2 flex items-center transition-colors duration-200" href="/travel-planner">
                  Travel Planner
                </Link>
              </li>
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
  )
}
