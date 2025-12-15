import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Star,
    Phone,
    ClipboardList,
    Building2,
    Users,
    Bell,
    X,
    ArrowLeft
} from 'lucide-react'
import { FaCarSide } from "react-icons/fa"

export const menuItems = [
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

interface SidebarProps {
    isOpen: boolean
    currentView: string
    onViewChange: (view: any) => void
    onClose: () => void
    onBack: () => void
}

export default function Sidebar({ isOpen, currentView, onViewChange, onClose, onBack }: SidebarProps) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
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
                            onClick={onClose}
                            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            const isActive = currentView === item.id

                            return (
                                <button
                                    type="button"
                                    key={item.id}
                                    onClick={() => {
                                        onViewChange(item.id)
                                        onClose()
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
                            onClick={onBack}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
