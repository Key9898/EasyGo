interface BookingSummaryProps {
    days: number
    carPrice: number
    totalPrice: number
}

export default function BookingSummary({ days, carPrice, totalPrice }: BookingSummaryProps) {
    if (days <= 0) return null

    return (
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Duration:</span>
                <span className="font-semibold">{days} day{days > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Price per day:</span>
                <span className="font-semibold">{carPrice.toLocaleString()} THB</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-300">
                <span className="text-lg font-bold text-slate-900">Total:</span>
                <span className="text-2xl font-bold text-orange-600">{totalPrice.toLocaleString()} THB</span>
            </div>
        </div>
    )
}
