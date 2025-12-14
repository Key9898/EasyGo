import { useEffect, useState } from 'react'
import { db, auth } from '../../firebaseConfig'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Briefcase, Calendar, FileText } from 'lucide-react'

interface Application {
    id: string
    fullName: string
    email: string
    phone: string
    jobTitle: string
    coverLetter: string
    cvFileName: string
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
    userId: string
    createdAt: any
}

export default function MyApplicationsSection() {
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMyApplications()
    }, [])

    const fetchMyApplications = async () => {
        if (!db || !auth?.currentUser) {
            setLoading(false)
            return
        }

        try {
            const q = query(
                collection(db, 'applications'),
                where('userId', '==', auth.currentUser.uid),
                orderBy('createdAt', 'desc')
            )
            const querySnapshot = await getDocs(q)
            const applicationsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Application[]
            setApplications(applicationsData)
        } catch (error) {
            console.error('Error fetching applications:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to load applications' }
            }))
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status: Application['status']) => {
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
            const date = timestamp.toDate()
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }).format(date)
        } catch {
            return 'N/A'
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    <h2 className="text-xl font-bold text-slate-900">My Job Applications</h2>
                </div>
                <p className="mt-1 text-sm text-slate-600">Track the status of your job applications</p>
            </div>

            <div className="p-6">
                {applications.length === 0 ? (
                    <div className="text-center py-12">
                        <Briefcase className="mx-auto h-12 w-12 text-slate-400" />
                        <h3 className="mt-2 text-sm font-semibold text-slate-900">No applications yet</h3>
                        <p className="mt-1 text-sm text-slate-500">You haven't applied for any positions yet.</p>
                        <div className="mt-6">
                            <a
                                href="/careers"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                            >
                                Browse Open Positions
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div key={app.id} className="border border-slate-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-slate-900">{app.jobTitle}</h3>
                                            {getStatusBadge(app.status)}
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Applied on {formatDate(app.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                <span>CV: {app.cvFileName}</span>
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
                                                    {app.coverLetter}
                                                </div>
                                            </details>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
