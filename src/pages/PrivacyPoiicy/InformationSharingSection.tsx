import { PrivacySection, PrivacySubsection, PrivacyList, PrivacyParagraph } from './PrivacyComponents'

export function IntroductionSection() {
    return (
        <PrivacySection title="1. Introduction">
            <PrivacyParagraph>
                EasyGo Car Rental Co., Ltd. ("EasyGo," "we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our car rental services, website, mobile application, and related services (collectively, the "Services").
            </PrivacyParagraph>
            <PrivacyParagraph>
                By using our Services, you consent to the data practices described in this policy. If you do not agree with this Privacy Policy, please do not use our Services.
            </PrivacyParagraph>
        </PrivacySection>
    )
}

export function InformationCollectionSection() {
    return (
        <PrivacySection title="2. Information We Collect">
            <div className="space-y-4">
                <PrivacySubsection title="2.1 Personal Information">
                    <PrivacyParagraph>
                        We collect personal information that you provide directly to us, including:
                    </PrivacyParagraph>
                    <PrivacyList items={[
                        '<strong>Identity Information:</strong> Full name, date of birth, nationality, passport or ID card number',
                        '<strong>Contact Information:</strong> Email address, phone number, mailing address',
                        '<strong>Driver Information:</strong> Driving license number, license issue date and expiry, International Driving Permit details',
                        '<strong>Payment Information:</strong> Credit/debit card details, billing address, payment history',
                        '<strong>Account Information:</strong> Username, password, preferences, rental history',
                        '<strong>Corporate Information:</strong> Company name, tax ID, business registration details (for corporate clients)'
                    ]} />
                </PrivacySubsection>
                <PrivacySubsection title="2.2 Automatically Collected Information">
                    <PrivacyParagraph>
                        When you use our Services, we automatically collect certain information:
                    </PrivacyParagraph>
                    <PrivacyList items={[
                        '<strong>Device Information:</strong> IP address, browser type, operating system, device identifiers',
                        '<strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, search queries',
                        '<strong>Location Data:</strong> GPS location (with your permission), pick-up and drop-off locations',
                        '<strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance user experience'
                    ]} />
                </PrivacySubsection>
                <PrivacySubsection title="2.3 Vehicle Usage Information">
                    <PrivacyParagraph>
                        Our vehicles may be equipped with GPS tracking and telematics systems that collect data about vehicle location, mileage, fuel consumption, driving behavior, and maintenance needs. This information helps us provide better service, ensure vehicle safety, and prevent theft.
                    </PrivacyParagraph>
                </PrivacySubsection>
                <PrivacySubsection title="2.4 Third-Party Information">
                    <PrivacyParagraph>
                        We may receive information about you from third parties, including credit bureaus (for credit checks), insurance providers, traffic authorities (for violation records), and social media platforms (if you choose to connect your account).
                    </PrivacyParagraph>
                </PrivacySubsection>
            </div>
        </PrivacySection>
    )
}

export function InformationUseSection() {
    return (
        <PrivacySection title="3. How We Use Your Information">
            <PrivacyParagraph>
                We use the collected information for the following purposes:
            </PrivacyParagraph>
            <div className="space-y-4">
                <PrivacySubsection title="3.1 Service Provision">
                    <PrivacyList items={[
                        'Process and fulfill your rental reservations',
                        'Verify your identity and driving credentials',
                        'Process payments and manage billing',
                        'Provide customer support and respond to inquiries',
                        'Manage vehicle delivery and pick-up logistics'
                    ]} />
                </PrivacySubsection>
                <PrivacySubsection title="3.2 Safety and Security">
                    <PrivacyList items={[
                        'Monitor vehicle location and prevent theft',
                        'Investigate accidents, damage, or violations',
                        'Detect and prevent fraud and unauthorized use',
                        'Ensure compliance with traffic laws and regulations',
                        'Maintain vehicle safety and roadworthiness'
                    ]} />
                </PrivacySubsection>
                <PrivacySubsection title="3.3 Business Operations">
                    <PrivacyList items={[
                        'Improve and optimize our Services',
                        'Conduct market research and analytics',
                        'Develop new features and services',
                        'Manage fleet maintenance and operations',
                        'Train staff and improve customer service'
                    ]} />
                </PrivacySubsection>
                <PrivacySubsection title="3.4 Marketing and Communications">
                    <PrivacyList items={[
                        'Send promotional offers and special deals (with your consent)',
                        'Provide personalized recommendations',
                        'Send service updates and important notices',
                        'Conduct customer satisfaction surveys',
                        'Manage loyalty programs and rewards'
                    ]} />
                </PrivacySubsection>
                <PrivacySubsection title="3.5 Legal Compliance">
                    <PrivacyList items={[
                        'Comply with legal obligations and regulations',
                        'Respond to legal requests and court orders',
                        'Protect our rights and property',
                        'Resolve disputes and enforce agreements'
                    ]} />
                </PrivacySubsection>
            </div>
        </PrivacySection>
    )
}

export function InformationSharingSection() {
    return (
        <PrivacySection title="4. Information Sharing and Disclosure">
            <PrivacyParagraph>
                We do not sell your personal information. We may share your information in the following circumstances:
            </PrivacyParagraph>
            <div className="space-y-4">
                <PrivacySubsection title="4.1 Service Providers">
                    <PrivacyParagraph>
                        We share information with third-party service providers who perform services on our behalf, including payment processors, insurance companies, GPS tracking providers, maintenance services, and IT support. These providers are contractually obligated to protect your information.
                    </PrivacyParagraph>
                </PrivacySubsection>
                <PrivacySubsection title="4.2 Legal Requirements">
                    <PrivacyParagraph>
                        We may disclose your information to comply with legal obligations, respond to lawful requests from authorities, enforce our terms and conditions, protect our rights and property, or ensure the safety of our users and the public.
                    </PrivacyParagraph>
                </PrivacySubsection>
                <PrivacySubsection title="4.3 Business Transfers">
                    <PrivacyParagraph>
                        In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of any such change and provide choices regarding your information.
                    </PrivacyParagraph>
                </PrivacySubsection>
                <PrivacySubsection title="4.4 With Your Consent">
                    <PrivacyParagraph>
                        We may share your information for other purposes with your explicit consent or at your direction.
                    </PrivacyParagraph>
                </PrivacySubsection>
            </div>
        </PrivacySection>
    )
}

export function DataSecuritySection() {
    return (
        <PrivacySection title="5. Data Security">
            <PrivacyParagraph>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </PrivacyParagraph>
            <PrivacyList items={[
                'Encryption of data in transit and at rest using industry-standard protocols (SSL/TLS)',
                'Secure data storage with access controls and authentication',
                'Regular security audits and vulnerability assessments',
                'Employee training on data protection and confidentiality',
                'Incident response procedures for data breaches'
            ]} />
            <PrivacyParagraph>
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </PrivacyParagraph>
        </PrivacySection>
    )
}
