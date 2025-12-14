import { useState } from 'react'
import {
    AdminRoute,
    AdminLayout,
    Overview,
    FleetManager,
    BookingManager,
    InquiryList,
    NotificationList,
    ReviewsManager,
    GetInTouchList,
    ApplicationManager,
    CorporateRequests,
    SubscriptionManager,
    UserManager,
} from '../../types/adminComponents'

interface AdminDashboardProps {
    onNavigate?: (page: string) => void
}

export default function AdminDashboard({ onNavigate: _onNavigate }: AdminDashboardProps) {
    void _onNavigate
    const [currentView, setCurrentView] = useState<'overview' | 'fleet' | 'bookings' | 'users' | 'inquiries' | 'notifications' | 'reviews' | 'getInTouch' | 'applications' | 'subscriptions' | 'corporate'>('overview')

    const renderContent = () => {
        switch (currentView) {
            case 'overview':
                return <Overview onViewChange={setCurrentView} />
            case 'fleet':
                return <FleetManager />
            case 'bookings':
                return <BookingManager />
            case 'inquiries':
                return <InquiryList />
            case 'notifications':
                return <NotificationList />
            case 'reviews':
                return <ReviewsManager />
            case 'getInTouch':
                return <GetInTouchList />
            case 'applications':
                return <ApplicationManager />
            case 'corporate':
                return <CorporateRequests />
            case 'subscriptions':
                return <SubscriptionManager />
            case 'users':
                return <UserManager />
            default:
                return <Overview onViewChange={setCurrentView} />
        }
    }

    return (
        <AdminRoute allowedEmails={['key.w.aung.dev@gmail.com']}>
            <AdminLayout currentView={currentView} onViewChange={setCurrentView}>
                {renderContent()}
            </AdminLayout>
        </AdminRoute>
    )
}
