import { redirect } from 'next/navigation'

interface CountryPageProps {
  params: Promise<{
    countryname: string
  }>
}

export default async function CountryPage({ params }: CountryPageProps) {
  const resolvedParams = await params
  // Redirect to the default tab
  redirect(`/${resolvedParams.countryname}/best-places-to-visit`)
}
