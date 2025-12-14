import { TermsSection, TermsSubsection, TermsList, TermsParagraph } from './TermsComponents'

export function AgreementSection() {
    return (
        <TermsSection title="1. Agreement to Terms">
            <TermsParagraph>
                By accessing and using EasyGo's car rental services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use our services.
            </TermsParagraph>
            <TermsParagraph>
                These terms apply to all visitors, users, and others who access or use our services, including but not limited to short-term rentals, subscription services, and corporate fleet solutions.
            </TermsParagraph>
        </TermsSection>
    )
}

export function EligibilitySection() {
    return (
        <TermsSection title="2. Rental Eligibility">
            <div className="space-y-4">
                <TermsSubsection title="2.1 Age Requirements">
                    <TermsParagraph>
                        Renters must be at least 21 years of age and have held a valid driving license for a minimum of 1 year. Additional fees may apply for drivers under 25 years old. Certain vehicle categories may have higher age requirements.
                    </TermsParagraph>
                </TermsSubsection>
                <TermsSubsection title="2.2 License Requirements">
                    <TermsList items={[
                        'Thai nationals must present a valid Thai ID card and Thai driving license',
                        'Foreign nationals must present a valid passport and either an International Driving Permit (IDP) or a valid driving license from their home country',
                        'All licenses must be in Roman alphabet or accompanied by an official translation'
                    ]} />
                </TermsSubsection>
            </div>
        </TermsSection>
    )
}

export function PaymentSection() {
    return (
        <TermsSection title="3. Reservations and Payments">
            <div className="space-y-4">
                <TermsSubsection title="3.1 Booking Process">
                    <TermsParagraph>
                        Reservations can be made through our website, mobile app, phone, or in person at our offices. All reservations are subject to vehicle availability and confirmation by EasyGo.
                    </TermsParagraph>
                </TermsSubsection>
                <TermsSubsection title="3.2 Payment Terms">
                    <TermsParagraph>
                        We accept major credit cards, debit cards, and cash payments. A valid credit card is required for the security deposit, regardless of the payment method chosen for the rental fee.
                    </TermsParagraph>
                    <TermsList items={[
                        'Full payment is required at the time of vehicle pick-up unless otherwise arranged',
                        'Security deposits range from 5,000 to 20,000 THB depending on vehicle category',
                        'Deposits are refunded within 7-14 business days after vehicle return'
                    ]} />
                </TermsSubsection>
                <TermsSubsection title="3.3 Cancellation Policy">
                    <TermsParagraph>
                        Cancellations made more than 24 hours before the scheduled pick-up time are free of charge. Cancellations within 24 hours may incur a cancellation fee of up to 50% of the first day's rental rate. No-shows will be charged the full amount of the reservation.
                    </TermsParagraph>
                </TermsSubsection>
            </div>
        </TermsSection>
    )
}

export function VehicleUseSection() {
    return (
        <TermsSection title="4. Vehicle Use and Restrictions">
            <div className="space-y-4">
                <TermsSubsection title="4.1 Permitted Use">
                    <TermsParagraph>
                        Vehicles may only be driven on paved roads within Thailand unless specifically authorized. The vehicle must be operated in accordance with all applicable laws and regulations.
                    </TermsParagraph>
                </TermsSubsection>
                <TermsSubsection title="4.2 Prohibited Activities">
                    <TermsParagraph>You agree NOT to:</TermsParagraph>
                    <TermsList items={[
                        'Use the vehicle for illegal purposes or transport illegal goods',
                        'Drive under the influence of alcohol or drugs',
                        'Allow unauthorized persons to drive the vehicle',
                        'Use the vehicle for racing, testing, or competitive driving',
                        'Transport more passengers than the vehicle is designed for',
                        'Smoke in the vehicle (500 THB cleaning fee applies)',
                        'Transport pets without prior authorization',
                        'Drive the vehicle outside Thailand without written permission'
                    ]} />
                </TermsSubsection>
            </div>
        </TermsSection>
    )
}

export function InsuranceSection() {
    return (
        <TermsSection title="5. Insurance and Liability">
            <div className="space-y-4">
                <TermsSubsection title="5.1 Included Coverage">
                    <TermsParagraph>
                        All rentals include basic Collision Damage Waiver (CDW) and Third-Party Liability insurance as required by Thai law. This coverage has deductibles and exclusions as detailed in your rental agreement.
                    </TermsParagraph>
                </TermsSubsection>
                <TermsSubsection title="5.2 Renter Responsibility">
                    <TermsParagraph>You are responsible for:</TermsParagraph>
                    <TermsList items={[
                        'All damage to the vehicle caused by negligence or violation of this agreement',
                        'Loss or damage to personal belongings left in the vehicle',
                        'All traffic violations and parking fines incurred during the rental period',
                        'Towing and impound fees if applicable',
                        'Loss of vehicle keys (replacement fee: 5,000-15,000 THB)'
                    ]} />
                </TermsSubsection>
                <TermsSubsection title="5.3 Accident Procedures">
                    <TermsParagraph>
                        In case of an accident, you must: (1) Contact the police immediately and obtain a police report, (2) Notify EasyGo within 24 hours, (3) Not admit fault or liability, (4) Cooperate fully with insurance investigations. Failure to follow these procedures may void your insurance coverage.
                    </TermsParagraph>
                </TermsSubsection>
            </div>
        </TermsSection>
    )
}
