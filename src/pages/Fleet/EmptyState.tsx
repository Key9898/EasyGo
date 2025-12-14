interface EmptyStateProps {
    onClearFilters: () => void
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            <p className="text-lg text-slate-600">No vehicles found matching your criteria.</p>
            <button
                type="button"
                onClick={onClearFilters}
                className="mt-4 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
            >
                Clear Filters
            </button>
        </div>
    )
}
