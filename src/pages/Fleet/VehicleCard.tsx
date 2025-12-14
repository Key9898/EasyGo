import type { Vehicle } from '../../types'
import { StarIcon } from '@heroicons/react/20/solid'

function extractNameAndYear(name: string): { cleanName: string; year?: string } {
    const match = name.match(/\b(?:19|20)\d{2}\b$/)
    if (match) {
        const year = match[0]
        const cleanName = name.replace(new RegExp(`\\s+${year}$`), '')
        return { cleanName, year }
    }
    return { cleanName: name }
}

interface VehicleCardProps {
    vehicle: Vehicle
    isBooked: boolean
    onBookClick: (vehicle: Vehicle) => void
    ratingAvg?: number
    ratingCount?: number
}

export default function VehicleCard({ vehicle, isBooked, onBookClick, ratingAvg, ratingCount }: VehicleCardProps) {
    const parsed = extractNameAndYear(vehicle.name)
    const finalYear = vehicle.year ?? parsed.year
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-white p-4">
                <img
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    loading="lazy"
                    className="h-full w-full object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                    <span className="inline-flex items-center rounded-2xl bg-orange-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        {vehicle.category}
                    </span>
                    {isBooked && (
                        <span className="inline-flex items-center rounded-2xl bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                            ✓ Booked
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-orange-600 mb-2">
                        {parsed.cleanName}
                    </h3>
                    {typeof ratingAvg === 'number' ? (
                        <div className="mb-3 flex items-center">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <StarIcon key={i} aria-hidden="true" className={(ratingAvg > i ? 'text-yellow-400' : 'text-slate-300') + ' size-5'} />
                                ))}
                            </div>
                            <p className="ml-2 text-base text-slate-900">{ratingAvg} {ratingCount ? `(${ratingCount})` : ''}</p>
                        </div>
                    ) : null}
                    <p className="text-lg text-slate-600 mb-4 line-clamp-3">
                        {vehicle.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {vehicle.features.map((feature, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-base font-medium text-slate-700"
                            >
                                {feature}
                            </span>
                        ))}
                        {finalYear && (
                            <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-base font-medium text-slate-700">
                                {finalYear}
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                    <div>
                        <p className="text-base text-slate-500">Starting from</p>
                        <p className="text-lg font-bold text-orange-600">{vehicle.price}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => onBookClick(vehicle)}
                        className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </article>
    )
}
