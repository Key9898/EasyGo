import { useState } from 'react'
import SubscriptionBookingModal from '../../components/SubscribeForm/SubscriptionBooking'

interface SubscriptionCTAProps {
    onNavigate?: (page: string) => void
}

export default function SubscriptionCTA(props: SubscriptionCTAProps) {
    void props
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl shadow-xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white mb-4">Ready to start driving?</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                Experience the freedom of car subscription. No down payment, no hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
                >
                    Start Subscription
                </button>
            </div>

            <SubscriptionBookingModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
    )
}
