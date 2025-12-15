import { useEffect, useState } from 'react'
import { db } from '../../../firebaseConfig'
import { collection, onSnapshot, orderBy, query, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import Pagination from '../Common/Pagination'
import GetInTouchTable, { type Message } from './components/GetInTouchTable'

export default function GetInTouchList() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

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
    }, (error) => {
      console.error("Error fetching messages:", error)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const handleDelete = async (id: string) => {
    if (!db) return
    if (!confirm('Delete this message?')) return
    try {
      await deleteDoc(doc(db, 'messages', id))
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Message deleted' } }))
    } catch (error) {
      console.error('Error deleting message:', error)
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Delete failed' } }))
    }
  }

  // Pagination Logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(messages.length / ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-600">Get In Touch Submissions</h2>
        <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">
          Total: {messages.length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <>
            <GetInTouchTable
              messages={currentMessages}
              onDelete={handleDelete}
            />

            {messages.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalPosts={messages.length}
                postsPerPage={ITEMS_PER_PAGE}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
