import { useEffect, useState } from 'react'
import { db, auth } from '../../firebaseConfig'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Building2, Calendar, Phone, Mail, User } from 'lucide-react'
import type { CorporateRequest } from '../../types'

export default function MyCorporateRequestsSection() {
  const [requests, setRequests] = useState<CorporateRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  const load = async () => {
    if (!db || !auth?.currentUser) {
      setLoading(false)
      return
    }
    try {
      const uid = auth.currentUser.uid
      const q = query(
        collection(db, 'corporateRequests'),
        where('userId', '==', uid),
        orderBy('createdAt', 'desc')
      )
      const snap = await getDocs(q)
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() })) as CorporateRequest[]
      setRequests(data)
    } catch (err) {
      console.error('Load corporate requests failed', err)
    } finally { setLoading(false) }
  }

  const getStatusBadge = (status: CorporateRequest['status']) => {
    const config = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      new: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' }, // Handle legacy 'new'
      contacted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Contacted' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' },
    }
    // @ts-ignore - in case status is something else
    const style = config[status] || config.pending

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    )
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A'
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date)
    } catch { return 'N/A' }
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
          <Building2 className="w-5 h-5 text-orange-600" />
          <h2 className="text-xl font-bold text-slate-900">My Corporate Requests</h2>
        </div>
        <p className="mt-1 text-sm text-slate-600">Track your corporate fleet inquiries and approvals</p>
      </div>

      <div className="p-6">
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-semibold text-slate-900">No corporate requests</h3>
            <p className="mt-1 text-sm text-slate-500">You haven't submitted any corporate fleet inquiries.</p>
            <div className="mt-6">
              <a
                href="/corporateFleet"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                View Corporate Solutions
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r.id} className="border border-slate-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-slate-900">{r.companyName}</h3>
                      {getStatusBadge(r.status)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span>{r.contactName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{r.email}</span>
                      </div>
                      {r.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span>{r.phone}</span>
                        </div>
                      )}
                      <div className="rounded-md bg-slate-50 px-2 py-1">
                        <span className="font-medium text-slate-900">Fleet Size:</span> {r.fleetSize}
                      </div>
                      {r.monthlyRate && (
                        <div className="rounded-md bg-slate-50 px-2 py-1">
                          <span className="font-medium text-slate-900">Budget:</span> {r.monthlyRate.toLocaleString()} THB
                        </div>
                      )}
                    </div>

                    {r.note && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm italic text-slate-600 border border-slate-100">
                        "{r.note}"
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(r.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
