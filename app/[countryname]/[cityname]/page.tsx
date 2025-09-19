import Overview from './overview'

interface PlacePageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export default async function PlacePage({ params }: PlacePageProps) {
  const resolvedParams = await params
  
  return <Overview placeName={resolvedParams.cityname} countryName={resolvedParams.countryname} />
}
