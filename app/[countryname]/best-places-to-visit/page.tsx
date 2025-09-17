export const metadata = {
  title: 'Best places to visit',
  description: 'Explore the best cities and destinations in this country',
}
import BestPlacesToVisit from '../best-places-to-visit'

interface BestPlacesToVisitPageProps {
  params: Promise<{
    countryname: string
  }>
}

export default async function BestPlacesToVisitPage({ params }: BestPlacesToVisitPageProps) {
  const resolvedParams = await params
  return <BestPlacesToVisit countryName={resolvedParams.countryname} />
}
