import { useEffect, useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { db } from '../../../firebaseConfig'
import {
    collection,
    updateDoc,
    doc,
    query,
    orderBy,
    Timestamp,
    onSnapshot
} from 'firebase/firestore'
import type { Inquiry } from '../../../types'
import InquiryCard from './components/InquiryCard'
import InquiryStats from './components/InquiryStats'
import Pagination from '../Common/Pagination'

export default function InquiryList() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all')

    const [inquiriesData, setInquiriesData] = useState<any[]>([])
    const [messagesData, setMessagesData] = useState<any[]>([])
    const [notificationsData, setNotificationsData] = useState<any[]>([])

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 10

    useEffect(() => {
        if (!db) {
            setLoading(false)
            return
        }

        const q1 = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'))
        const q2 = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
        const q3 = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'))

        const unsub1 = onSnapshot(q1, (snap) => setInquiriesData(snap.docs.map(d => ({ id: d.id, ...d.data(), source: 'inquiries' }))))
        const unsub2 = onSnapshot(q2, (snap) => setMessagesData(snap.docs.map(d => ({ id: d.id, ...d.data(), source: 'messages' }))))
        const unsub3 = onSnapshot(q3, (snap) => setNotificationsData(snap.docs.map(d => ({
            id: d.id,
            ...d.data(),
            status: (d.data() as any).status || 'new',
            message: 'Notify Me Request',
            source: 'notifications'
        }))))

        setLoading(false)

        return () => {
            unsub1()
            unsub2()
            unsub3()
        }
    }, [])

    useEffect(() => {
        const mixed = [...inquiriesData, ...messagesData, ...notificationsData] as unknown as Inquiry[]
        mixed.sort((a, b) => {
            const t1 = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0)
            const t2 = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0)
            return t2.getTime() - t1.getTime()
        })
        setInquiries(mixed)
    }, [inquiriesData, messagesData, notificationsData])

    const handleStatusChange = async (inquiryId: string, newStatus: Inquiry['status']) => {
        if (!db) return

        const inquiry = inquiries.find(i => i.id === inquiryId)
        const collectionName = (inquiry as any)?.source || 'inquiries'

        try {
            await updateDoc(doc(db!, collectionName, inquiryId), {
                status: newStatus
            })

            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'success', title: 'Success', message: 'Inquiry status updated' }
            }))
        } catch (error) {
            console.error('Error updating inquiry:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to update inquiry' }
            }))
        }
    }

    const filteredInquiries = filter === 'all'
        ? inquiries
        : inquiries.filter(i => i.status === filter)

    const formatDate = (timestamp?: Timestamp | Date | null) => {
        if (!timestamp) return 'N/A'
        try {
            const date = (timestamp as Timestamp)?.toDate ? (timestamp as Timestamp).toDate() : (timestamp as Date)
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

    // Pagination Logic
    const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE)
    const paginatedInquiries = filteredInquiries.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

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
                <h2 className="text-2xl font-bold text-orange-600">Customer Inquiries</h2>

                <div className="flex gap-2 overflow-x-auto">
                    {(['all', 'new', 'contacted', 'resolved'] as const).map((status) => (
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

            {/* Inquiries List */}
            <div className="space-y-4">
                {paginatedInquiries.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                        <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">No inquiries found.</p>
                    </div>
                ) : (
                    paginatedInquiries.map((inquiry) => (
                        <InquiryCard
                            key={inquiry.id}
                            inquiry={inquiry}
                            formattedDate={formatDate(inquiry.createdAt)}
                            onStatusChange={handleStatusChange}
                        />
                    ))
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalPosts={filteredInquiries.length}
                postsPerPage={ITEMS_PER_PAGE}
            />

            {/* Summary Stats */}
            <InquiryStats inquiries={inquiries} />
        </div>
    )
}
