import Header from '../../components/Layouts/Common/Header'
import OtherHeroBanner from '../../components/Layouts/HeroBanner/OtherHeroBanner/OtherHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import LatestNews from './LatestNews'
import MediaKit from './MediaKit'
import InTheNews from './InTheNews'
import PRContact from './PRContact'

interface PressProps {
    onNavigate?: (page: string) => void
}

export default function Press({ onNavigate }: PressProps) {
    const breadcrumbPages = [
        { name: 'Press & Media', href: '#press', current: true },
    ]

    return (
        <>
            <Header onNavigate={onNavigate} />

            <OtherHeroBanner
                title="EasyGo Media Center"
                description="Your hub for everything EasyGo. Explore our latest announcements, download official brand assets, and see how we're shaping the future of mobility."
                buttonText="Start Exploring"
                variant="press"
                preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} />}
                scrollTargetId="press-content"
                onPrimaryAction={() => {
                    const el = document.getElementById('press-content');
                    if (el) {
                        const header = document.querySelector('header');
                        const offset = header?.offsetHeight || 0;
                        window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
                    }
                }}
            />

            <main id="press-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
                    <LatestNews />
                    <MediaKit />
                    <InTheNews />
                    <PRContact />
                </div>
            </main>

            <Footer />
            <ScrollToTopButton />
        </>
    )
}
