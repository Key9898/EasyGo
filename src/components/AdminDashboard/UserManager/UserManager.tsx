import { useEffect, useState } from 'react'
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    doc
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { User, Calendar, Mail, ShieldCheck, Trash2 } from 'lucide-react'

interface UserData {
    id: string
    email: string
    displayName?: string
    role?: string
    createdAt?: any
    photoURL?: string
}

export default function UserManager() {
    const [users, setUsers] = useState<UserData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!db) {
            setLoading(false)
            return
        }

        const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))

        // Real-time listener
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserData[]
            setUsers(usersList)
            setLoading(false)
        }, (error) => {
            console.error('Error fetching users:', error)
            setLoading(false)
            // Optional: Show error only if it's not a permission issue causing a flood
        })

        return () => unsubscribe()
    }, [])

    const handleDeleteUser = async (userId: string, userEmail: string) => {
        if (userEmail === 'key.w.aung.dev@gmail.com') {
            alert('Cannot delete the main admin account.')
            return
        }

        if (!confirm(`Are you sure you want to delete user ${userEmail}? This will remove their profile data from Firestore.`)) {
            return
        }

        if (!db) return

        try {
            await deleteDoc(doc(db, 'users', userId))
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'success', title: 'Success', message: 'User profile deleted' }
            }))
        } catch (error) {
            console.error('Error deleting user:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to delete user' }
            }))
        }
    }

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A'
        try {
            // Check if it's a Firestore Timestamp
            if (timestamp.toDate) {
                return timestamp.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }
            // Fallback if it's already a date or string
            return new Date(timestamp).toLocaleDateString()
        } catch {
            return 'N/A'
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">User Management ({users.length})</h2>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">User</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Email</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Role</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Joined</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No users found in database.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                                                    {user.photoURL ? (
                                                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
                                                    ) : (
                                                        (user.displayName?.[0] || user.email?.[0] || '?').toUpperCase()
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">
                                                        {user.displayName || 'Unknown Name'}
                                                    </p>
                                                    <p className="text-xs text-slate-500 font-mono">ID: {user.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-slate-400" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email === 'key.w.aung.dev@gmail.com' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                                                    <ShieldCheck className="w-3.5 h-3.5" />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                                    <User className="w-3.5 h-3.5" />
                                                    User
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {formatDate(user.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email !== 'key.w.aung.dev@gmail.com' && (
                                                <button
                                                    onClick={() => handleDeleteUser(user.id, user.email)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete User Profile"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
