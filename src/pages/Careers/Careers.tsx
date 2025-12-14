import Header from '../../components/Layouts/Common/Header'
import OtherHeroBanner from '../../components/Layouts/HeroBanner/OtherHeroBanner/OtherHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import WhyJoinUs from './WhyJoinUs'
import Benefits from './Benefits'
import OpenPositions from './OpenPositions'

interface CareersProps {
    onNavigate?: (page: string) => void
}

export default function Careers({ onNavigate }: CareersProps) {
    const breadcrumbPages = [
        { name: 'Careers', href: '#careers', current: true },
    ]

    return (
        <>
            <Header onNavigate={onNavigate} />

            <OtherHeroBanner
                title="Build The Future With Us"
                description="We're more than just a car rental company. We're a team of innovators, dreamers, and doers passionate about redefining how people move."
                buttonText='Explore Opportunities'
                variant="careers"
                preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} />}
                scrollTargetId="careers-content"
                onPrimaryAction={() => {
                    const el = document.getElementById('careers-content');
                    if (el) {
                        const header = document.querySelector('header');
                        const offset = header?.offsetHeight || 0;
                        window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
                    }
                }}
            />

            <main id="careers-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <WhyJoinUs />
                    <div className="mt-16">
                        <Benefits />
                    </div>
                    <div className="mt-16">
                        <OpenPositions />
                    </div>
                </div>
            </main>

            <Footer />
            <ScrollToTopButton />
        </>
    )
}
