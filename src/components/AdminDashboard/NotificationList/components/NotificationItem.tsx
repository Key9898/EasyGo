import { Bell, Phone, Clock } from 'lucide-react'
import { Timestamp } from 'firebase/firestore'

interface Notification {
    id: string
    name: string
    mobile: string
    createdAt?: Timestamp | Date | null
}

interface NotificationItemProps {
    notification: Notification
    onDelete: (id: string) => void
}

export default function NotificationItem({ notification, onDelete }: NotificationItemProps) {
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

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
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
                        onClick={() => onDelete(notification.id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
export type { Notification }
