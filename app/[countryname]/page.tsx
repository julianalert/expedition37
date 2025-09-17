export const metadata = {
  title: 'Country Details - JobBoard',
  description: 'Explore cities in this country',
}
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'
import Sidebar from '@/components/sidebar'
import CountryDetails from './country-details'
import { FilterProvider } from '@/contexts/FilterContext'

interface CountryPageProps {
  params: Promise<{
    countryname: string
  }>
}

export default async function CountryPage({ params }: CountryPageProps) {
  const resolvedParams = await params
  return (
    <>
      <FilterProvider>
        <CountryDetails countryName={resolvedParams.countryname} />
      </FilterProvider>
      <Footer />
    </>
  )
}
