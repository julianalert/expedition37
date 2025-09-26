import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'
import StickyHandler from '@/components/sticky-handler'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      
      <main className="grow">
        {children}
      </main>

      <Footer />
      
      {/* Client-side sticky functionality */}
      <StickyHandler />
    </>
  )
}
