import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, query, orderBy, updateDoc, doc, deleteDoc, Timestamp, onSnapshot } from 'firebase/firestore'
import { Trash2, Pencil } from 'lucide-react'

type Review = { id: string; userName?: string; userId?: string; carName?: string; rating: number; text: string; createdAt?: string }

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [editing, setEditing] = useState<Record<string, { rating: number; text: string }>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) return
    setLoading(true)
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(
      q,
      (snaps) => {
        const list: Review[] = snaps.docs.map((d) => {
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
        setLoading(false)
      },
      (err) => {
        const code = (typeof err === 'object' && err && 'code' in (err as object)) ? (err as { code?: string }).code : undefined
        const msg = code === 'permission-denied' ? 'Missing or insufficient permissions' : 'Failed to load reviews'
        window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Load error', message: msg } }))
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  const startEdit = (r: Review) => {
    setEditing((s) => ({ ...s, [r.id]: { rating: r.rating, text: r.text } }))
  }

  const saveEdit = async (id: string) => {
    if (!db) return
    const v = editing[id]
    if (!v) return
    try {
      await updateDoc(doc(db, 'reviews', id), { rating: v.rating, text: v.text })
      setReviews((list) => list.map((r) => (r.id === id ? { ...r, rating: v.rating, text: v.text } : r)))
      setEditing((s) => { const next = { ...s }; delete next[id]; return next })
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
      setReviews((list) => list.filter((r) => r.id !== id))
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Review deleted' } }))
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Delete failed' } }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Reviews Management</h2>
        <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">Total: {reviews.length}</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-slate-600">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Car</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {reviews.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No reviews found.</td></tr>
              ) : (
                reviews.map((r) => {
                  const edit = editing[r.id]
                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{r.userName || r.userId || 'Unknown'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{r.carName || '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {!edit ? (
                          <span className="inline-flex items-center gap-1">
                            {r.rating} / 5
                          </span>
                        ) : (
                          <select value={edit.rating} onChange={(e) => setEditing((s) => ({ ...s, [r.id]: { ...s[r.id], rating: Number(e.target.value) } }))} className="px-2 py-1 border border-slate-300 rounded-lg text-sm" title="Rating">
                            {[5,4,3,2,1].map((n) => (<option key={n} value={n}>{n}</option>))}
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {!edit ? (
                          <p className="text-slate-700 max-w-xl truncate" title={r.text}>{r.text}</p>
                        ) : (
                          <input value={edit.text} onChange={(e) => setEditing((s) => ({ ...s, [r.id]: { ...s[r.id], text: e.target.value } }))} className="w-full max-w-xl px-2 py-1 border border-slate-300 rounded-lg text-sm" title="Review text" placeholder="Update review" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{r.createdAt || '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {!edit ? (
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => startEdit(r)} className="px-3 py-1 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-500" title="Edit"><Pencil className="w-4 h-4 inline" /></button>
                            <button type="button" onClick={() => removeReview(r.id)} className="px-3 py-1 bg-rose-600 text-white rounded-lg text-sm hover:bg-rose-500" title="Delete"><Trash2 className="w-4 h-4 inline" /></button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => saveEdit(r.id)} className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500" title="Save">Save</button>
                            <button type="button" onClick={() => setEditing((s) => { const next = { ...s }; delete next[r.id]; return next })} className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-100" title="Cancel">Cancel</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  )
}
