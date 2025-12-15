import { useEffect, useState } from 'react'
import { Building2, CheckCircle, MessageSquare, Clock, XCircle } from 'lucide-react'
import { db } from '../../../firebaseConfig'
import { collection, query, orderBy, updateDoc, doc, onSnapshot } from 'firebase/firestore'
import type { CorporateRequest } from '../../../types'

export default function CorporateRequests() {
  const [requests, setRequests] = useState<CorporateRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted' | 'approved' | 'rejected'>('all')

  useEffect(() => {
    if (!db) { setLoading(false); return }
    const q = query(collection(db, 'corporateRequests'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() })) as CorporateRequest[]
      setRequests(data)
      setLoading(false)
    }, (err) => {
      console.error('Error loading corporate requests', err)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const changeStatus = async (id: string, status: CorporateRequest['status']) => {
    if (!db) return
    try {
      await updateDoc(doc(db!, 'corporateRequests', id), { status })
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Updated', message: 'Request status updated' } }))
    } catch (err) {
      console.error('Update status failed', err)
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Error', message: 'Could not update status' } }))
    }
  }

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)

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
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">Corporate Fleet Requests</h2>
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'pending', 'contacted', 'approved', 'rejected'] as const).map(s => (
            <button key={s} type="button" onClick={() => setFilter(s)}
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
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500">No corporate requests found.</p>
          </div>
        ) : (
          filtered.map(r => (
            <div key={r.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-900">{r.companyName} • {r.contactName}</p>
                  <p className="text-sm text-slate-600">{r.email}{r.phone ? ` • ${r.phone}` : ''}</p>
                </div>
                <div className="text-sm text-slate-700">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-orange-100 text-orange-700 font-medium">{r.status}</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2"><p className="text-slate-600">Fleet Size</p><p className="font-semibold text-slate-900">{r.fleetSize}</p></div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2"><p className="text-slate-600">Segment</p><p className="font-semibold text-slate-900">{r.segment || '—'}</p></div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2"><p className="text-slate-600">Monthly Rate</p><p className="font-semibold text-slate-900">{r.monthlyRate ? `${r.monthlyRate.toLocaleString()} THB` : '—'}</p></div>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 sm:col-span-1 col-span-2"><p className="text-slate-600">Note</p><p className="font-semibold text-slate-900 truncate" title={r.note || ''}>{r.note || '—'}</p></div>
              </div>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => changeStatus(r.id, 'contacted')} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-500">Mark Contacted</button>
                <button type="button" onClick={() => changeStatus(r.id, 'approved')} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-500"><CheckCircle className="inline w-4 h-4 mr-1" />Approve</button>
                <button type="button" onClick={() => changeStatus(r.id, 'rejected')} className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-500"><XCircle className="inline w-4 h-4 mr-1" />Reject</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-slate-100 rounded-lg"><Building2 className="w-5 h-5 text-slate-600" /></div><div><p className="text-sm text-slate-600">Total Requests</p><p className="text-2xl font-bold text-slate-900">{requests.length}</p></div></div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-orange-100 rounded-lg"><Clock className="w-5 h-5 text-orange-600" /></div><div><p className="text-sm text-slate-600">Pending</p><p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'pending').length}</p></div></div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg"><MessageSquare className="w-5 h-5 text-blue-600" /></div><div><p className="text-sm text-slate-600">Contacted</p><p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'contacted').length}</p></div></div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div><div><p className="text-sm text-slate-600">Approved</p><p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'approved').length}</p></div></div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center gap-3"><div className="p-2 bg-red-100 rounded-lg"><XCircle className="w-5 h-5 text-red-600" /></div><div><p className="text-sm text-slate-600">Rejected</p><p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === 'rejected').length}</p></div></div>
        </div>
      </div>
    </div>
  )
}

