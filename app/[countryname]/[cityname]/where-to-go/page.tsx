export const metadata = {
  title: 'Where to go',
  description: 'Explore cities and destinations in this place',
}
import WhereToGo from '../where-to-go'

interface WhereToGoPageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export default async function WhereToGoPage({ params }: WhereToGoPageProps) {
  const resolvedParams = await params
  return <WhereToGo placeName={resolvedParams.cityname} countryName={resolvedParams.countryname} />
}
