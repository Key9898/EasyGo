import { PrivacySection, PrivacySubsection, PrivacyList, PrivacyParagraph } from './PrivacyComponents'

export function DataRetentionSection() {
    return (
        <PrivacySection title="6. Data Retention">
            <PrivacyParagraph>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Retention periods vary based on:
            </PrivacyParagraph>
            <PrivacyList items={[
                '<strong>Active Accounts:</strong> Information is retained while your account is active',
                '<strong>Rental Records:</strong> Maintained for 7 years for tax and legal compliance',
                '<strong>Payment Information:</strong> Retained as required by financial regulations',
                '<strong>Marketing Data:</strong> Retained until you opt-out or withdraw consent',
                '<strong>Legal Claims:</strong> Retained as necessary to defend against legal claims'
            ]} />
            <PrivacyParagraph>
                After the retention period expires, we securely delete or anonymize your information.
            </PrivacyParagraph>
        </PrivacySection>
    )
}

export function UserRightsSection() {
    return (
        <PrivacySection title="7. Your Rights and Choices">
            <PrivacyParagraph>
                Under Thai Personal Data Protection Act (PDPA) and applicable laws, you have the following rights:
            </PrivacyParagraph>
            <div className="space-y-4">
                <PrivacySubsection title="7.1 Access and Portability">
                    <PrivacyParagraph>
                        You have the right to access your personal information and request a copy in a commonly used format. You can also request that we transfer your data to another service provider where technically feasible.
                    </PrivacyParagraph>
                </PrivacySubsection>
                <PrivacySubsection title="7.2 Correction and Update">
                    <PrivacyParagraph>
                        You can update your account information at any time through your online account or by contacting us. We will correct any inaccurate or incomplete information promptly.
                    </PrivacyParagraph>
                </PrivacySubsection>
                <PrivacySubsection title="7.3 Deletion">
                    <PrivacyParagraph>
                        You may request deletion of your personal information, subject to legal and contractual obligations. Some information may need to be retained for legal compliance or legitimate business purposes.
                    </PrivacyParagraph>
                </PrivacySubsection>
                <PrivacySubsection title="7.4 Objection and Restriction">
                    <PrivacyParagraph>
                        You can object to certain processing of your information or request restriction of processing in specific circumstances, such as when accuracy is contested or processing is unlawful.
                    </PrivacyParagraph>
                </PrivacySubsection>
                <PrivacySubsection title="7.5 Marketing Opt-Out">
                    <PrivacyParagraph>
                        You can opt-out of marketing communications at any time by clicking the "unsubscribe" link in our emails, adjusting your account preferences, or contacting us directly. Note that you will still receive transactional and service-related communications.
                    </PrivacyParagraph>
                </PrivacySubsection>
                <PrivacySubsection title="7.6 Withdraw Consent">
                    <PrivacyParagraph>
                        Where we process your information based on consent, you have the right to withdraw that consent at any time. This will not affect the lawfulness of processing before withdrawal.
                    </PrivacyParagraph>
                </PrivacySubsection>
            </div>
            <PrivacyParagraph>
                To exercise any of these rights, please contact us using the information provided in Section 13.
            </PrivacyParagraph>
        </PrivacySection>
    )
}

export function CookiesSection() {
    return (
        <PrivacySection title="8. Cookies and Tracking Technologies">
            <PrivacyParagraph>
                We use cookies and similar tracking technologies to enhance your experience on our website and mobile app. Types of cookies we use include:
            </PrivacyParagraph>
            <PrivacyList items={[
                '<strong>Essential Cookies:</strong> Necessary for website functionality and security',
                '<strong>Performance Cookies:</strong> Help us understand how visitors use our site',
                '<strong>Functional Cookies:</strong> Remember your preferences and settings',
                '<strong>Marketing Cookies:</strong> Track your browsing to show relevant advertisements'
            ]} />
            <PrivacyParagraph>
                You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our Services.
            </PrivacyParagraph>
        </PrivacySection>
    )
}

export function ThirdPartyLinksSection() {
    return (
        <PrivacySection title="9. Third-Party Links">
            <PrivacyParagraph>
                Our Services may contain links to third-party websites, applications, or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.
            </PrivacyParagraph>
        </PrivacySection>
    )
}

export function ChildrenPrivacySection() {
    return (
        <PrivacySection title="10. Children's Privacy">
            <PrivacyParagraph>
                Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete that information promptly.
            </PrivacyParagraph>
        </PrivacySection>
    )
}

export function InternationalTransfersSection() {
    return (
        <PrivacySection title="11. International Data Transfers">
            <PrivacyParagraph>
                Your information may be transferred to and processed in countries other than Thailand. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards, such as standard contractual clauses, to protect your information.
            </PrivacyParagraph>
        </PrivacySection>
    )
}

export function PolicyChangesSection() {
    return (
        <PrivacySection title="12. Changes to This Privacy Policy">
            <PrivacyParagraph>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our Services after changes are posted constitutes acceptance of the updated policy.
            </PrivacyParagraph>
        </PrivacySection>
    )
}

export function ContactUsSection() {
    return (
        <PrivacySection title="13. Contact Us">
            <PrivacyParagraph>
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer:
            </PrivacyParagraph>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <p className="text-slate-700"><strong>Data Protection Officer</strong></p>
                <p className="text-slate-700 mt-2"><strong>EasyGo Car Rental Co., Ltd.</strong></p>
                <p className="text-slate-600 mt-2">Email: privacy@easygo.co.th</p>
                <p className="text-slate-600">Phone: +66 2 123 4567 (Head Office)</p>
                <p className="text-slate-600">Address: Level 30, G Tower Grand Rama 9, 9 Rama IX Road, Huai Khwang, Bangkok 10310, Thailand</p>
                <p className="text-slate-600 mt-4">
                    <strong>Response Time:</strong> We will respond to your request within 30 days
                </p>
            </div>
            <PrivacyParagraph>
                If you are not satisfied with our response, you have the right to lodge a complaint with the Personal Data Protection Committee (PDPC) of Thailand.
            </PrivacyParagraph>
        </PrivacySection>
    )
}
