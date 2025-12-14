import Header from '../../components/Layouts/Common/Header'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import OtherHeroBanner from '../../components/Layouts/HeroBanner/OtherHeroBanner/OtherHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import {
    IntroductionSection,
    InformationCollectionSection,
    InformationUseSection,
    InformationSharingSection,
    DataSecuritySection
} from './InformationSharingSection'
import {
    DataRetentionSection,
    UserRightsSection,
    CookiesSection,
    ThirdPartyLinksSection,
    ChildrenPrivacySection,
    InternationalTransfersSection,
    PolicyChangesSection,
    ContactUsSection
} from './DataRetentionSection'

interface PrivacyPolicyProps {
    onNavigate?: (page: string) => void
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
    const breadcrumbPages = [{ name: 'Privacy Policy', href: '#privacy', current: true }]

    return (
        <>
            <Header onNavigate={onNavigate} />

            <OtherHeroBanner
                onPrimaryAction={() => onNavigate?.('privacy')}
                title="Your Privacy, Our Priority"
                description="We are committed to transparency. Learn how we protect your personal data and ensure a secure rental experience with the highest standards of data privacy."
                buttonText="Read Policy"
                backgroundImgAlt="Privacy Policy banner"
                variant="privacy"
                preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} variant="dark" />}
                scrollTargetId="privacy-content"
            />

            <div id="privacy-content" className="bg-slate-50 py-16 sm:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
                        <div className="prose prose-orange max-w-none">
                            <p className="text-sm text-slate-500 mb-8">
                                <strong>Last Updated:</strong> December 12, 2024
                            </p>

                            <IntroductionSection />
                            <InformationCollectionSection />
                            <InformationUseSection />
                            <InformationSharingSection />
                            <DataSecuritySection />
                            <DataRetentionSection />
                            <UserRightsSection />
                            <CookiesSection />
                            <ThirdPartyLinksSection />
                            <ChildrenPrivacySection />
                            <InternationalTransfersSection />
                            <PolicyChangesSection />
                            <ContactUsSection />
                        </div>
                    </div>

                    {/* Trust Badge Section */}
                    <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl shadow-xl p-8 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Your Privacy is Our Priority</h2>
                        <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                            We are committed to protecting your personal information and maintaining your trust. Your data is encrypted, secure, and never sold to third parties.
                        </p>
                        <button
                            type="button"
                            onClick={() => onNavigate?.('fleet')}
                            className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            Start Renting Securely
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
            <ScrollToTopButton />
        </>
    )
}
