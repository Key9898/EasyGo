import { useEffect, useState } from 'react'
import { db, auth } from '../../firebaseConfig'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { ClipboardList, Calendar, Phone, MessageSquare, User } from 'lucide-react'
import type { SubscriptionRequest } from '../../types'

export default function MySubscriptionsSection() {
    const [subscriptions, setSubscriptions] = useState<SubscriptionRequest[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMySubscriptions()
    }, [])

    const fetchMySubscriptions = async () => {
        if (!db || !auth?.currentUser) {
            setLoading(false)
            return
        }

        try {
            const q = query(
                collection(db, 'subscriptionRequests'),
                where('userId', '==', auth.currentUser.uid),
                orderBy('createdAt', 'desc')
            )
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as SubscriptionRequest[]
            setSubscriptions(data)
        } catch (error) {
            console.error('Error fetching subscriptions:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status: SubscriptionRequest['status']) => {
        const config = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
            contacted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Contacted' },
            confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
            cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
        }
        const style = config[status] || config.pending

        // Capitalize first letter if it's not custom label
        const displayLabel = style.label || status.charAt(0).toUpperCase() + status.slice(1)

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
                {displayLabel}
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
                    <ClipboardList className="w-5 h-5 text-orange-600" />
                    <h2 className="text-xl font-bold text-slate-900">My Subscriptions</h2>
                </div>
                <p className="mt-1 text-sm text-slate-600">Track status of your car subscription requests</p>
            </div>

            <div className="p-6">
                {subscriptions.length === 0 ? (
                    <div className="text-center py-12">
                        <ClipboardList className="mx-auto h-12 w-12 text-slate-400" />
                        <h3 className="mt-2 text-sm font-semibold text-slate-900">No subscriptions found</h3>
                        <p className="mt-1 text-sm text-slate-500">You haven't submitted any subscription requests yet.</p>
                        <div className="mt-6">
                            <a
                                href="/subscription"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                            >
                                Explore Subscriptions
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {subscriptions.map((sub) => (
                            <div key={sub.id} className="border border-slate-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-lg font-bold text-slate-900">{sub.planLabel} Plan</h3>
                                            {getStatusBadge(sub.status)}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-slate-400" />
                                                <span className="font-medium text-slate-900">{sub.fullName}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-slate-400" />
                                                <span>{sub.phone}</span>
                                            </div>
                                            {sub.lineId && (
                                                <div className="flex items-center gap-2">
                                                    <MessageSquare className="w-4 h-4 text-slate-400" />
                                                    <span>Line ID: {sub.lineId}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                <span>Desired Start: {sub.desiredStartDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                        <div className="text-xs text-slate-500">
                                            Submitted on {formatDate(sub.createdAt)}
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
