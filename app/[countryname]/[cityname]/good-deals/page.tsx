export const metadata = {
  title: 'Good deals',
  description: 'Find the best deals and offers for this place',
}
import GoodDeals from '../good-deals'

interface GoodDealsPageProps {
  params: Promise<{
    countryname: string
    cityname: string
  }>
}

export default async function GoodDealsPage({ params }: GoodDealsPageProps) {
  const resolvedParams = await params
  return <GoodDeals placeName={resolvedParams.cityname} countryName={resolvedParams.countryname} />
}
