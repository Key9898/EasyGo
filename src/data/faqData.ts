export interface FAQItem {
    question: string
    answer: string
    category: string
}

export const faqData: FAQItem[] = [
    // Rental Basics
    {
        category: 'Rental Basics',
        question: 'What documents do I need to rent a car?',
        answer: 'For Thai nationals: Valid Thai ID card and Thai driving license. For foreigners: Valid passport, International Driving Permit (IDP) or valid driving license from your home country (in English or with certified translation), and a credit card for the security deposit.'
    },
    {
        category: 'Rental Basics',
        question: 'What is the minimum age requirement?',
        answer: 'The minimum age to rent a car is 21 years. Drivers must have held a valid driving license for at least 1 year. Drivers between 21-25 may be subject to a young driver surcharge.'
    },
    {
        category: 'Rental Basics',
        question: 'Can I rent a car if I don not have a credit card?',
        answer: 'Yes, we accept debit cards or cash deposits for the security deposit in certain cases. However, providing a credit card is the standard and fastest method. For cash deposits, additional verification documents (such as return flight tickets or proof of employment) may be required.'
    },
    {
        category: 'Rental Basics',
        question: 'Do you offer airport pick-up and drop-off?',
        answer: 'Yes, we provide meet-and-greet services at Suvarnabhumi (BKK) and Don Mueang (DMK) airports. Please provide your flight details during booking so our staff can monitor your arrival time.'
    },

    // Booking & Reservations
    {
        category: 'Booking & Reservations',
        question: 'How do I make a reservation?',
        answer: 'You can book directly through our website, mobile app, or by calling our 24/7 hotline. We recommend booking at least 48 hours in advance to ensure vehicle availability, especially during peak seasons.'
    },
    {
        category: 'Booking & Reservations',
        question: 'Can I modify or cancel my reservation?',
        answer: 'Yes, modifications are free of charge up to 24 hours before your pickup. Cancellations made more than 24 hours in advance are fully refundable. Late cancellations may incur a fee equivalent to one day rental.'
    },
    {
        category: 'Booking & Reservations',
        question: 'What happens if my flight is delayed?',
        answer: 'If you provided your flight number, our team will monitor your arrival and hold the vehicle for you. If you are delayed for other reasons, please contact us immediately to hold your reservation.'
    },

    // Subscription Service
    {
        category: 'Subscription',
        question: 'How does the EasyGo Subscription work?',
        answer: 'EasyGo Subscription is a flexible, month-to-month car ownership alternative. You pay a simple all-inclusive monthly fee that covers the car, insurance, maintenance, and registration. There are no long-term commitments, and you can return the car with 30 days notice.'
    },
    {
        category: 'Subscription',
        question: 'Can I swap cars during my subscription?',
        answer: 'Yes! Our "Freedom" plan allows you to swap vehicles every 6 months, giving you the flexibility to drive a sedan for city life and an SUV for holiday trips. Subject to vehicle availability and plan terms.'
    },
    {
        category: 'Subscription',
        question: 'Is maintenance included in the subscription?',
        answer: 'Absolutely. All routine maintenance, oil changes, tire rotations, and scheduled servicing are included in your monthly fee. We even pick up the car and leave you a replacement so you are never without wheels.'
    },

    // Corporate Fleet
    {
        category: 'Corporate Fleet',
        question: 'What are the benefits of Corporate Fleet leasing?',
        answer: 'Corporate leasing improves your cash flow by removing depreciating assets from your balance sheet. Our full-service leasing includes maintenance, insurance, and replacement vehicles, reducing your administrative burden and ensuring your business keeps moving.'
    },
    {
        category: 'Corporate Fleet',
        question: 'Can we brand the fleet vehicles?',
        answer: 'Yes, valid for contracts of 12 months or longer. You can apply your corporate branding or full vehicle wraps. We can coordinate with your preferred vendors or our partners to have the cars ready upon delivery.'
    },
    {
        category: 'Corporate Fleet',
        question: 'Do you provide fleet management reporting?',
        answer: 'Yes, corporate clients receive monthly reports on usage, mileage, fuel efficiency, and maintenance records to help you optimize your fleet operations.'
    },

    // Insurance & Coverage
    {
        category: 'Insurance & Coverage',
        question: 'What does the basic insurance cover?',
        answer: 'All rentals include Collision Damage Waiver (CDW) with a deductible. This limits your financial liability for damage to the rental vehicle. Third-Party Liability is also included as required by law.'
    },
    {
        category: 'Insurance & Coverage',
        question: 'Can I reduce my excess/deductible?',
        answer: 'Yes, you can purchase Super Collision Damage Waiver (SCDW) to reduce your deductible to zero. This provides peace of mind for scratches, dents, and minor accidents.'
    },
    {
        category: 'Insurance & Coverage',
        question: 'What should I do in case of an accident?',
        answer: '1. Ensure everyone is safe. 2. Call the police (191) immediately. 3. Call our 24/7 Emergency Roadside Assistance. 4. Do not admit liability. 5. Obtain a police report. We will guide you through the rest of the process.'
    },

    // Vehicle & Services
    {
        category: 'Vehicle & Services',
        question: 'Are your cars pet-friendly?',
        answer: 'We love pets! Small pets are allowed in our vehicles, provided they are in a carrier. Please note that excessive cleaning fees will apply if there is pet hair or odors left in the vehicle.'
    },
    {
        category: 'Vehicle & Services',
        question: 'Do you offer child seats?',
        answer: 'Yes, we offer ISOFIX-compliant baby seats and boosters for all ages. Please request these at the time of booking to ensure availability (daily fee applies).'
    },
    {
        category: 'Vehicle & Services',
        question: 'Is smoking allowed in the car?',
        answer: 'No. All EasyGo fleet vehicles are strictly non-smoking. A significant cleaning fee (starting at 3,000 THB) will be charged for any evidence of smoking, including odors or ash.'
    },
    {
        category: 'Vehicle & Services',
        question: 'Can I drive the car to other provinces?',
        answer: 'Yes, you can drive anywhere within Thailand. Driving outside of Thailand (e.g., into Laos or Malaysia) is strictly prohibited due to insurance and customs regulations.'
    }
]

export const categories = [
    'All',
    'Rental Basics',
    'Booking & Reservations',
    'Subscription',
    'Corporate Fleet',
    'Insurance & Coverage',
    'Vehicle & Services'
]
