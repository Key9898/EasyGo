import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import {
    collection,
    updateDoc,
    doc,
    query,
    orderBy,
    deleteDoc,
    getDocs
} from 'firebase/firestore'
import ApplicationsTable, { type Application } from './components/ApplicationsTable'
import ApplicationsStats from './components/ApplicationsStats'
import Pagination from '../Common/Pagination'

export default function ApplicationManager() {
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'accepted' | 'rejected'>('all')

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 10

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        if (!db) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            const q = query(
                collection(db, 'applications'),
                orderBy('createdAt', 'desc')
            )

            const snapshot = await getDocs(q)
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Application[]

            setApplications(data)
        } catch (error) {
            console.error('Error fetching applications:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to load applications' }
            }))
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (applicationId: string, newStatus: Application['status']) => {
        if (!db) return
        try {
            await updateDoc(doc(db!, 'applications', applicationId), {
                status: newStatus
            })

            // Optimistic update
            setApplications(prev => prev.map(app =>
                app.id === applicationId ? { ...app, status: newStatus } : app
            ))

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

            // Optimistic update
            setApplications(prev => prev.filter(app => app.id !== applicationId))

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

    // Filter Logic
    const filteredApplications = filter === 'all'
        ? applications
        : applications.filter(a => a.status === filter)

    // Pagination Logic
    const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE)
    const paginatedApplications = filteredApplications.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    // Reset page on filter change
    useEffect(() => {
        setCurrentPage(1)
    }, [filter])

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
                <h2 className="text-2xl font-bold text-orange-600">Job Applications Request</h2>

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

            <ApplicationsTable
                applications={paginatedApplications}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalPosts={filteredApplications.length}
                postsPerPage={ITEMS_PER_PAGE}
            />

            <ApplicationsStats applications={applications} />
        </div>
    )
}
