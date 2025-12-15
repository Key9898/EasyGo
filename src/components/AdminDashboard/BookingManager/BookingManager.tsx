import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    query,
    orderBy,
    where,
    limit
} from 'firebase/firestore'
import type { Booking } from '../../../types'
import BookingTable from './BookingTable'
import BookingStats from './components/BookingStats'
import Pagination from '../Common/Pagination'

export default function BookingManager() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1)
    const BOOKINGS_PER_PAGE = 10

    useEffect(() => {
        fetchBookings()
    }, [])

    const fetchBookings = async () => {
        if (!db) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            const q = query(
                collection(db, 'bookings'),
                orderBy('createdAt', 'desc')
            )

            const querySnapshot = await getDocs(q)
            const newBookings = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Booking[]

            setBookings(newBookings)
        } catch (error) {
            console.error('Error fetching bookings:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to load bookings' }
            }))
        } finally {
            setLoading(false)
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
                        carStatus = 'available'
                    }

                    await updateDoc(doc(db!, 'cars', carDoc.id), {
                        status: carStatus
                    })
                }
            }

            // Optimistic update
            setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b))

            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'success', title: 'Success', message: 'Booking status updated' }
            }))

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

    // Pagination Logic
    const totalPages = Math.ceil(filteredBookings.length / BOOKINGS_PER_PAGE)
    const paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * BOOKINGS_PER_PAGE,
        currentPage * BOOKINGS_PER_PAGE
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [filter])

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
                <h2 className="text-2xl font-bold text-orange-600">Booking Management</h2>

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
                bookings={paginatedBookings}
                onStatusChange={handleStatusChange}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalPosts={filteredBookings.length}
                postsPerPage={BOOKINGS_PER_PAGE}
            />

            {/* Summary Stats */}
            <BookingStats bookings={bookings} />
        </div>
    )
}
