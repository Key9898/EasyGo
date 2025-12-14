import Header from '../../components/Layouts/Common/Header'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import CertifiedHeroBanner from '../../components/Layouts/HeroBanner/CertifiedHeroBanner/CertifiedHeroBanner'
import SafetyChecklist from './SafetyChecklist'
import HygieneAndCleanliness from './Hygiene&Cleanliness'
import FleetMaintenance from './FleetMaintenance'
import CustomerSupport from './CustomerSupport'
import ReviewsSection from './ReviewsSection'
import CertifiedCTA from './CertifiedCTA'

interface CertifiedProps {
  onNavigate?: (page: string) => void
}

export default function Certified({ onNavigate }: CertifiedProps) {
  const breadcrumbPages = [{ name: 'Certified', href: '#certified', current: true }]

  return (
    <>
      <Header onNavigate={onNavigate} />

      <CertifiedHeroBanner
        title="Drive with Confidence"
        description="Every vehicle undergoes rigorous 20-point inspections and proactive maintenance. We handle the details so you can focus on the journey."
        buttonText='See Inspection Points'
        variant="certified"
        preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} />}
        scrollTargetId="certified-content"
        onPrimaryAction={() => onNavigate?.('certified')}
      />

      <main id="certified-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Safety Checklist Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <SafetyChecklist />
          </div>

          {/* Combined Features Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-200">
            <HygieneAndCleanliness />
            <FleetMaintenance />
            <CustomerSupport />
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <ReviewsSection />
          </div>

          <CertifiedCTA onNavigate={onNavigate} />
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  )
}
