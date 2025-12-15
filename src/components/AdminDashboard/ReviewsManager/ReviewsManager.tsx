import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, query, orderBy, updateDoc, doc, deleteDoc, Timestamp, getDocs } from 'firebase/firestore'
import ReviewsTable, { type Review } from './components/ReviewsTable'
import Pagination from '../Common/Pagination'

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [editing, setEditing] = useState<Record<string, { rating: number; text: string }>>({})
  const [loading, setLoading] = useState(true)

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [reviewsPerPage] = useState(10)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    if (!db) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const q = query(
        collection(db, 'reviews'),
        orderBy('createdAt', 'desc')
      )

      const snapshot = await getDocs(q)
      const list: Review[] = snapshot.docs.map((d) => {
        const data = d.data() as { userName?: string; userId?: string; carName?: string; rating?: number; text?: string; createdAt?: Timestamp }
        return {
          id: d.id,
          userName: data.userName,
          userId: data.userId,
          carName: data.carName,
          rating: Number(data.rating) || 0,
          text: String(data.text || ''),
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
        }
      })

      setReviews(list)
    } catch (err) {
      console.error('Error loading reviews', err)
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Error', message: 'Failed to load reviews' } }))
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (r: Review) => {
    setEditing((s) => ({ ...s, [r.id]: { rating: r.rating, text: r.text } }))
  }

  const updateEditing = (id: string, field: 'rating' | 'text', value: string | number) => {
    setEditing((s) => ({ ...s, [id]: { ...s[id], [field]: value } }))
  }

  const saveEdit = async (id: string) => {
    if (!db) return
    const v = editing[id]
    if (!v) return
    try {
      await updateDoc(doc(db, 'reviews', id), { rating: v.rating, text: v.text })
      setEditing((s) => { const next = { ...s }; delete next[id]; return next })

      // Optimistic update
      setReviews(prev => prev.map(r => r.id === id ? { ...r, rating: v.rating, text: v.text } : r))

      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Review updated' } }))
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Update failed' } }))
    }
  }

  const removeReview = async (id: string) => {
    if (!db) return
    if (!confirm('Delete this review?')) return
    try {
      await deleteDoc(doc(db, 'reviews', id))

      // Optimistic update
      setReviews(prev => prev.filter(r => r.id !== id))

      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Review deleted' } }))
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Delete failed' } }))
    }
  }

  // Pagination Logic
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-orange-600">Reviews Management</h2>
        <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">Total: {reviews.length}</div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <>
          <ReviewsTable
            reviews={paginatedReviews}
            editing={editing}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={(id) => setEditing((s) => { const next = { ...s }; delete next[id]; return next })}
            onRemoveReview={removeReview}
            onUpdateEditing={updateEditing}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalPosts={reviews.length}
            postsPerPage={reviewsPerPage}
          />
        </>
      )}
    </div>
  )
}
