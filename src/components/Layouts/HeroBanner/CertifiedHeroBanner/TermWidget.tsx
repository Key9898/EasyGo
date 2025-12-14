import { FaClipboardCheck, FaTools, FaHeadset } from 'react-icons/fa'
import { FaHandSparkles } from 'react-icons/fa6'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

export default function CertifiedWidget() {
    const features = [
        {
            icon: FaClipboardCheck,
            text: '20-point Inspection',
            color: 'text-orange-500'
        },
        {
            icon: FaHandSparkles,
            text: 'Hygiene & Cleanliness',
            color: 'text-orange-500'
        },
        {
            icon: FaTools,
            text: 'Fleet Maintenance',
            color: 'text-orange-500'
        },
        {
            icon: FaHeadset,
            text: 'Customer Support',
            color: 'text-orange-500'
        }
    ]

    return (
        <div className="mt-8">
            <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-2xl border border-white/10">
                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                    {/* Title Section */}
                    <div className="flex items-center gap-2 lg:pr-6 lg:border-r lg:border-white/30">
                        <CheckBadgeIcon className="size-6 sm:size-7 text-orange-500 flex-shrink-0" />
                        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white whitespace-nowrap">
                            EasyGo Certified
                        </h2>
                    </div>

                    {/* Feature Cards */}
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {features.map((feature) => (
                                <div key={feature.text} className="flex flex-col items-center text-center gap-2 group">
                                    <div className={`p-2.5 sm:p-3 rounded-full bg-white/10 ${feature.color} group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="size-5 sm:size-6" />
                                    </div>
                                    <span className="text-white font-medium text-xs sm:text-sm leading-tight">
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
