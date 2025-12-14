import Header from '../../components/Layouts/Common/Header'
import MainHeroBanner from '../../components/Layouts/HeroBanner/MainHeroBanner/MainHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import UnifiedCalculator from '../../components/Calculators/BusinessCalculator'
import BuyVsSubscribeTable from './BuyVsSubscribeTable'
import HowItWorks from './HowItWorks'
import Segments from './Segments'
import FAQ from './SubscriptionFAQs'
import SubscriptionBenefits from './SubscriptionBenefits'
import SubscriptionCTA from './SubscriptionCTA'

interface SubscriptionProps {
  onNavigate?: (page: string) => void
}

export default function Subscription({ onNavigate }: SubscriptionProps) {
  const breadcrumbPages = [{ name: 'Subscription', href: '#subscription', current: true }]

  return (
    <>
      <Header onNavigate={onNavigate} />

      <MainHeroBanner
        title="Zero-Hassle Subscription"
        description="Own the drive, not the headaches. Low deposit, all-inclusive monthly fee, and freedom to swap."
        buttonText="Explore Subscription"
        variant="subscription"
        preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} />}
        scrollTargetId="subscription-content"
        onNavigate={onNavigate}
      />

      <main id="subscription-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <UnifiedCalculator defaultMode="individual" />

          <div className="mt-16">
            <SubscriptionBenefits />
          </div>

          <div className="mt-16">
            <BuyVsSubscribeTable />
          </div>

          <div className="mt-16">
            <HowItWorks />
          </div>

          <div className="mt-16">
            <Segments />
          </div>

          <div className="mt-16">
            <FAQ />
          </div>

          <div className="mt-16">
            <SubscriptionCTA onNavigate={onNavigate} />
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  )
}
