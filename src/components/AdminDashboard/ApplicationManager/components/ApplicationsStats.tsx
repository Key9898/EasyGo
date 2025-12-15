import { MessageSquare, Clock, Eye, CheckCircle, XCircle } from 'lucide-react'
import type { Application } from './ApplicationsTable'

interface ApplicationsStatsProps {
    applications: Application[]
}

export default function ApplicationsStats({ applications }: ApplicationsStatsProps) {
    const pending = applications.filter(a => a.status === 'pending').length
    const reviewed = applications.filter(a => a.status === 'reviewed').length
    const accepted = applications.filter(a => a.status === 'accepted').length
    const rejected = applications.filter(a => a.status === 'rejected').length

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Total</p>
                        <p className="text-2xl font-bold text-slate-900">{applications.length}</p>
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
                        <p className="text-2xl font-bold text-slate-900">{pending}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Reviewed</p>
                        <p className="text-2xl font-bold text-slate-900">{reviewed}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Accepted</p>
                        <p className="text-2xl font-bold text-slate-900">{accepted}</p>
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
                        <p className="text-2xl font-bold text-slate-900">{rejected}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
