import { useEffect, useState } from 'react'
import { db, auth } from '../../../firebaseConfig'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Building2 } from 'lucide-react'
import type { CorporateRequest } from '../../../types'
import CorporateRequestCard from './components/CorporateRequestCard'

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
              <CorporateRequestCard key={r.id} request={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
