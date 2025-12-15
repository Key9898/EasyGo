import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebaseConfig'
import { signOut } from 'firebase/auth'
import Sidebar, { menuItems } from './components/Sidebar'
import AdminHeader from './components/AdminHeader'

interface AdminLayoutProps {
    children: React.ReactNode
    currentView: 'overview' | 'fleet' | 'bookings' | 'users' | 'inquiries' | 'notifications' | 'reviews' | 'getInTouch' | 'applications' | 'subscriptions' | 'corporate'
    onViewChange: (view: 'overview' | 'fleet' | 'bookings' | 'users' | 'inquiries' | 'notifications' | 'reviews' | 'getInTouch' | 'applications' | 'subscriptions' | 'corporate') => void
}

export default function AdminLayout({ children, currentView, onViewChange }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        try {
            if (!auth) return
            await signOut(auth)
            window.location.href = '/'
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    const handleBack = () => {
        const prev = sessionStorage.getItem('easygo_prev_path') || '/'
        window.location.href = prev
    }

    const handleNavigate = (page: string) => {
        const path = page === 'home' ? '/' : `/${page}`
        navigate(path)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const currentTitle = menuItems.find(item => item.id === currentView)?.label || 'Dashboard'

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar
                isOpen={sidebarOpen}
                currentView={currentView}
                onViewChange={onViewChange}
                onClose={() => setSidebarOpen(false)}
                onBack={handleBack}
            />

            <div className="lg:pl-64">
                <AdminHeader
                    title={currentTitle}
                    userEmail={auth?.currentUser?.email}
                    userDisplayName={auth?.currentUser?.displayName}
                    uid={auth?.currentUser?.uid}
                    onMenuClick={() => setSidebarOpen(true)}
                    onNavigate={handleNavigate}
                    onSignOut={handleSignOut}
                />

                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
