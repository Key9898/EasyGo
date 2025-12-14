import { useEffect, useMemo, useState } from 'react'
import { db, auth } from '../../firebaseConfig'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { Star, Pencil, Calendar } from 'lucide-react'

type Review = { id: string; carName?: string; rating: number; text: string; createdAt?: string }

function classNames(...c: (string | false | null | undefined)[]) { return c.filter(Boolean).join(' ') }

export default function MyReviewsSection() {
  const user = auth?.currentUser || null
  const uid = user?.uid || ''
  const [reviews, setReviews] = useState<Review[]>([])
  const [editing, setEditing] = useState<Record<string, { rating: number; text: string }>>({})
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

  const handleEdit = (r: Review) => {
    setEditing((s) => ({ ...s, [r.id]: { rating: r.rating, text: r.text } }))
  }

  const handleCancel = (id: string) => {
    setEditing((s) => { const next = { ...s }; delete next[id]; return next })
  }

  const handleSave = async (id: string) => {
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
            {reviews.map((r) => {
              const edit = editing[r.id]
              return (
                <div key={r.id} className="border border-slate-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                  {!edit ? (
                    <>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                              {r.carName || 'Unknown Car'}
                            </span>
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((i) => (
                                <Star
                                  key={i}
                                  className={classNames(
                                    r.rating > i ? 'text-yellow-400' : 'text-slate-300',
                                    'w-5 h-5'
                                  )}
                                  fill={r.rating > i ? 'currentColor' : 'none'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-700 mt-3">{r.text}</p>
                          {r.createdAt && (
                            <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                              <Calendar className="w-4 h-4" />
                              <span>{r.createdAt}</span>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleEdit(r)}
                          className="ml-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-700">Rating:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setEditing((s) => ({ ...s, [r.id]: { ...s[r.id], rating: n } }))}
                              className="focus:outline-none"
                            >
                              <Star
                                className={classNames(
                                  edit.rating >= n ? 'text-yellow-400' : 'text-slate-300',
                                  'w-6 h-6 hover:scale-110 transition-transform'
                                )}
                                fill={edit.rating >= n ? 'currentColor' : 'none'}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Review Text</label>
                        <textarea
                          value={edit.text}
                          onChange={(e) => setEditing((s) => ({ ...s, [r.id]: { ...s[r.id], text: e.target.value } }))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                          rows={4}
                          placeholder="Update your review..."
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => handleCancel(r.id)}
                          className="flex-1 px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSave(r.id)}
                          className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
