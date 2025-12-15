import { User, Phone, MessageSquare, Calendar } from 'lucide-react'
import type { SubscriptionRequest } from '../../../../types'

interface SubscriptionRequestCardProps {
    request: SubscriptionRequest
}

export default function SubscriptionRequestCard({ request }: SubscriptionRequestCardProps) {
    const getStatusBadge = (status: SubscriptionRequest['status']) => {
        const config = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
            contacted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Contacted' },
            confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
            cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
        }
        const style = config[status] || config.pending
        const displayLabel = style.label || status.charAt(0).toUpperCase() + status.slice(1)

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
                {displayLabel}
            </span>
        )
    }

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A'
        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }).format(date)
        } catch { return 'N/A' }
    }

    return (
        <div className="border border-slate-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-slate-900">{request.planLabel} Plan</h3>
                        {getStatusBadge(request.status)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <span className="font-medium text-slate-900">{request.fullName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span>{request.phone}</span>
                        </div>
                        {request.lineId && (
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-slate-400" />
                                <span>Line ID: {request.lineId}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>Desired Start: {request.desiredStartDate}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                    <div className="text-xs text-slate-500">
                        Submitted on {formatDate(request.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}
