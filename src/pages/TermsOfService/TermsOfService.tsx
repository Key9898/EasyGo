import Header from '../../components/Layouts/Common/Header'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import OtherHeroBanner from '../../components/Layouts/HeroBanner/OtherHeroBanner/OtherHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import {
    AgreementSection,
    EligibilitySection,
    PaymentSection,
    VehicleUseSection,
    InsuranceSection
} from './AgreementSection'
import {
    FuelPolicySection,
    VehicleReturnSection,
    SubscriptionSection,
    CorporateSection,
    PrivacySection,
    LiabilitySection,
    ModificationsSection,
    GoverningLawSection,
    ContactSection
} from './FuelPolicySection'

interface TermsOfServiceProps {
    onNavigate?: (page: string) => void
}

export default function TermsOfService({ onNavigate }: TermsOfServiceProps) {
    const breadcrumbPages = [{ name: 'Terms of Service', href: '#terms', current: true }]

    return (
        <>
            <Header onNavigate={onNavigate} />

            <OtherHeroBanner
                onPrimaryAction={() => onNavigate?.('terms')}
                title="Service Terms & Agreements"
                description="Confidence in every journey. Review our transparent rental terms to understand your rights, responsibilities, and our commitment to your safety."
                buttonText="Read Terms"
                backgroundImgAlt="Terms of Service banner"
                variant="terms"
                preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} variant="dark" />}
                scrollTargetId="terms-content"
            />

            <div id="terms-content" className="bg-slate-50 py-16 sm:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
                        <div className="prose prose-orange max-w-none">
                            <p className="text-sm text-slate-500 mb-8">
                                <strong>Last Updated:</strong> December 12, 2024
                            </p>

                            <AgreementSection />
                            <EligibilitySection />
                            <PaymentSection />
                            <VehicleUseSection />
                            <InsuranceSection />
                            <FuelPolicySection />
                            <VehicleReturnSection />
                            <SubscriptionSection />
                            <CorporateSection />
                            <PrivacySection />
                            <LiabilitySection />
                            <ModificationsSection />
                            <GoverningLawSection />
                            <ContactSection />
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl shadow-xl p-8 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Ready to Hit the Road?</h2>
                        <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                            Join thousands of satisfied travelers who trust EasyGo for their journeys.
                            Book your perfect ride today with confidence and transparency.
                        </p>
                        <button
                            type="button"
                            onClick={() => onNavigate?.('fleet')}
                            className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
                        >
                            Browse Our Fleet
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
            <ScrollToTopButton />
        </>
    )
}
