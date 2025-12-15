import { Mail, ShieldCheck, User, Calendar, Trash2 } from 'lucide-react'

// Copy interface locally or share it. 
// I'll define it here.
export interface UserData {
    id: string
    email: string
    displayName?: string
    role?: string
    createdAt?: any
    photoURL?: string
}

interface UsersTableProps {
    users: UserData[]
    onDeleteUser: (userId: string, userEmail: string) => void
}

export default function UsersTable({ users, onDeleteUser }: UsersTableProps) {
    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A'
        try {
            if (timestamp.toDate) {
                return timestamp.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }
            return new Date(timestamp).toLocaleDateString()
        } catch {
            return 'N/A'
        }
    }

    if (users.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-12 text-center text-slate-500">
                    No users found in database.
                </div>
            </div>
        )
    }

    return (
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
                        {users.map((user) => (
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
                                    <button
                                        onClick={() => onDeleteUser(user.id, user.email)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete User Profile"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
