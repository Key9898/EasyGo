import { useState, useMemo } from 'react'
import { auth } from '../../../firebaseConfig'
import { updateProfile } from 'firebase/auth'
import SocialToggle from './components/SocialToggle'

export default function ProfileSection() {
  const user = auth?.currentUser || null
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const email = user?.email || ''
  const memberSince = useMemo(() => {
    const t = user?.metadata?.creationTime
    if (t) {
      const d = new Date(t)
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      }
    }
    const now = user ? new Date() : null
    return now ? now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'
  }, [user])

  const initial = (displayName || email || '?').charAt(0).toUpperCase()

  const handleSave = async () => {
    if (!user) return
    try {
      await updateProfile(user, { displayName })
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Profile updated' } }))
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Update failed', message: 'Please try again later.' } }))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xl font-semibold">
            {initial}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700">Username</label>
            <input id="username" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input id="email" value={email} disabled className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-base text-slate-500 cursor-not-allowed" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Since</label>
            <div className="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-900">{memberSince}</div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type='button' onClick={handleSave} className="inline-flex items-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500">Save Changes</button>
        </div>

        <div className="mt-8">
          <h3 className="text-base font-semibold text-slate-900">Preferences</h3>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 p-4">
            <div>
              <p className="text-sm font-medium text-slate-900">Social Media</p>
              <p className="text-sm text-slate-600">Show floating social shortcuts on all pages</p>
            </div>
            <SocialToggle />
          </div>
        </div>
      </div>
    </div>
  )
}
