import { useEffect, useState } from 'react'
import { auth } from '../../../firebaseConfig'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { ShieldAlert } from 'lucide-react'

interface AdminRouteProps {
    children: React.ReactNode
    allowedEmails?: string[]
}

export default function AdminRoute({
    children,
    allowedEmails = ['key.w.aung.dev@gmail.com']
}: AdminRouteProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(Boolean(auth))

    useEffect(() => {
        if (!auth) {
            return
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    <p className="mt-4 text-slate-600">Loading...</p>
                </div>
            </div>
        )
    }

    // Check if user is logged in and email is in allowed list
    const isAdmin = user && allowedEmails.includes(user.email || '')

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                    <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
                    <p className="text-slate-600 mb-6">
                        {!user
                            ? 'You must be logged in to access the admin dashboard.'
                            : 'You do not have permission to access this area.'}
                    </p>
                    <button
                        type="button"
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
