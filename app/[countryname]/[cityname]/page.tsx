import { redirect } from 'next/navigation'

interface PlacePageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export default async function PlacePage({ params }: PlacePageProps) {
  const resolvedParams = await params
  // Redirect to the default tab (best-time-to-visit)
  redirect(`/${resolvedParams.countryname}/${resolvedParams.cityname}/best-time-to-visit`)
}
