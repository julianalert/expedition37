export const metadata = {
  title: 'Best time to visit',
  description: 'Find out the best time to visit this country',
}
import BestTimeToVisit from '../best-time-to-visit'

interface BestTimePageProps {
  params: Promise<{
    countryname: string
  }>
}

export default async function BestTimePage({ params }: BestTimePageProps) {
  const resolvedParams = await params
  return <BestTimeToVisit countryName={resolvedParams.countryname} />
}
