import { ShieldCheckIcon, SparklesIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import { FaHandshake } from 'react-icons/fa'

export default function CoreValues() {
    const coreValues = [
        {
            name: 'Safety Above All',
            description: 'Safety is our lifeblood. We prioritize your well-being over profits. Our mandatory 20-point inspection before every rental ensures that your journey is always secure.',
            icon: ShieldCheckIcon
        },
        {
            name: 'Transparent Integrity',
            description: 'True to our "EasyGo" name, we keep things simple. No confusing paperwork, no hidden fees. Zero-hassle for subscribers, zero-downtime for corporate clients.',
            icon: FaHandshake
        },
        {
            name: 'Service Excellence',
            description: 'We go beyond just renting cars. With 24/7 support and dedicated roadside assistance, our team is always ready to help ensuring you are never alone on the road.',
            icon: CheckBadgeIcon
        },
        {
            name: 'Seamless Experience',
            description: 'We never compromise on vehicle condition. Our fleet is always clean, well-maintained, and near showroom quality. No worn-out cars, no dirty interiors—ever.',
            icon: SparklesIcon
        },
    ]

    return (
        <section>
            <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl lg:text-4xl text-left font-bold tracking-tight text-orange-600">Our Core Values</h2>
                {/* <p className="mt-4 text-lg text-slate-600">The 4 Pillars That Define EasyGo</p> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value) => (
                    <div key={value.name} className="bg-white rounded-2xl p-6 shadow-sm border-2 border-slate-200 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
                        <value.icon className="h-12 w-12 text-orange-600 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{value.name}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
