import PlaceLayoutClient from './place-layout-client'

interface PlaceLayoutProps {
  children: React.ReactNode
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export default async function PlaceLayout({ children, params }: PlaceLayoutProps) {
  const resolvedParams = await params

  return (
    <PlaceLayoutClient placeName={resolvedParams.cityname} countryName={resolvedParams.countryname}>
      {children}
    </PlaceLayoutClient>
  )
}
