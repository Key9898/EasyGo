import { ChartBarIcon, CurrencyDollarIcon, HeartIcon } from '@heroicons/react/24/outline'
import { FaCar } from 'react-icons/fa'

export default function Benefits() {
    const benefits = [
        { name: 'Competitive Salary', description: 'Industry-leading compensation packages reviewed annually.', icon: CurrencyDollarIcon },
        { name: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage for you and your family.', icon: HeartIcon },
        { name: 'Performance Bonus', description: 'Quarterly and annual bonuses based on company and individual performance.', icon: ChartBarIcon },
        { name: 'Staff Discounts', description: 'Exclusive rental rates for employees and their immediate family members.', icon: FaCar },
    ]

    return (
        <>
            <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-orange-600">Perks & Benefits</h2>
                <p className="mt-2 text-lg text-slate-600">We take care of our people so they can take care of our customers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit) => (
                    <div key={benefit.name} className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <benefit.icon className="h-10 w-10 text-orange-600 mb-4" />
                        <h3 className="text-xl font-bold text-orange-600 mb-2">{benefit.name}</h3>
                        <p className="text-slate-600 text-base leading-relaxed">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
