import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { db } from '../../../firebaseConfig'
import {
    collection,
    query,
    orderBy,
    deleteDoc,
    doc,
    onSnapshot
} from 'firebase/firestore'
import NotificationItem, { type Notification } from './components/NotificationItem'
import NotificationStats from './components/NotificationStats'
import Pagination from '../Common/Pagination'

export default function NotificationList() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(true)

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 10

    useEffect(() => {
        if (!db) {
            setLoading(false)
            return
        }

        const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notificationsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Notification[]
            setNotifications(notificationsData)
            setLoading(false)
        }, (error) => {
            console.error('Error fetching notifications:', error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this notification?')) return

        if (!db) return
        try {
            await deleteDoc(doc(db!, 'notifications', id))
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'success', title: 'Success', message: 'Notification deleted' }
            }))
        } catch (error) {
            console.error('Error deleting notification:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to delete notification' }
            }))
        }
    }

    // Pagination Logic
    const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE)
    const paginatedNotifications = notifications.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Notify Me Submissions</h2>
                </div>
                <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">
                    Total: {notifications.length}
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {paginatedNotifications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                        <Bell className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">No notifications yet.</p>
                    </div>
                ) : (
                    paginatedNotifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalPosts={notifications.length}
                postsPerPage={ITEMS_PER_PAGE}
            />

            {/* Summary Stats */}
            <NotificationStats notifications={notifications} />
        </div>
    )
}
