import { KeyIcon, WrenchScrewdriverIcon, MapIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import type { GuideCategory } from '../../data/guideData'

interface CategoryGridProps {
    categories: GuideCategory[]
    onSelectCategory: (categoryId: string) => void
}

const iconMap = {
    key: KeyIcon,
    gas: WrenchScrewdriverIcon, // Maps 'gas' (Tech & Fuel) to Wrench/Screwdriver icon
    map: MapIcon,
    shield: ShieldCheckIcon
}

export default function CategoryGrid({ categories, onSelectCategory }: CategoryGridProps) {
    return (
        <div className="mb-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 mb-4">Explore Thailand with EasyGo</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Your complete resource hub for car rental guides, travel tips, and essential information
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => {
                    const Icon = iconMap[category.icon] || KeyIcon; // Fallback to KeyIcon if icon not found

                    return (
                        <button
                            type="button"
                            key={category.id}
                            onClick={() => onSelectCategory(category.id)}
                            className="group relative flex flex-col h-full text-left bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow"
                        >
                            <div className="flex-1 w-full">
                                <div className={`w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center mb-6 shadow-sm`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-orange-600 mb-2">{category.title}</h3>
                                <p className="text-slate-500 text-base leading-relaxed mb-6">{category.description}</p>
                            </div>

                            <div className="flex items-center text-orange-600 font-semibold text-base">
                                Explore
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
