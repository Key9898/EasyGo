import { useEffect, useState } from 'react'
import { Car, Calendar, DollarSign, TrendingUp } from 'lucide-react'
import { db } from '../../../firebaseConfig'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import StatsCard from './components/StatsCard'
import QuickActions from './components/QuickActions'
import RecentActivity from './components/RecentActivity'

interface OverviewProps {
    onViewChange: (view: any) => void
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
                acts.sort((a: any, b: any) => {
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
            <QuickActions onViewChange={onViewChange} />

            {/* Recent Activity */}
            <RecentActivity activities={activities} />
        </div>
    )
}
