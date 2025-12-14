import { TermsSection, TermsList, TermsParagraph } from './TermsComponents'

export function FuelPolicySection() {
    return (
        <TermsSection title="6. Fuel Policy">
            <TermsParagraph>
                We operate on a "Full-to-Full" fuel policy. Vehicles are provided with a full tank of fuel and must be returned with a full tank. If the vehicle is returned with less fuel, you will be charged for the missing fuel at prevailing market rates plus a 200 THB refueling service fee.
            </TermsParagraph>
        </TermsSection>
    )
}

export function VehicleReturnSection() {
    return (
        <TermsSection title="7. Vehicle Return">
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">7.1 Return Time</h3>
                    <TermsParagraph>
                        Vehicles must be returned by the date and time specified in your rental agreement. Late returns are subject to additional charges: up to 2 hours late - 500 THB, over 2 hours - full day rate applies.
                    </TermsParagraph>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">7.2 Return Condition</h3>
                    <TermsParagraph>
                        The vehicle must be returned in the same condition as received, normal wear and tear excepted. Excessive dirt or odors may result in cleaning fees (500-2,000 THB). Any damage must be reported immediately.
                    </TermsParagraph>
                </div>
            </div>
        </TermsSection>
    )
}

export function SubscriptionSection() {
    return (
        <TermsSection title="8. Subscription Services">
            <TermsParagraph>
                For customers using our Subscription service, additional terms apply:
            </TermsParagraph>
            <TermsList items={[
                'Minimum subscription period is 1 month with automatic renewal unless cancelled',
                'Monthly fees include insurance, maintenance, and registration',
                'Vehicle swap options available every 6-12 months subject to availability',
                '30 days notice required for cancellation',
                'Security deposit is refundable upon contract termination and vehicle inspection'
            ]} />
        </TermsSection>
    )
}

export function CorporateSection() {
    return (
        <TermsSection title="9. Corporate Fleet Services">
            <TermsParagraph>
                Corporate clients are subject to customized agreements that may supersede certain standard terms. Corporate terms include:
            </TermsParagraph>
            <TermsList items={[
                'Minimum fleet size and contract duration requirements',
                'Dedicated account management and priority service',
                'Customized billing and payment terms',
                'Tax invoice issuance in compliance with Thai regulations',
                'Vehicle branding options for long-term contracts'
            ]} />
        </TermsSection>
    )
}

export function PrivacySection() {
    return (
        <TermsSection title="10. Privacy and Data Protection">
            <TermsParagraph>
                Your use of EasyGo services is also governed by our Privacy Policy. We collect and process personal data in accordance with Thai Personal Data Protection Act (PDPA). By using our services, you consent to such processing and warrant that all data provided is accurate.
            </TermsParagraph>
        </TermsSection>
    )
}

export function LiabilitySection() {
    return (
        <TermsSection title="11. Limitation of Liability">
            <TermsParagraph>
                EasyGo's liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the total amount paid by you for the rental.
            </TermsParagraph>
        </TermsSection>
    )
}

export function ModificationsSection() {
    return (
        <TermsSection title="12. Modifications to Terms">
            <TermsParagraph>
                EasyGo reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
            </TermsParagraph>
        </TermsSection>
    )
}

export function GoverningLawSection() {
    return (
        <TermsSection title="13. Governing Law">
            <TermsParagraph>
                These Terms of Service are governed by and construed in accordance with the laws of Thailand. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of Bangkok, Thailand.
            </TermsParagraph>
        </TermsSection>
    )
}

export function ContactSection() {
    return (
        <TermsSection title="14. Contact Information">
            <TermsParagraph>
                If you have any questions about these Terms of Service, please contact us:
            </TermsParagraph>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <p className="text-slate-700"><strong>EasyGo Car Rental Co., Ltd.</strong></p>
                <p className="text-slate-600 mt-2">Email: legal@easygo.co.th</p>
                <p className="text-slate-600">Phone: +66 2 123 4567 (Head Office)</p>
                <p className="text-slate-600">Address: Level 30, G Tower Grand Rama 9, 9 Rama IX Road, Huai Khwang, Bangkok 10310, Thailand</p>
                <p className="text-slate-600 mt-2">Business Hours: Monday - Sunday, 08:30 - 18:30</p>
            </div>
        </TermsSection>
    )
}
