import Header from '../../components/Layouts/Common/Header'
import MainHeroBanner from '../../components/Layouts/HeroBanner/MainHeroBanner/MainHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import UnifiedCalculator from '../../components/Calculators/BusinessCalculator'
import WhyLeaseVsBuyTable from './BuyVsLeaseTable'
import CorporateValueBenefits from './CorporateValues'
import TrustedBy from './TrustedBy'
import FleetDiversity from './FleetDiversity'
import FAQ from './CorporateFAQs'
import CorporateCTA from './CorporateCTA'

interface CorporateFleetProps {
  onNavigate?: (page: string) => void
}

export default function CorporateFleet({ onNavigate }: CorporateFleetProps) {
  const breadcrumbPages = [{ name: 'Corporate Fleet', href: '#corporateFleet', current: true }]

  return (
    <>
      <Header onNavigate={onNavigate} />

      <MainHeroBanner
        title="Drive Your Business Forward"
        description="Equip your team with the right vehicles without the burden of ownership. Flexible leasing plans, tax benefits, and immediate replacements."
        buttonText="Explore Corporate"
        variant="corporateFleet"
        preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} />}
        scrollTargetId="corporate-content"
        onNavigate={onNavigate}
      />

      <main id="corporate-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <UnifiedCalculator defaultMode="business" />

          <div className="mt-16">
            <CorporateValueBenefits />
          </div>

          <div className="mt-16">
            <WhyLeaseVsBuyTable />
          </div>

          <div className="mt-16">
            <TrustedBy />
          </div>

          <div className="mt-16">
            <FleetDiversity />
          </div>

          <div className="mt-16">
            <FAQ />
          </div>

          <div className="mt-16">
            <CorporateCTA onNavigate={onNavigate} />
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  )
}
