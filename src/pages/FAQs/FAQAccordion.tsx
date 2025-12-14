import { ChevronDownIcon } from '@heroicons/react/24/outline'
import type { FAQItem } from '../../data/faqData'

interface FAQAccordionProps {
    faqs: FAQItem[]
    openIndex: number | null
    onToggle: (index: number) => void
}

export default function FAQAccordion({ faqs, openIndex, onToggle }: FAQAccordionProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-200">
                {faqs.map((faq, index) => (
                    <div key={index} className="group">
                        <button
                            type="button"
                            onClick={() => onToggle(index)}
                            className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex-1 pr-4">
                                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2 block">
                                    {faq.category}
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                    {faq.question}
                                </h3>
                            </div>
                            <ChevronDownIcon
                                className={`w-6 h-6 text-orange-600 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
