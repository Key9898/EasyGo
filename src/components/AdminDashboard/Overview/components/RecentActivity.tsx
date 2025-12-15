interface Activity {
    action: string
    time: any
    type: 'booking' | 'car' | 'other'
}

interface RecentActivityProps {
    activities: Activity[]
}

export default function RecentActivity({ activities }: RecentActivityProps) {
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

    return (
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
    )
}
