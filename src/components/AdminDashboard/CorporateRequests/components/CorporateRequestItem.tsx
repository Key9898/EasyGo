import { CheckCircle, XCircle } from 'lucide-react'
import type { CorporateRequest } from '../../../../types'

interface CorporateRequestItemProps {
    request: CorporateRequest
    onStatusChange: (id: string, status: CorporateRequest['status']) => void
}

export default function CorporateRequestItem({ request: r, onStatusChange }: CorporateRequestItemProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-base font-semibold text-slate-900">{r.companyName} • {r.contactName}</p>
                    <p className="text-sm text-slate-600">{r.email}{r.phone ? ` • ${r.phone}` : ''}</p>
                </div>
                <div className="text-sm text-slate-700">
                    <span className={`inline-flex items-center px-2 py-1 rounded font-medium ${r.status === 'approved' ? 'bg-green-100 text-green-700' :
                        r.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            r.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                                'bg-orange-100 text-orange-700'
                        }`}>
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                </div>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2"><p className="text-slate-600">Fleet Size</p><p className="font-semibold text-slate-900">{r.fleetSize}</p></div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2"><p className="text-slate-600">Segment</p><p className="font-semibold text-slate-900">{r.segment || '—'}</p></div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2"><p className="text-slate-600">Monthly Rate</p><p className="font-semibold text-slate-900">{r.monthlyRate ? `${r.monthlyRate.toLocaleString()} THB` : '—'}</p></div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 sm:col-span-1 col-span-2"><p className="text-slate-600">Note</p><p className="font-semibold text-slate-900 truncate" title={r.note || ''}>{r.note || '—'}</p></div>
            </div>
            <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => onStatusChange(r.id, 'contacted')} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500">Mark Contacted</button>
                <button type="button" onClick={() => onStatusChange(r.id, 'approved')} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-500"><CheckCircle className="inline w-4 h-4 mr-1" />Approve</button>
                <button type="button" onClick={() => onStatusChange(r.id, 'rejected')} className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-500"><XCircle className="inline w-4 h-4 mr-1" />Reject</button>
            </div>
        </div>
    )
}
