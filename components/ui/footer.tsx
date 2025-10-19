import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">
          {/* Top area */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-4 md:mb-6">
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link className="inline-flex group mb-8 md:mb-0" href="/" aria-label="Detour">
                <Image 
                  src="/images/detour.svg" 
                  alt="Detour" 
                  width={120} 
                  height={24}
                  className="h-6"
                  style={{ width: 'auto', height: 'auto', maxWidth: '120px', maxHeight: '24px' }}
                />
              </Link>
            </div>
            {/* Social links */}
            <div className="flex items-center space-x-4 mb-4 md:order-2 md:ml-4 md:mb-0">
              <div className="text-xl font-nycd text-indigo-500">Join the party</div>
              <ul className="inline-flex space-x-3">
                <li>
                  <a
                    className="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out"
                    href="https://x.com/trydetour"
                    aria-label="Twitter"
                  >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom area */}
          <div className="text-center md:flex md:items-center md:justify-between">
            {/* Left links */}
            <div className="text-sm font-medium md:order-1 mb-2 md:mb-0">
              <ul className="inline-flex flex-wrap text-sm font-medium">
                <li className="after:content-['·'] last:after:hidden after:text-gray-400 after:px-2">
                  <a className="text-gray-500 hover:text-gray-500 hover:underline" href="https://x.com/Clement_brnrd">
                    💜 Made with love by Clement
                  </a>
                </li>
                <li className="after:content-['·'] last:after:hidden after:text-gray-400 after:px-2">
                  <Link className="text-gray-500 hover:text-gray-500 hover:underline" href="/blog">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-500">@Detour | All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
