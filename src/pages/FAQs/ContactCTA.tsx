import { PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

interface ContactCTAProps {
    onNavigate?: (page: string) => void
}

export default function ContactCTA({ onNavigate }: ContactCTAProps) {
    return (
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl shadow-lg p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-md">Still can't find what you're looking for?</h2>
                <p className="text-white text-lg mb-8 max-w-2xl mx-auto font-medium opacity-95 drop-shadow-md">
                    No worries! Our dedicated support team is here to help you 24/7.
                    Whether you prefer a call or a quick message, we're ready to assist.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="tel:+6621234567"
                        className="inline-flex items-center justify-center px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-all shadow-md group"
                    >
                        <PhoneIcon className="w-5 h-5 mr-2 text-orange-600 group-hover:scale-110 transition-transform" />
                        Call +66 2 123 4567
                    </a>
                    <button
                        type="button"
                        onClick={() => onNavigate?.('getInTouch')}
                        className="inline-flex items-center justify-center px-8 py-3 bg-slate-100 text-orange-600 font-bold rounded-lg hover:bg-slate-50 transition-all shadow-md group"
                    >
                        <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    )
}
