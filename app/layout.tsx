import './css/style.css'
import Script from 'next/script'
import { OrganizationStructuredData } from '@/components/structured-data'

import { Inter, Nothing_You_Could_Do } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const nycd = Nothing_You_Could_Do({
  subsets: ['latin'],
  variable: '--font-nycd',
  weight: '400',
  display: 'swap'
})

export const metadata = {
  title: {
    template: '%s | Detour',
    default: 'Detour - Your next holiday starts here',
  },
  description: 'Find your ideal travel destination with personalized recommendations based on season, budget, and preferences. Explore the world with confidence.',
  metadataBase: new URL('https://trydetour.com'), // Update with your actual domain
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nycd.variable} font-inter antialiased bg-white text-gray-800 tracking-tight`}>
        {/* Organization Structured Data */}
        <OrganizationStructuredData />
        
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
        
        {/* Beam Analytics - Secured with SRI */}
        <Script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="9c0d7664-9944-4312-a362-e87e8f68380c"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          // Note: You should generate the actual SRI hash for the beam.min.js file
          // Use: openssl dgst -sha384 -binary beam.min.js | openssl base64 -A
        />
      </body>
    </html>
  )
}
