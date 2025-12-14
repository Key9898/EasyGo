import { useEffect, useState } from 'react'
import { Car, Calendar, DollarSign, TrendingUp } from 'lucide-react'
import { db } from '../../../firebaseConfig'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

interface OverviewProps {
    onViewChange: (view: any) => void
}

interface StatsCardProps {
    title: string
    value: string | number
    icon: React.ElementType
    trend?: string
    trendUp?: boolean
}

function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600">{title}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                            <TrendingUp className={`w-4 h-4 ${!trendUp && 'rotate-180'}`} />
                            <span>{trend}</span>
                        </div>
                    )}
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                    <Icon className="w-8 h-8 text-orange-600" />
                </div>
            </div>
        </div>
    )
}

export default function Overview({ onViewChange }: OverviewProps) {
    const [stats, setStats] = useState({
        totalCars: 0,
        activeBookings: 0,
        revenue: '0',
        inquiries: 0
    })
    const [activities, setActivities] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            if (!db) {
                setLoading(false)
                return
            }
            try {
                // Fetch cars count
                const carsSnapshot = await getDocs(collection(db!, 'cars'))
                const totalCars = carsSnapshot.size

                // Fetch bookings
                const bookingsSnapshot = await getDocs(collection(db!, 'bookings'))
                const allBookings = bookingsSnapshot.docs.map(doc => doc.data())

                const activeBookings = allBookings.filter(b => b.status === 'confirmed').length

                // Calculate Revenue (Confirmed + Completed)
                const revenueTotal = allBookings
                    .filter(b => b.status === 'confirmed' || b.status === 'completed')
                    .reduce((acc, curr) => acc + (Number(curr.totalPrice) || 0), 0)

                // Fetch inquiries (Notify Me) and Messages (Get In Touch)
                const inquiriesSnapshot = await getDocs(collection(db!, 'inquiries'))
                const messagesSnapshot = await getDocs(collection(db!, 'messages'))
                const notificationsSnapshot = await getDocs(collection(db!, 'notifications'))
                const totalInquiries = inquiriesSnapshot.size + messagesSnapshot.size + notificationsSnapshot.size

                setStats({
                    totalCars,
                    activeBookings,
                    revenue: revenueTotal.toLocaleString(),
                    inquiries: totalInquiries
                })

                // Fetch Recent Activity
                const recentBookings = await getDocs(query(collection(db!, 'bookings'), orderBy('createdAt', 'desc'), limit(5)))
                const recentCars = await getDocs(query(collection(db!, 'cars'), orderBy('createdAt', 'desc'), limit(5)))

                const acts = [
                    ...recentBookings.docs.map(d => ({
                        action: 'New booking created',
                        time: d.data().createdAt,
                        type: 'booking'
                    })),
                    ...recentCars.docs.map(d => ({
                        action: 'Car added to fleet',
                        time: d.data().createdAt,
                        type: 'car'
                    }))
                ]

                // Sort by time desc and take top 5
                acts.sort((a, b) => {
                    const t1 = a.time?.toDate ? a.time.toDate() : new Date(a.time || 0)
                    const t2 = b.time?.toDate ? b.time.toDate() : new Date(b.time || 0)
                    return t2 - t1
                })

                setActivities(acts.slice(0, 5))

            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    const formatTimeAgo = (timestamp: any) => {
        if (!timestamp) return 'Just now'
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

        if (diffInSeconds < 60) return `${diffInSeconds}s ago`
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
        return `${Math.floor(diffInSeconds / 86400)}d ago`
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Cars"
                    value={stats.totalCars}
                    icon={Car}
                    trend="+12% from last month"
                    trendUp={true}
                />
                <StatsCard
                    title="Active Bookings"
                    value={stats.activeBookings}
                    icon={Calendar}
                    trend="+8% from last month"
                    trendUp={true}
                />
                <StatsCard
                    title="Revenue (THB)"
                    value={stats.revenue}
                    icon={DollarSign}
                    trend="+23% from last month"
                    trendUp={true}
                />
                <StatsCard
                    title="Total Inquiries"
                    value={stats.inquiries}
                    icon={TrendingUp}
                    trend="+5% from last month"
                    trendUp={true}
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button
                        type="button"
                        onClick={() => onViewChange('fleet')}
                        className="px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                    >
                        Add New Car
                    </button>
                    <button
                        type="button"
                        onClick={() => onViewChange('bookings')}
                        className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                    >
                        View All Bookings
                    </button>
                    <button
                        type="button"
                        onClick={() => onViewChange('subscriptions')}
                        className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                    >
                        Subscription Requests
                    </button>
                    <button
                        type="button"
                        onClick={() => onViewChange('corporate')}
                        className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                    >
                        Corporate Requests
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {activities.length === 0 ? (
                        <p className="text-slate-500 text-sm">No recent activity.</p>
                    ) : (
                        activities.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${activity.type === 'booking' ? 'bg-green-500' :
                                        activity.type === 'car' ? 'bg-blue-500' : 'bg-orange-500'
                                        }`} />
                                    <span className="text-slate-700">{activity.action}</span>
                                </div>
                                <span className="text-sm text-slate-500">{formatTimeAgo(activity.time)}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
