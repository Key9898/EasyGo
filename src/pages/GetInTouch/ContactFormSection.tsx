import { useRef, useState, useEffect } from 'react'
import { db, auth } from '../../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvgeqbbd'

export default function ContactFormSection() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [preferred, setPreferred] = useState<{ mobile: boolean; email: boolean }>({ mobile: false, email: false })
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!auth) return
    const unsub = onAuthStateChanged(auth, (u) => {
      const name = u?.displayName || (u?.email ? u.email.split('@')[0] : '')
      setFullName(name || '')
      setEmail(u?.email || '')
    })
    return () => unsub()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      const form = formRef.current
      if (!form) return
      const fd = new FormData(form)
      const payload = Object.fromEntries(fd.entries()) as Record<string, string>

      const preferredList = fd.getAll('preferred') as string[]
      if (preferredList.length === 0) {
        window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Select a contact method', message: 'Please choose Mobile or Email.' } }))
        return
      }

      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error('Formspree submission failed')

      if (db) {
        await addDoc(collection(db, 'messages'), {
          fullName: payload['full-name'] || '',
          firstName: (payload['full-name'] || '').split(' ')[0] || '',
          lastName: (payload['full-name'] || '').split(' ').slice(1).join(' ') || '',
          email: payload['email'] || '',
          phoneNumber: payload['phone-number'] || '',
          message: payload['message'] || '',
          preferredContact: preferredList,
          createdAt: serverTimestamp(),
        })
      }

      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Message sent' } }))
      form.reset()
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Submission failed', message: 'Please try again later.' } }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <form ref={formRef} onSubmit={handleSubmit} method="POST" className="space-y-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="full-name" className="block text-sm font-semibold text-slate-900">Full name</label>
            <input id="full-name" name="full-name" type="text" className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-base text-slate-900 outline-none focus:ring-2 focus:ring-orange-600" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-900">Email</label>
            <input id="email" name="email" type="email" className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-base text-slate-900 outline-none focus:ring-2 focus:ring-orange-600" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold text-slate-900">Phone number</label>
            <input id="phone-number" name="phone-number" type="tel" className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-base text-slate-900 outline-none focus:ring-2 focus:ring-orange-600" placeholder="09 123 456 789" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold text-slate-900">Message</label>
            <textarea id="message" name="message" rows={4} className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-base text-slate-900 outline-none focus:ring-2 focus:ring-orange-600" placeholder="Tell us about your rental needs or questions..." required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-900">Preferred Mode Of Contact<span className="text-red-500">*</span></label>
            <div className="mt-2 flex items-center gap-6">
              <label className="inline-flex items-center gap-2 text-sm text-slate-900">
                <input
                  type="checkbox"
                  name="preferred"
                  value="mobile"
                  checked={preferred.mobile}
                  onChange={(e) => setPreferred(prev => ({ ...prev, mobile: e.target.checked }))}
                  className="size-4 rounded border-slate-300 accent-orange-600 focus:ring-orange-600"
                />
                Mobile
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-900">
                <input
                  type="checkbox"
                  name="preferred"
                  value="email"
                  checked={preferred.email}
                  onChange={(e) => setPreferred(prev => ({ ...prev, email: e.target.checked }))}
                  className="size-4 rounded border-slate-300 accent-orange-600 focus:ring-orange-600"
                />
                Email
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={submitting} className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 disabled:opacity-50">
            {submitting ? 'Sending...' : 'Send message'}
          </button>
        </div>
      </form>
    </div>
  )
}
