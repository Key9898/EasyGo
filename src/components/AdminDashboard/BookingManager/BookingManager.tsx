import { useEffect, useState } from 'react'
import { Calendar, Clock, CheckCircle, CheckCheck, XCircle } from 'lucide-react'
import { db } from '../../../firebaseConfig'
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    query,
    orderBy,
    where,
    limit,
    startAfter
} from 'firebase/firestore'
import type { Booking } from '../../../types'
import BookingTable from './BookingTable'

export default function BookingManager() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')

    // Pagination State
    const [lastVisible, setLastVisible] = useState<any>(null)
    const [hasMore, setHasMore] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const BOOKINGS_PER_PAGE = 20

    useEffect(() => {
        fetchBookings(true)
    }, [])

    const fetchBookings = async (isInitial = false) => {
        if (!db) {
            setLoading(false)
            return
        }

        try {
            if (isInitial) {
                setLoading(true)
            } else {
                setLoadingMore(true)
            }

            let q = query(
                collection(db, 'bookings'),
                orderBy('createdAt', 'desc'),
                limit(BOOKINGS_PER_PAGE)
            )

            if (!isInitial && lastVisible) {
                q = query(q, startAfter(lastVisible))
            }

            const querySnapshot = await getDocs(q)

            // Update cursor
            const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
            setLastVisible(lastVisibleDoc)

            // Check if we have more
            if (querySnapshot.docs.length < BOOKINGS_PER_PAGE) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }

            const newBookings = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Booking[]

            if (isInitial) {
                setBookings(newBookings)
            } else {
                setBookings(prev => [...prev, ...newBookings])
            }

        } catch (error) {
            console.error('Error fetching bookings:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to load bookings' }
            }))
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }

    const handleStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
        if (!db) return
        try {
            await updateDoc(doc(db!, 'bookings', bookingId), {
                status: newStatus
            })

            // Auto-update car status based on booking status
            const booking = bookings.find(b => b.id === bookingId)
            if (booking && booking.carName) {
                const carsRef = collection(db!, 'cars')
                const q = query(carsRef, where('name', '==', booking.carName), limit(1))
                const carSnapshot = await getDocs(q)

                if (!carSnapshot.empty) {
                    const carDoc = carSnapshot.docs[0]
                    let carStatus = 'available'

                    if (newStatus === 'confirmed') {
                        carStatus = 'booked'
                    } else if (newStatus === 'completed' || newStatus === 'cancelled') {
                        carStatus = 'available'
                    } else if (newStatus === 'pending') {
                        // If moved back to pending, maybe make available or keep as is?
                        // Usually pending means not yet booked, so available.
                        carStatus = 'available'
                    }

                    await updateDoc(doc(db!, 'cars', carDoc.id), {
                        status: carStatus
                    })
                }
            }

            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'success', title: 'Success', message: 'Booking status updated' }
            }))

            fetchBookings()
        } catch (error) {
            console.error('Error updating booking:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to update booking' }
            }))
        }
    }


    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status === filter)

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header with Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900">Booking Management</h2>

                <div className="flex gap-2 overflow-x-auto">
                    {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
                        <button
                            type="button"
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${filter === status
                                ? 'bg-orange-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings Table */}
            <BookingTable
                bookings={filteredBookings}
                onStatusChange={handleStatusChange}
            />

            {/* Load More Button */}
            {hasMore && filter === 'all' && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => fetchBookings(false)}
                        disabled={loadingMore}
                        className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 text-sm font-medium"
                    >
                        {loadingMore ? 'Loading more...' : 'Load More Bookings'}
                    </button>
                </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <Calendar className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Total Bookings</p>
                            <p className="text-2xl font-bold text-slate-900">{bookings.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Clock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Pending</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {bookings.filter(b => b.status === 'pending').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Confirmed</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {bookings.filter(b => b.status === 'confirmed').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <CheckCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Completed</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {bookings.filter(b => b.status === 'completed').length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Cancelled</p>
                            <p className="text-2xl font-bold text-slate-900">
                                {bookings.filter(b => b.status === 'cancelled').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
