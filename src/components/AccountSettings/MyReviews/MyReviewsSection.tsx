import { useEffect, useMemo, useState } from 'react'
import { db, auth } from '../../../firebaseConfig'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { Star } from 'lucide-react'
import ReviewItem, { type Review } from './components/ReviewItem'

export default function MyReviewsSection() {
  const user = auth?.currentUser || null
  const uid = user?.uid || ''
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const canLoad = useMemo(() => !!db && !!uid, [uid])

  useEffect(() => {
    const load = async () => {
      if (!canLoad) {
        setLoading(false)
        return
      }
      const fdb = db
      if (!fdb) return
      try {
        const q = query(collection(fdb, 'reviews'), where('userId', '==', uid))
        const snaps = await getDocs(q)
        const list: Review[] = snaps.docs.map((d) => {
          const data = d.data()
          return {
            id: d.id,
            carName: data.carName,
            rating: Number(data.rating) || 0,
            text: String(data.text || ''),
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
          }
        })
        setReviews(list)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [canLoad, uid])

  const handleSave = async (id: string, rating: number, text: string) => {
    if (!db) return
    try {
      await updateDoc(doc(db, 'reviews', id), { rating, text })
      setReviews((list) => list.map((r) => (r.id === id ? { ...r, rating, text } : r)))
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Review updated' } }))
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Update failed' } }))
    }
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
          <Star className="w-5 h-5 text-orange-600" />
          <h2 className="text-xl font-bold text-slate-900">My Reviews</h2>
        </div>
        <p className="mt-1 text-sm text-slate-600">Manage and edit your submitted reviews</p>
      </div>

      <div className="p-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-semibold text-slate-900">No reviews yet</h3>
            <p className="mt-1 text-sm text-slate-500">You haven't submitted any reviews yet.</p>
            <div className="mt-6">
              <a
                href="/reviews"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                Browse Reviews
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <ReviewItem
                key={r.id}
                review={r}
                onSave={handleSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
