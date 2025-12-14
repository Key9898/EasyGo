import { useState } from 'react'
import Header from '../../components/Layouts/Common/Header'
import Footer from '../../components/Layouts/Common/Footer'
import ProfileSection from '../../components/AccountSettings/ProfileSection'
import SecuritySection from '../../components/AccountSettings/SecuritySection'
import MyReviewsSection from '../../components/AccountSettings/MyReviewsSection'
import MyApplicationsSection from '../../components/AccountSettings/MyApplicationsSection'
import MyCorporateRequestsSection from '../../components/AccountSettings/MyCorporateRequestsSection'

import MySubscriptionsSection from '../../components/AccountSettings/MySubscriptionsSection'
import MyBookingsSection from '../../components/AccountSettings/MyBookingsSection'

interface AccountSettingsProps { onNavigate?: (page: string) => void }

export default function AccountSettings({ onNavigate }: AccountSettingsProps) {
  const [tab, setTab] = useState<'profile' | 'bookings' | 'reviews' | 'applications' | 'subscription' | 'corporate'>('profile')
  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={onNavigate} />
      <main className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Account Settings</h1>
            <p className="mt-3 text-base text-slate-700">Manage your profile, security, reviews, job applications, and corporate fleet requests.</p>
          </div>
          <div className="mt-8 mx-auto max-w-4xl border-b border-slate-200">
            <nav className="flex gap-8">
              <button
                type='button'
                onClick={() => setTab('profile')}
                className={`px-1 pb-3 text-sm font-medium ${tab === 'profile' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
                aria-current={tab === 'profile' ? 'page' : undefined}
              >
                Profile & Security
              </button>
              <button
                type='button'
                onClick={() => setTab('bookings')}
                className={`px-1 pb-3 text-sm font-medium ${tab === 'bookings' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
                aria-current={tab === 'bookings' ? 'page' : undefined}
              >
                My Bookings
              </button>
              <button
                type='button'
                onClick={() => setTab('reviews')}
                className={`px-1 pb-3 text-sm font-medium ${tab === 'reviews' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
                aria-current={tab === 'reviews' ? 'page' : undefined}
              >
                My Reviews
              </button>
              <button
                type='button'
                onClick={() => setTab('applications')}
                className={`px-1 pb-3 text-sm font-medium ${tab === 'applications' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
                aria-current={tab === 'applications' ? 'page' : undefined}
              >
                My Applications
              </button>
              <button
                type='button'
                onClick={() => setTab('subscription')}
                className={`px-1 pb-3 text-sm font-medium ${tab === 'subscription' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
                aria-current={tab === 'subscription' ? 'page' : undefined}
              >
                Subscription
              </button>
              <button
                type='button'
                onClick={() => setTab('corporate')}
                className={`px-1 pb-3 text-sm font-medium ${tab === 'corporate' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-600 hover:text-slate-900'}`}
                aria-current={tab === 'corporate' ? 'page' : undefined}
              >
                Corporate Fleet
              </button>
            </nav>
          </div>
          <div className="mt-8 mx-auto max-w-4xl space-y-8">
            {tab === 'profile' ? (
              <>
                <ProfileSection />
                <SecuritySection />
              </>
            ) : tab === 'bookings' ? (
              <MyBookingsSection />
            ) : tab === 'reviews' ? (
              <MyReviewsSection />
            ) : tab === 'applications' ? (
              <MyApplicationsSection />
            ) : tab === 'corporate' ? (
              <MyCorporateRequestsSection />
            ) : (
              <MySubscriptionsSection />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
