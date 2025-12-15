import { Clock, MessageSquare, CheckCircle } from 'lucide-react'
import type { Inquiry } from '../../../../types'

interface InquiryStatsProps {
    inquiries: Inquiry[]
}

export default function InquiryStats({ inquiries }: InquiryStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Total Inquiries</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {inquiries.length}
                        </p>
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
                        <p className="text-2xl font-bold text-slate-900">
                            {inquiries.filter(i => i.status === 'contacted').length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Resolved</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {inquiries.filter(i => i.status === 'resolved').length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
