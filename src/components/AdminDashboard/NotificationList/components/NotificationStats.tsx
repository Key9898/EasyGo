import { Bell, Clock } from 'lucide-react'
import { Timestamp } from 'firebase/firestore'
import type { Notification } from './NotificationItem'

interface NotificationStatsProps {
    notifications: Notification[]
}

export default function NotificationStats({ notifications }: NotificationStatsProps) {
    return (
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
    )
}
