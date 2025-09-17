export const metadata = {
  title: 'Where to go',
  description: 'Explore cities and destinations in this country',
}
import WhereToGo from '../where-to-go'

interface WhereToGoPageProps {
  params: Promise<{
    countryname: string
  }>
}

export default async function WhereToGoPage({ params }: WhereToGoPageProps) {
  const resolvedParams = await params
  return <WhereToGo countryName={resolvedParams.countryname} />
}
