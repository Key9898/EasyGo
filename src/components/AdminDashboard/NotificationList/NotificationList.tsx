import { useEffect, useState } from 'react'
import { Bell, Phone, Clock } from 'lucide-react'
import { db } from '../../../firebaseConfig'
import {
    collection,
    query,
    orderBy,
    deleteDoc,
    doc,
    Timestamp,
    onSnapshot
} from 'firebase/firestore'

interface Notification {
    id: string
    name: string
    mobile: string
    createdAt?: Timestamp | Date | null
}

export default function NotificationList() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(true)

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

    const formatDate = (timestamp?: Timestamp | Date | null) => {
        if (!timestamp) return 'N/A'
        try {
            const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        } catch {
            return 'N/A'
        }
    }

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
                {notifications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                        <Bell className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">No notifications yet.</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                {/* Left: Customer Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <Bell className="w-5 h-5 text-orange-600" />
                                                {notification.name}
                                            </h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Phone className="w-4 h-4" />
                                                    <a href={`tel:${notification.mobile}`} className="hover:text-orange-600">
                                                        {notification.mobile}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timestamp */}
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Clock className="w-4 h-4" />
                                        Received: {formatDate(notification.createdAt)}
                                    </div>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex lg:flex-col gap-2">
                                    <a
                                        href={`tel:${notification.mobile}`}
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors text-center whitespace-nowrap"
                                    >
                                        Call Customer
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(notification.id)}
                                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Bell className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Total Notifications</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {notifications.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">This Week</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {notifications.filter((n) => {
                                    let date: Date
                                    if (n.createdAt instanceof Timestamp) {
                                        date = n.createdAt.toDate()
                                    } else if (n.createdAt) {
                                        date = n.createdAt as Date
                                    } else {
                                        date = new Date()
                                    }
                                    const weekAgo = new Date()
                                    weekAgo.setDate(weekAgo.getDate() - 7)
                                    return date >= weekAgo
                                }).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
