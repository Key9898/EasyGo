interface GuideCTAProps {
    onNavigate?: (page: string) => void
}

export default function GuideCTA({ onNavigate }: GuideCTAProps) {
    return (
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl shadow-xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Visit our FAQ page or get in touch with our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    type="button"
                    onClick={() => onNavigate?.('faqs')}
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
                >
                    Visit FAQ Page
                </button>
                <button
                    type="button"
                    onClick={() => onNavigate?.('getInTouch')}
                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-colors"
                >
                    Contact Us
                </button>
            </div>
        </div>
    )
}
