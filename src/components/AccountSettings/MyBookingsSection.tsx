import { useEffect, useState } from 'react'
import { db, auth } from '../../firebaseConfig'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Calendar, MapPin, Car, Clock } from 'lucide-react'
import type { Booking } from '../../types'

export default function MyBookingsSection() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMyBookings()
    }, [])

    const fetchMyBookings = async () => {
        if (!db || !auth?.currentUser) {
            setLoading(false)
            return
        }

        try {
            const q = query(
                collection(db, 'bookings'),
                where('userId', '==', auth.currentUser.uid),
                orderBy('createdAt', 'desc')
            )
            const querySnapshot = await getDocs(q)
            const bookingsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Booking[]
            setBookings(bookingsData)
        } catch (error) {
            console.error('Error fetching bookings:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to load bookings' }
            }))
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status: Booking['status']) => {
        const statusConfig = {
            pending: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Pending' },
            confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
            completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed' },
            cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
        }
        const config = statusConfig[status]
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        )
    }

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A'
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
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
                    <Car className="w-5 h-5 text-orange-600" />
                    <h2 className="text-xl font-bold text-slate-900">My Bookings</h2>
                </div>
                <p className="mt-1 text-sm text-slate-600">Manage your car rental bookings</p>
            </div>

            <div className="p-6">
                {bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <Car className="mx-auto h-12 w-12 text-slate-400" />
                        <h3 className="mt-2 text-sm font-semibold text-slate-900">No bookings yet</h3>
                        <p className="mt-1 text-sm text-slate-500">You haven't made any car bookings yet.</p>
                        <div className="mt-6">
                            <a
                                href="/fleet"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                            >
                                Browse Cars
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="border border-slate-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-slate-900">{booking.carName}</h3>
                                            {getStatusBadge(booking.status)}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{booking.pickupLocation}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>Total: {booking.totalPrice?.toLocaleString()} THB</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Actions if needed, e.g. Cancel Booking if pending */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
