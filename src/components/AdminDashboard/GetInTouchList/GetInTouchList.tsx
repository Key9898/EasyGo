import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, onSnapshot, orderBy, query, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { Trash2 } from 'lucide-react'

type Message = { id: string; firstName?: string; lastName?: string; email?: string; phoneNumber?: string; message?: string; createdAt?: string }

export default function GetInTouchList() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!db) return
    setLoading(true)
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snaps) => {
      const list: Message[] = snaps.docs.map((d) => {
        const data = d.data() as { firstName?: string; lastName?: string; email?: string; phoneNumber?: string; message?: string; createdAt?: Timestamp }
        return {
          id: d.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          message: data.message,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : ''
        }
      })
      setMessages(list)
      setLoading(false)
    }, () => {
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const remove = async (id: string) => {
    if (!db) return
    if (!confirm('Delete this message?')) return
    await deleteDoc(doc(db, 'messages', id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Get In Touch</h2>
        <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">Total: {messages.length}</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-slate-600">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {messages.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No messages.</td></tr>
                ) : (
                  messages.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{[m.firstName, m.lastName].filter(Boolean).join(' ') || '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{m.email || '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{m.phoneNumber || '—'}</td>
                      <td className="px-6 py-4 text-sm text-slate-700 max-w-xl truncate" title={m.message}>{m.message || '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{m.createdAt || '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button type="button" onClick={() => remove(m.id)} aria-label="Delete message" title="Delete message" className="px-3 py-1 bg-rose-600 text-white rounded-lg text-sm hover:bg-rose-500">
                          <Trash2 className="w-4 h-4 inline" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
