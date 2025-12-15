import { useEffect, useState } from 'react'
import { MessageSquare, Clock, Eye, CheckCircle, XCircle } from 'lucide-react'
import { db } from '../../../firebaseConfig'
import {
    collection,
    updateDoc,
    doc,
    query,
    orderBy,
    deleteDoc,
    onSnapshot
} from 'firebase/firestore'

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

export default function ApplicationManager() {
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'accepted' | 'rejected'>('all')

    useEffect(() => {
        if (!db) {
            setLoading(false)
            return
        }

        const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const applicationsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Application[]
            setApplications(applicationsData)
            setLoading(false)
        }, (error) => {
            console.error('Error fetching applications:', error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleStatusChange = async (applicationId: string, newStatus: Application['status']) => {
        if (!db) return
        try {
            await updateDoc(doc(db!, 'applications', applicationId), {
                status: newStatus
            })

            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'success', title: 'Success', message: 'Application status updated' }
            }))
        } catch (error) {
            console.error('Error updating application:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to update application' }
            }))
        }
    }

    const handleDelete = async (applicationId: string) => {
        if (!db) return
        if (!confirm('Are you sure you want to delete this application?')) return

        try {
            await deleteDoc(doc(db!, 'applications', applicationId))
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'success', title: 'Deleted', message: 'Application deleted successfully' }
            }))
        } catch (error) {
            console.error('Error deleting application:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to delete application' }
            }))
        }
    }

    const filteredApplications = filter === 'all'
        ? applications
        : applications.filter(a => a.status === filter)

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header with Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900">Job Applications</h2>

                <div className="flex gap-2 overflow-x-auto">
                    {(['all', 'pending', 'reviewed', 'accepted', 'rejected'] as const).map((status) => (
                        <button
                            type="button"
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${filter === status
                                ? 'bg-orange-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CV</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredApplications.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No applications found
                                    </td>
                                </tr>
                            ) : (
                                filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-slate-900">{app.fullName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">{app.jobTitle}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-900">{app.email}</div>
                                            <div className="text-sm text-slate-500">{app.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-500">{app.cvFileName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusChange(app.id, e.target.value as Application['status'])}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                                        app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="accepted">Accepted</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => handleDelete(app.id)}
                                                className="text-red-600 hover:text-red-900 font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <MessageSquare className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Total Applications</p>
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
                            <p className="text-2xl font-bold text-slate-900">
                                {applications.filter(a => a.status === 'pending').length}
                            </p>
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
                            <p className="text-2xl font-bold text-slate-900">
                                {applications.filter(a => a.status === 'reviewed').length}
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
                            <p className="text-sm text-slate-600">Accepted</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {applications.filter(a => a.status === 'accepted').length}
                            </p>
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
                            <p className="text-2xl font-bold text-slate-900">
                                {applications.filter(a => a.status === 'rejected').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
