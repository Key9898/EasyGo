import Header from '../../components/Layouts/Common/Header'
import Footer from '../../components/Layouts/Common/Footer'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import OtherHeroBanner from '../../components/Layouts/HeroBanner/OtherHeroBanner/OtherHeroBanner'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import MapSection from './MapSection'
import ContactFormSection from './ContactFormSection'

export default function GetInTouch({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const pages = [{ name: 'Get in touch', href: '#getInTouch', current: true }]
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} />
      <OtherHeroBanner
        title="Let's Start Your Journey"
        description="Questions about our fleet or booking? Reach out to our dedicated support team for a seamless rental experience."
        buttonText="Send us a Message"
        variant="contact"
        preTitleSlot={<Breadcrumb pages={pages} variant="dark" />}
        scrollTargetId="get-in-touch-content"
      />
      <main id="get-in-touch-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <MapSection className="h-[350px] w-full rounded-lg z-0" />
            <ContactFormSection />
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
