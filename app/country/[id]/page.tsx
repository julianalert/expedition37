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
  params: {
    id: string
  }
}

export default function CountryPage({ params }: CountryPageProps) {
  return (
    <>
      <FilterProvider>
        <CountryDetails countryId={params.id} />
      </FilterProvider>
      <Footer />
    </>
  )
}
