import Header from '../../components/Layouts/Common/Header'
import OtherHeroBanner from '../../components/Layouts/HeroBanner/OtherHeroBanner/OtherHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import AboutUs from './AboutUs'
import CoreValues from './CoreValues'
import Timeline from './Timeline'
import Team from './Team'
import AboutCTA from './AboutCTA'

interface WhoWeAreProps {
    onNavigate?: (page: string) => void
}

export default function WhoWeAre({ onNavigate }: WhoWeAreProps) {
    const breadcrumbPages = [
        { name: 'Who We Are', href: '#who-we-are', current: true },
    ]

    return (
        <>
            <Header onNavigate={onNavigate} />

            <OtherHeroBanner
                title="Driving Your Journey Forward"
                description="More than just a car rental. We are your dedicated partner for safe, seamless, and memorable travel experiences across borders."
                buttonText='Who We Are'
                variant="whoWeAre"
                preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} />}
                scrollTargetId="who-we-are-content"
                onPrimaryAction={() => {
                    const el = document.getElementById('who-we-are-content');
                    if (el) {
                        const header = document.querySelector('header');
                        const offset = header?.offsetHeight || 0;
                        window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
                    }
                }}
            />

            <main id="who-we-are-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AboutUs />

                    <div className="mt-16">
                        <CoreValues />
                    </div>

                    <div className="mt-16">
                        <Timeline />
                    </div>

                    <div className="mt-16">
                        <Team />
                    </div>

                    <div className="mt-16">
                        <AboutCTA onNavigate={onNavigate} />
                    </div>
                </div>
            </main>

            <Footer />
            <ScrollToTopButton />
        </>
    )
}
