import { Mail, Phone, MessageSquare, Clock, CheckCircle } from 'lucide-react'
import type { Inquiry } from '../../../types'

interface InquiryCardProps {
    inquiry: Inquiry
    formattedDate: string
    onStatusChange: (inquiryId: string, newStatus: Inquiry['status']) => void
}

const statusColors = {
    new: 'bg-orange-100 text-orange-800',
    contacted: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800'
}

const statusIcons = {
    new: Clock,
    contacted: MessageSquare,
    resolved: CheckCircle
}

export default function InquiryCard({ inquiry, formattedDate, onStatusChange }: InquiryCardProps) {
    const StatusIcon = statusIcons[inquiry.status]

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Left: Customer Info */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{inquiry.name}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Mail className="w-4 h-4" />
                                    <a href={`mailto:${inquiry.email}`} className="hover:text-orange-600">
                                        {inquiry.email}
                                    </a>
                                </div>
                                {inquiry.phone && (
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Phone className="w-4 h-4" />
                                        <a href={`tel:${inquiry.phone}`} className="hover:text-orange-600">
                                            {inquiry.phone}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 inline-flex items-center gap-1.5 text-xs font-semibold rounded-full ${statusColors[inquiry.status]}`}>
                                <StatusIcon className="w-3.5 h-3.5" />
                                {inquiry.status}
                            </span>
                        </div>
                    </div>

                    {/* Car Interest */}
                    {inquiry.carInterest && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-lg text-sm text-orange-700">
                            <MessageSquare className="w-4 h-4" />
                            Interested in: <span className="font-semibold">{inquiry.carInterest}</span>
                        </div>
                    )}

                    {/* Message */}
                    <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{inquiry.message}</p>
                    </div>

                    {/* Timestamp */}
                    <p className="text-xs text-slate-500">
                        Received: {formattedDate}
                    </p>
                </div>

                {/* Right: Actions */}
                <div className="flex lg:flex-col gap-2">
                    <select
                        value={inquiry.status}
                        onChange={(e) => onStatusChange(inquiry.id, e.target.value as Inquiry['status'])}
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        title="Change inquiry status"
                    >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                    </select>

                    <a
                        href={`mailto:${inquiry.email}?subject=Re: Your inquiry about ${inquiry.carInterest || 'EasyGo'}`}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors text-center whitespace-nowrap"
                    >
                        Reply via Email
                    </a>
                </div>
            </div>
        </div>
    )
}
