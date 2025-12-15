import { ClipboardList, Clock, MessageSquare, CheckCircle, XCircle } from 'lucide-react'
import type { SubscriptionRequest } from '../../../../types'

interface SubscriptionStatsProps {
    items: SubscriptionRequest[]
}

export default function SubscriptionStats({ items }: SubscriptionStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <ClipboardList className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Total Requests</p>
                        <p className="text-2xl font-bold text-slate-900">{items.length}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Pending</p>
                        <p className="text-2xl font-bold text-slate-900">{items.filter(r => r.status === 'pending').length}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Contacted</p>
                        <p className="text-2xl font-bold text-slate-900">{items.filter(r => r.status === 'contacted').length}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Confirmed</p>
                        <p className="text-2xl font-bold text-slate-900">{items.filter(r => r.status === 'confirmed').length}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Cancelled</p>
                        <p className="text-2xl font-bold text-slate-900">{items.filter(r => r.status === 'cancelled').length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
