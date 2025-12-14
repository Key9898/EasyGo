
import SocialMedia from './SocialMedia'
import FooterLinksSection from '../FooterComponents/FooterLinksSection'
import NewsletterForm from '../FooterComponents/NewsletterForm'

const navigation = {
    services: [
        { name: 'Certified', href: '/certified' },
        { name: 'Short-term Rental', href: '/fleet' },
        { name: 'Subscription', href: '/subscription' },
        { name: 'Corporate Fleet', href: '/corporateFleet' },
    ],
    company: [
        { name: 'Who we are', href: '/whoWeAre' },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Press & Media', href: '/press' },
        { name: 'Careers', href: '/careers' },
    ],
    helpAndInfo: [
        { name: 'Get in touch', href: '/getInTouch' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Terms of service', href: '/terms' },
        { name: 'Privacy policy', href: '/privacy' },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-slate-800/90">
            <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
                        <FooterLinksSection title="Services" items={navigation.services} />
                        <FooterLinksSection title="Company" items={navigation.company} />
                        <FooterLinksSection title="Help & Info" items={navigation.helpAndInfo} />
                    </div>

                    <NewsletterForm />
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-center text-sm/6 text-slate-300">
                        &copy; 2025 EasyGo. All rights reserved. <br /> Designed and Developed by Wunna Aung.
                    </p>
                </div>
            </div>
            <SocialMedia />
        </footer>
    )
}

