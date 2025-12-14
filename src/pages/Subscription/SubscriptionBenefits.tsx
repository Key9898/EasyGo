import { BanknotesIcon, ShieldCheckIcon, ArrowPathIcon, LockOpenIcon } from '@heroicons/react/24/outline'

export default function SubscriptionBenefits() {
    const benefits = [
        {
            title: "Low Deposit",
            description: "Skip the large down payment required when buying a car. Only a small security deposit (ranging from 5,000 - 20,000 THB) is needed and it is fully refundable upon contract completion and vehicle return.",
            icon: BanknotesIcon
        },
        {
            title: "All-Inclusive Fee",
            description: "Pay a single monthly fee — EasyGo covers the rest.",
            icon: ShieldCheckIcon,
            details: [
                "Comprehensive insurance",
                "Tax and registration included",
                "Routine maintenance *"
            ],
            note: "Note: Damage caused by customer negligence is chargeable to the customer."
        },
        {
            title: "Swap Freedom",
            description: "No need to stick to one car. Swap models every 6–12 months to fit your lifestyle (e.g., sedan for the city, switch to an SUV for trips).",
            icon: ArrowPathIcon
        },
        {
            title: "Flexible Commitment",
            description: "No 5–7 year contracts. Choose 1, 3, 6, or 12 months and cancel when you need.",
            icon: LockOpenIcon
        }
    ];

    return (
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-orange-600">Benefits</h2>
            <p className="mt-2 text-slate-700">Enjoy all-inclusive care and flexibility without long-term commitments.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-col h-full bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                        <benefit.icon className="size-10 text-orange-600 mb-2" />
                        <h3 className="font-semibold text-xl text-orange-600 mb-2">{benefit.title}</h3>
                        <p className="text-base text-slate-700 leading-relaxed flex-grow">
                            {benefit.description}
                        </p>
                        {benefit.details && (
                            <ul className="mt-1 space-y-2">
                                {benefit.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start text-base text-slate-700">
                                        <span className="mr-2 text-orange-600">•</span>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {benefit.note && (
                            <p className="mt-2 text-sm text-slate-500">
                                {benefit.note}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
