import { useState } from 'react'
import { auth } from '../../../firebaseConfig'
import { updatePassword } from 'firebase/auth'

export default function SecuritySection() {
  const user = auth?.currentUser || null
  const [pw1, setPw1] = useState('')
  const [pw2, setPw2] = useState('')

  const handleUpdate = async () => {
    if (!user) return
    if (pw1.trim() === '' || pw1 !== pw2) {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Invalid password', message: 'Passwords must match.' } }))
      return
    }
    try {
      await updatePassword(user, pw1)
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Password updated' } }))
      setPw1(''); setPw2('')
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Update failed', message: 'Please re-login and try again.' } }))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Security</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="newpw" className="block text-sm font-medium text-slate-700">New Password</label>
          <input id="newpw" type="password" value={pw1} onChange={(e) => setPw1(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
        <div>
          <label htmlFor="confirmpw" className="block text-sm font-medium text-slate-700">Confirm New Password</label>
          <input id="confirmpw" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button type='button' onClick={handleUpdate} className="inline-flex items-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500">Update Password</button>
      </div>
    </div>
  )
}
