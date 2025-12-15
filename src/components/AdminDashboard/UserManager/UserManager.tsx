import { useEffect, useState } from 'react'
import {
    collection,
    query,
    orderBy,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import UsersTable, { type UserData } from './components/UsersTable'
import Pagination from '../Common/Pagination'

export default function UserManager() {
    const [users, setUsers] = useState<UserData[]>([])
    const [loading, setLoading] = useState(true)

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1)
    const USERS_PER_PAGE = 20

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        if (!db) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            const q = query(
                collection(db, 'users'),
                orderBy('createdAt', 'desc')
            )

            const snapshot = await getDocs(q)
            const usersList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserData[]

            setUsers(usersList)
        } catch (error) {
            console.error('Error fetching users:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to load users' }
            }))
        } finally {
            setLoading(false)
        }
    }

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
            setUsers(prev => prev.filter(u => u.id !== userId))
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

    // Pagination Logic
    const totalPages = Math.ceil(users.length / USERS_PER_PAGE)
    const paginatedUsers = users.slice(
        (currentPage - 1) * USERS_PER_PAGE,
        currentPage * USERS_PER_PAGE
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-orange-600">User Management</h2>
                <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">
                    Total: {users.length}
                </div>
            </div>

            <UsersTable
                users={paginatedUsers}
                onDeleteUser={handleDeleteUser}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalPosts={users.length}
                postsPerPage={USERS_PER_PAGE}
            />
        </div>
    )
}
