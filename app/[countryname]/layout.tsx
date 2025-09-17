import CountryLayoutClient from './country-layout-client'

interface CountryLayoutProps {
  children: React.ReactNode
  params: Promise<{
    countryname: string
  }>
}

export default async function CountryLayout({ children, params }: CountryLayoutProps) {
  const resolvedParams = await params

  return (
    <CountryLayoutClient countryName={resolvedParams.countryname}>
      {children}
    </CountryLayoutClient>
  )
}
