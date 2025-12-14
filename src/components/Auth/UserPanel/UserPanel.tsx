import { useState, useMemo, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { FaUserCircle, FaCog, FaLock, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'
import { db } from '../../../firebaseConfig'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

interface UserPanelProps {
  userEmail?: string | null
  userDisplayName?: string | null
  uid?: string
  onNavigate?: (page: string) => void
  onSignOut?: () => void | Promise<void>
}

const ADMIN_EMAIL = 'key.w.aung.dev@gmail.com'

export default function UserPanel({ userEmail, userDisplayName, uid, onNavigate, onSignOut }: UserPanelProps) {
  const [open, setOpen] = useState(false)
  const avatarLetter = useMemo(() => {
    const base = (userDisplayName || userEmail || 'U') || 'U'
    return base.charAt(0).toUpperCase()
  }, [userDisplayName, userEmail])

  // Sync user to firestore if missing
  useEffect(() => {
    const syncUser = async () => {
      if (uid && userEmail && db) {
        try {
          const docRef = doc(db, 'users', uid)
          const snap = await getDoc(docRef)
          if (!snap.exists()) {
            await setDoc(docRef, {
              email: userEmail,
              displayName: userDisplayName || '',
              role: userEmail === 'key.w.aung.dev@gmail.com' ? 'admin' : 'user',
              createdAt: serverTimestamp(),
              photoURL: null
            })
          }
        } catch (error) {
          console.error('Error syncing user:', error)
        }
      }
    }
    syncUser()
  }, [uid, userEmail, userDisplayName])

  const displayText = useMemo(() => {
    if (userDisplayName) return userDisplayName
    if (userEmail) return userEmail.split('@')[0]
    return 'User'
  }, [userDisplayName, userEmail])

  const isAdmin = useMemo(() => {
    return userEmail === ADMIN_EMAIL
  }, [userEmail])

  if (userEmail) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-md ring-1 ring-slate-200 text-slate-900 hover:bg-slate-50"
        >
          <span className="inline-grid place-items-center size-8 rounded-full bg-orange-100 text-orange-700 font-bold">
            {avatarLetter}
          </span>
          <span className="font-semibold hidden sm:block">{displayText}</span>
          {open ? <ChevronUpIcon className="size-5" /> : <ChevronDownIcon className="size-5" />}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5 p-2">
            <button
              type="button"
              onClick={() => { onNavigate?.('accountSetting'); setOpen(false) }}
              className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-semibold flex items-center justify-between"
            >
              <span>Account Settings</span>
              <FaCog className="size-4" />
            </button>

            {isAdmin && (
              <button
                type="button"
                onClick={() => { onNavigate?.('admin'); setOpen(false) }}
                className="w-full text-left rounded-lg px-3 py-2 text-orange-600 hover:bg-orange-50 font-semibold flex items-center justify-between"
              >
                <span>Admin Dashboard</span>
                <FaLock className="size-4" />
              </button>
            )}

            <div className="mt-2 border-t border-slate-200 pt-2">
              <button
                type="button"
                onClick={async () => { await onSignOut?.(); setOpen(false) }}
                className="w-full text-left rounded-lg px-3 py-2 text-rose-600 hover:bg-rose-50 font-semibold flex items-center justify-between"
              >
                <span>Log out</span>
                <FaSignOutAlt className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-md ring-1 ring-slate-200 text-slate-900 hover:bg-slate-50"
      >
        <FaUserCircle className="size-6" />
        <span className="font-semibold hidden sm:block">Guest</span>
        {open ? <ChevronUpIcon className="size-5" /> : <ChevronDownIcon className="size-5" />}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5 p-2">
          <button
            type="button"
            onClick={() => { window.dispatchEvent(new CustomEvent('app:intent:accountSetting')); onNavigate?.('accountSetting'); setOpen(false) }}
            className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
          >
            <span>Account Settings</span>
            <FaCog className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => { window.dispatchEvent(new CustomEvent('app:auth:open:signIn')); setOpen(false) }}
            className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
          >
            <span>Log in</span>
            <FaSignInAlt className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => { window.dispatchEvent(new CustomEvent('app:auth:open:signup')); setOpen(false) }}
            className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
          >
            <span>Sign up</span>
            <FaUserPlus className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}
