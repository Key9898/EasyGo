import { useEffect, useState } from 'react'
import { db, auth } from '../../../firebaseConfig'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { ClipboardList } from 'lucide-react'
import type { SubscriptionRequest } from '../../../types'
import SubscriptionRequestCard from './components/SubscriptionRequestCard'

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
                            <SubscriptionRequestCard key={sub.id} request={sub} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
