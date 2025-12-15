import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, orderBy, query, updateDoc, doc, getDocs } from 'firebase/firestore'
import { ClipboardList } from 'lucide-react'
import type { SubscriptionRequest } from '../../../types'
import SubscriptionItem from './components/SubscriptionItem'
import SubscriptionStats from './components/SubscriptionStats'
import Pagination from '../Common/Pagination'

export default function SubscriptionRequestsManager() {
  const [items, setItems] = useState<SubscriptionRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted' | 'confirmed' | 'cancelled'>('all')

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    if (!db) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const q = query(
        collection(db, 'subscriptionRequests'),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as SubscriptionRequest[]

      setItems(data)
    } catch (err) {
      console.error('Error fetching subscription requests:', err)
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Error', message: 'Failed to load subscription requests' } }))
    } finally {
      setLoading(false)
    }
  }

  const handleStatus = async (id: string, status: SubscriptionRequest['status']) => {
    if (!db) return
    try {
      await updateDoc(doc(db!, 'subscriptionRequests', id), { status })
      setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item))
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Updated', message: 'Status updated' } }))
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Error', message: 'Failed to update' } }))
    }
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter)

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-orange-600">Subscription Requests</h2>
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'pending', 'contacted', 'confirmed', 'cancelled'] as const).map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${filter === s ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {paginatedItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
            <ClipboardList className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500">No requests found.</p>
          </div>
        ) : (
          paginatedItems.map((i) => (
            <SubscriptionItem
              key={i.id}
              item={i}
              onStatusChange={handleStatus}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalPosts={filtered.length}
        postsPerPage={ITEMS_PER_PAGE}
      />

      <SubscriptionStats items={items} />
    </div>
  )
}
