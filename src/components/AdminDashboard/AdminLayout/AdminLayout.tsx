import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Menu,
    X,
    ArrowLeft,
    Bell,
    Star,
    Phone,
    ClipboardList,
    Building2,
    Users,
} from 'lucide-react'
import { FaCarSide } from "react-icons/fa";
import { auth } from '../../../firebaseConfig'
import { signOut } from 'firebase/auth'
import UserPanel from '../../Auth/UserPanel/UserPanel'

interface AdminLayoutProps {
    children: React.ReactNode
    currentView: 'overview' | 'fleet' | 'bookings' | 'users' | 'inquiries' | 'notifications' | 'reviews' | 'getInTouch' | 'applications' | 'subscriptions' | 'corporate'
    onViewChange: (view: 'overview' | 'fleet' | 'bookings' | 'users' | 'inquiries' | 'notifications' | 'reviews' | 'getInTouch' | 'applications' | 'subscriptions' | 'corporate') => void
}

const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'fleet', label: 'Fleet Manager', icon: FaCarSide },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'subscriptions', label: 'Subscription', icon: ClipboardList },
    { id: 'corporate', label: 'Corporate Fleet', icon: Building2 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'applications', label: 'Job Applications', icon: MessageSquare },
    { id: 'getInTouch', label: 'Get In Touch', icon: Phone },
    { id: 'notifications', label: 'Notify Me', icon: Bell },
] as const

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

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between px-6 py-6 border-b border-slate-200">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                            EasyGo Admin
                        </h1>
                        <button
                            type="button"
                            aria-label="Close sidebar"
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            const isActive = currentView === item.id

                            return (
                                <button
                                    type="button"
                                    key={item.id}
                                    onClick={() => {
                                        onViewChange(item.id)
                                        setSidebarOpen(false)
                                    }}
                                    className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors
                    ${isActive
                                            ? 'bg-orange-50 text-orange-600'
                                            : 'text-slate-700 hover:bg-slate-100'
                                        }
                  `}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </button>
                            )
                        })}
                    </nav>

                    {/* Back to previous page */}
                    <div className="p-4 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 lg:px-8">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            aria-label="Open sidebar"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <h2 className="text-xl font-bold text-slate-900 lg:text-2xl">
                            {menuItems.find(item => item.id === currentView)?.label}
                        </h2>

                        <UserPanel
                            userEmail={auth?.currentUser?.email}
                            userDisplayName={auth?.currentUser?.displayName}
                            uid={auth?.currentUser?.uid}
                            onNavigate={handleNavigate}
                            onSignOut={handleSignOut}
                        />
                    </div>
                </header>

                {/* Content Area */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
