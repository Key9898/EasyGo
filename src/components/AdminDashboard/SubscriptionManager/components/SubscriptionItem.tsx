import { Phone, Calendar, MessageSquare, User } from 'lucide-react'
import type { SubscriptionRequest } from '../../../../types'
import { Timestamp } from 'firebase/firestore'

interface SubscriptionItemProps {
    item: SubscriptionRequest
    onStatusChange: (id: string, status: SubscriptionRequest['status']) => void
}

export default function SubscriptionItem({ item, onStatusChange }: SubscriptionItemProps) {

    const formatDate = (t?: Timestamp | Date | null) => {
        if (!t) return 'N/A'
        try {
            const d = (t as Timestamp)?.toDate ? (t as Timestamp).toDate() : (t as Date)
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        } catch { return 'N/A' }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{item.fullName}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Phone className="w-4 h-4" />
                                    <a href={`tel:${item.phone}`} className="hover:text-orange-600">{item.phone}</a>
                                </div>
                                {item.lineId && (
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>{item.lineId}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="px-3 py-1 inline-flex items-center gap-1.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                            <User className="w-3.5 h-3.5" />
                            {item.planLabel}
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-sm text-slate-700">
                        <Calendar className="w-4 h-4" />
                        Desired start: <span className="font-semibold">{item.desiredStartDate}</span>
                        <span className="ml-3 text-slate-500">Created: {formatDate(item.createdAt)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {(['pending', 'contacted', 'confirmed', 'cancelled'] as const).map(s => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => onStatusChange(item.id, s)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold ${item.status === s ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
