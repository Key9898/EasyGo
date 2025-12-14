import { FaCar, FaCalendarAlt, FaBuilding } from 'react-icons/fa'

interface CertifiedCTAProps {
    onNavigate?: (page: string) => void
}

export default function CertifiedCTA({ onNavigate }: CertifiedCTAProps) {
    const ctaButtons = [
        {
            icon: FaCar,
            text: 'Explore Fleet',
            page: 'fleet',
            ariaLabel: 'Explore our vehicle fleet'
        },
        {
            icon: FaCalendarAlt,
            text: 'Subscription Plans',
            page: 'subscription',
            ariaLabel: 'View subscription plans'
        },
        {
            icon: FaBuilding,
            text: 'Corporate Fleet',
            page: 'corporate',
            ariaLabel: 'Corporate fleet solutions'
        },
    ]

    return (
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl shadow-xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Find the Right Drive for You</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                Whether you need a personal vehicle, a monthly subscription plan, or a business fleet, we have a solution tailored to your journey.
            </p>

            {/* Desktop: Icon buttons with hover text */}
            <div className="hidden lg:flex gap-6 justify-center">
                {ctaButtons.map((button) => (
                    <button
                        key={button.page}
                        type="button"
                        onClick={() => onNavigate?.(button.page)}
                        aria-label={button.ariaLabel}
                        className="group relative inline-flex items-center justify-center min-w-[4rem] h-16 px-4 bg-white text-orange-600 rounded-lg hover:bg-orange-50 hover:min-w-[12rem] transition-all duration-300 ease-in-out shadow-lg will-change-transform"
                    >
                        <button.icon className="text-2xl flex-shrink-0" />
                        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 transition-all duration-300 ease-in-out whitespace-nowrap font-semibold">
                            {button.text}
                        </span>
                    </button>
                ))}
            </div>

            {/* Tablet & Mobile: Full buttons */}
            <div className="flex lg:hidden flex-col sm:flex-row gap-4 justify-center">
                {ctaButtons.map((button) => (
                    <button
                        key={button.page}
                        type="button"
                        onClick={() => onNavigate?.(button.page)}
                        className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors shadow-lg"
                    >
                        <button.icon className="text-xl" />
                        <span>{button.text}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
