import Overview from './overview'

interface CountryPageProps {
  params: Promise<{
    countryname: string
  }>
}

export default async function CountryPage({ params }: CountryPageProps) {
  const resolvedParams = await params
  
  return <Overview countryName={resolvedParams.countryname} />
}
