import { Menu } from 'lucide-react'
import UserPanel from '../../../Auth/UserPanel/UserPanel'

interface AdminHeaderProps {
    title: string
    userEmail?: string | null
    userDisplayName?: string | null
    uid?: string
    onMenuClick: () => void
    onNavigate: (page: string) => void
    onSignOut: () => void
}

export default function AdminHeader({ title, userEmail, userDisplayName, uid, onMenuClick, onNavigate, onSignOut }: AdminHeaderProps) {
    return (
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 lg:px-8">
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    aria-label="Open sidebar"
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <h2 className="text-xl font-bold text-slate-900 lg:text-2xl">
                    {title}
                </h2>

                <UserPanel
                    userEmail={userEmail}
                    userDisplayName={userDisplayName}
                    uid={uid}
                    onNavigate={onNavigate}
                    onSignOut={onSignOut}
                />
            </div>
        </header>
    )
}
