import { Calendar, FileText } from 'lucide-react'

// Define interface locally if not importing from types for simplicity in sub-component, 
// or import if possible. The main file defined it locally. 
// I'll define a props interface focused on what the card needs.
interface ApplicationCardProps {
    application: {
        id: string
        jobTitle: string
        status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
        createdAt: any
        cvFileName: string
        coverLetter: string
    }
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
    const getStatusBadge = (status: 'pending' | 'reviewed' | 'accepted' | 'rejected') => {
        const statusConfig = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending Review' },
            reviewed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Under Review' },
            accepted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Accepted' },
            rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
        }
        const config = statusConfig[status]
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                {config.label}
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
        } catch {
            return 'N/A'
        }
    }

    return (
        <div className="border border-slate-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{application.jobTitle}</h3>
                        {getStatusBadge(application.status)}
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Applied on {formatDate(application.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span>CV: {application.cvFileName}</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <details className="group">
                            <summary className="cursor-pointer text-sm font-medium text-orange-600 hover:text-orange-700 list-none flex items-center gap-1">
                                View Cover Letter
                                <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="mt-3 p-4 bg-slate-50 rounded-lg text-sm text-slate-700 whitespace-pre-wrap">
                                {application.coverLetter}
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    )
}
