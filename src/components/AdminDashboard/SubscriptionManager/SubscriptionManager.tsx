import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, orderBy, query, updateDoc, doc, Timestamp, onSnapshot } from 'firebase/firestore'
import { ClipboardList, Phone, Calendar, MessageSquare, User, CheckCircle, XCircle, Clock } from 'lucide-react'

import type { SubscriptionRequest } from '../../../types'

export default function SubscriptionRequestsManager() {
  const [items, setItems] = useState<SubscriptionRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted' | 'confirmed' | 'cancelled'>('all')

  useEffect(() => {
    if (!db) {
      setLoading(false)
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Error', message: 'Service unavailable' } }))
      return
    }

    const q = query(collection(db, 'subscriptionRequests'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as SubscriptionRequest[]
      setItems(data)
      setLoading(false)
    }, (err) => {
      console.error('Subscription onSnapshot error:', err)
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Error', message: 'Failed to load subscription requests' } }))
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleStatus = async (id: string, status: SubscriptionRequest['status']) => {
    if (!db) return
    try {
      await updateDoc(doc(db!, 'subscriptionRequests', id), { status })
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Updated', message: 'Status updated' } }))
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Error', message: 'Failed to update' } }))
    }
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter)

  const formatDate = (t?: Timestamp | Date | null) => {
    if (!t) return 'N/A'
    try {
      const d = (t as Timestamp)?.toDate ? (t as Timestamp).toDate() : (t as Date)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    } catch { return 'N/A' }
  }

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
        <h2 className="text-2xl font-bold text-slate-900">Subscription Requests</h2>
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
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
            <ClipboardList className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500">No requests found.</p>
          </div>
        ) : (
          filtered.map((i) => (
            <div key={i.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{i.fullName}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${i.phone}`} className="hover:text-orange-600">{i.phone}</a>
                        </div>
                        {i.lineId && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MessageSquare className="w-4 h-4" />
                            <span>{i.lineId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="px-3 py-1 inline-flex items-center gap-1.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                      <User className="w-3.5 h-3.5" />
                      {i.planLabel}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-sm text-slate-700">
                    <Calendar className="w-4 h-4" />
                    Desired start: <span className="font-semibold">{i.desiredStartDate}</span>
                    <span className="ml-3 text-slate-500">Created: {formatDate(i.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(['pending', 'contacted', 'confirmed', 'cancelled'] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleStatus(i.id, s)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold ${i.status === s ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-slate-100 rounded-lg"><ClipboardList className="w-5 h-5 text-slate-600" /></div><div><p className="text-sm text-slate-600">Total Requests</p><p className="text-2xl font-bold text-slate-900">{items.length}</p></div></div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-orange-100 rounded-lg"><Clock className="w-5 h-5 text-orange-600" /></div><div><p className="text-sm text-slate-600">Pending</p><p className="text-2xl font-bold text-slate-900">{items.filter(r => r.status === 'pending').length}</p></div></div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg"><MessageSquare className="w-5 h-5 text-blue-600" /></div><div><p className="text-sm text-slate-600">Contacted</p><p className="text-2xl font-bold text-slate-900">{items.filter(r => r.status === 'contacted').length}</p></div></div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div><div><p className="text-sm text-slate-600">Confirmed</p><p className="text-2xl font-bold text-slate-900">{items.filter(r => r.status === 'confirmed').length}</p></div></div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-red-100 rounded-lg"><XCircle className="w-5 h-5 text-red-600" /></div><div><p className="text-sm text-slate-600">Cancelled</p><p className="text-2xl font-bold text-slate-900">{items.filter(r => r.status === 'cancelled').length}</p></div></div>
        </div>
      </div>
    </div>
  )
}
