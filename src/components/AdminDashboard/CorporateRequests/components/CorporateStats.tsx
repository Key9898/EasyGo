import { Building2, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react'
import type { CorporateRequest } from '../../../../types'

interface CorporateStatsProps {
    requests: CorporateRequest[]
}

export default function CorporateStats({ requests }: CorporateStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <Building2 className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Total Requests</p>
                        <p className="text-2xl font-bold text-slate-900">{requests.length}</p>
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
                        <p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'pending').length}</p>
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
                        <p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'contacted').length}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Approved</p>
                        <p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'approved').length}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Rejected</p>
                        <p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'rejected').length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
