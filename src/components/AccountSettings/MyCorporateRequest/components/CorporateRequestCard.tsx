import { User, Mail, Phone, Calendar } from 'lucide-react'
import type { CorporateRequest } from '../../../../types'

interface CorporateRequestCardProps {
    request: CorporateRequest
}

export default function CorporateRequestCard({ request }: CorporateRequestCardProps) {
    const getStatusBadge = (status: CorporateRequest['status']) => {
        const config = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
            new: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' }, // Handle legacy 'new'
            contacted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Contacted' },
            approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
            rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
        }
        // @ts-ignore - in case status is something else
        const style = config[status] || config.pending

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
                {style.label}
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
                        <h3 className="text-lg font-bold text-slate-900">{request.companyName}</h3>
                        {getStatusBadge(request.status)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <span>{request.contactName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <span>{request.email}</span>
                        </div>
                        {request.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span>{request.phone}</span>
                            </div>
                        )}
                        <div className="rounded-md bg-slate-50 px-2 py-1">
                            <span className="font-medium text-slate-900">Fleet Size:</span> {request.fleetSize}
                        </div>
                        {request.monthlyRate && (
                            <div className="rounded-md bg-slate-50 px-2 py-1">
                                <span className="font-medium text-slate-900">Budget:</span> {request.monthlyRate.toLocaleString()} THB
                            </div>
                        )}
                    </div>

                    {request.note && (
                        <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm italic text-slate-600 border border-slate-100">
                            "{request.note}"
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-end justify-between">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(request.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}
