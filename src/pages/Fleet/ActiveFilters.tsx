import type { SearchParams } from '../../types'

interface ActiveFiltersProps {
    searchParams: SearchParams
    onClearFilters: () => void
}

export default function ActiveFilters({ searchParams, onClearFilters }: ActiveFiltersProps) {
    const hasFilters = searchParams.location || searchParams.carType || searchParams.pickupDate

    if (!hasFilters) return null

    return (
        <div className="mb-6 flex flex-wrap gap-2">
            <span className="text-sm font-medium text-slate-700">Active Filters:</span>
            {searchParams.location && (
                <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                    📍 {searchParams.location}
                </span>
            )}
            {searchParams.carType && (
                <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                    🚗 {searchParams.carType}
                </span>
            )}
            {searchParams.pickupDate && (
                <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                    📅 {searchParams.pickupDate} → {searchParams.returnDate}
                </span>
            )}
            <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-300"
            >
                Clear All
            </button>
        </div>
    )
}
