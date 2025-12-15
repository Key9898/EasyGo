interface QuickActionsProps {
    onViewChange: (view: any) => void
}

export default function QuickActions({ onViewChange }: QuickActionsProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                    type="button"
                    onClick={() => onViewChange('fleet')}
                    className="px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                >
                    Add New Car
                </button>
                <button
                    type="button"
                    onClick={() => onViewChange('bookings')}
                    className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                    View All Bookings
                </button>
                <button
                    type="button"
                    onClick={() => onViewChange('subscriptions')}
                    className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                    Subscription Requests
                </button>
                <button
                    type="button"
                    onClick={() => onViewChange('corporate')}
                    className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                    Corporate Requests
                </button>
            </div>
        </div>
    )
}
