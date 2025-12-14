import { useState, useEffect } from 'react'
import Header from '../../../components/Layouts/Common/Header'
import Footer from '../../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../../components/Layouts/Common/ScrollUpToTopButton'
import OtherHeroBanner from '../../../components/Layouts/HeroBanner/OtherHeroBanner/OtherHeroBanner'
import Breadcrumb from '../../../components/Layouts/Common/Breadcrumb'
import ReviewsPagination from './ReviewsPagination'
import ReviewsForm from '../ReviewsFormSection/ReviewsForm'
import ReviewStats from './ReviewStats'
import ReviewList from './ReviewList'
import type { ReviewFormData } from '../ReviewsFormSection/ReviewsForm'
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, type DocumentData } from 'firebase/firestore'
import { db, auth } from '../../../firebaseConfig'


interface ReviewsProps {
  onNavigate?: (page: string) => void
}

// Month name parsing
const MONTHS: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  auguest: 7, // tolerate typo
  september: 8,
  october: 9,
  november: 10,
  december: 11,
}

function parseReviewDate(dateStr?: string): number {
  if (!dateStr) return 0
  // ISO date (from <input type="date">): YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const t = new Date(dateStr).getTime()
    return Number.isNaN(t) ? 0 : t
  }
  // "Month DD, YYYY"
  const m = dateStr.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/)
  if (m) {
    const monthName = m[1].toLowerCase()
    const day = Number(m[2])
    const year = Number(m[3])
    const month = MONTHS[monthName]
    if (month !== undefined) {
      const t = new Date(year, month, day).getTime()
      return Number.isNaN(t) ? 0 : t
    }
  }
  // Fallback
  const t = new Date(dateStr).getTime()
  return Number.isNaN(t) ? 0 : t
}

export default function Reviews({ onNavigate }: ReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [featured, setFeatured] = useState(() => {
    const saved = localStorage.getItem('eh_featured_reviews')
    if (saved) {
      try {
        const list = JSON.parse(saved)
        // Form submissions only: ISO date from <input type="date">
        return Array.isArray(list)
          ? list.filter((r: { date?: string }) => typeof r?.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(r.date))
          : []
      } catch {
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('eh_featured_reviews', JSON.stringify(featured))
  }, [featured])

  useEffect(() => {
    if (!db) return
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: any[] = []
        snap.forEach((doc) => {
          const data = doc.data() as DocumentData
          list.push({
            id: doc.id,
            rating: Number(data.rating) || 0,
            content: `<p>${String(data.text || data.content || '')}</p>`,
            author: String(data.userName || data.author || ''),
            country: String(data.country || ''),
            carName: String((data as any).carName || (data as any).bookType || ''),
            date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : String(data.date || ''),
            avatarSrc: typeof data.avatarDataUrl === 'string' ? data.avatarDataUrl : null,
          })
        })
        setFeatured(list)
      },
      () => {
        window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Failed to load reviews' } }))
      }
    )
    return () => unsub()
  }, [])

  const handleAddReview = async (data: ReviewFormData) => {
    const user = auth?.currentUser || null
    if (db) {
      try {
        await addDoc(collection(db, 'reviews'), {
          text: data.content,
          rating: data.rating,
          location: data.location,
          carName: data.carName,
          userId: user?.uid || null,
          userName: (user?.displayName || (user?.email ? user.email.split('@')[0] : '')) || data.fullName || 'Guest',
          avatarDataUrl: data.avatarDataUrl || null,
          createdAt: serverTimestamp(),
        })
        if (user) {
          try {
            await addDoc(collection(db, 'notifications'), {
              type: 'personal',
              to: user.uid,
              title: 'Review submitted',
              message: 'Your review was published successfully.',
              read: false,
              createdAt: serverTimestamp(),
            })
          } catch { }
        }
        setIsFormOpen(false)
        window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'success', title: 'Review submitted', message: 'Thank you for sharing your experience.' } }))
      } catch (e) {
        window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Submit failed', message: 'Could not save review. Please try again.' } }))
      }
    }
  }

  // comments feature removed

  // Month name parsing (typo 'Auguest' ကိုလည်းလက်ခံ)
  // Sort by date (newest → oldest)
  const featuredSorted = [...featured].sort(
    (a, b) => parseReviewDate(b.date) - parseReviewDate(a.date)
  )

  // Reviews data for pagination
  const filteredFiles = featuredSorted

  // Calculate pagination
  const totalItems = filteredFiles.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredFiles.slice(startIndex, endIndex)

  // Real-time review stats (derived from featured)
  const totalCount = featuredSorted.length
  const averageRating = totalCount
    ? featuredSorted.reduce((sum, r) => sum + r.rating, 0) / totalCount
    : 0
  const countsByRating = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: featuredSorted.filter((rev) => rev.rating === r).length,
  }))

  return (
    <>
      <Header onNavigate={onNavigate} />
      <OtherHeroBanner
        onPrimaryAction={() => onNavigate?.('reviews')}
        title="Loved by Travelers"
        description="Real stories from real drivers. Discover why EasyGo is the top choice for safe, reliable, and comfortable car rentals across the region."
        buttonText="Read Customer Stories"
        backgroundImgAlt="Guest stories banner"
        variant="reviews"
        preTitleSlot={<Breadcrumb pages={[{ name: 'Reviews', href: '#reviews', current: true }]} onNavigate={onNavigate} variant="dark" />}
        scrollTargetId="reviews-content"
      />

      <div className="bg-slate-50">
        {/* Section Header */}
        <div id="reviews-content" className="mx-auto max-w-7xl px-5 sm:px-9 lg:px-8 pt-20 pb-12 lg:pt-24 lg:pb-16 border-b border-slate-200">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-orange-600">
              See What Our Customers Say
            </h2>
            <p className="mt-3 text-lg text-slate-700 max-w-3xl mx-auto">
              Unfiltered feedback from our community. See how we're delivering on our promise of safety, quality, and exceptional service, one journey at a time.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-9 sm:max-w-7xl sm:px-6 sm:py-16 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-16">
          <div className="lg:col-span-4">
            <ReviewStats averageRating={averageRating} totalCount={totalCount} countsByRating={countsByRating} />

            <div className="mt-10">
              <h3 className="text-xl font-semibold text-orange-600">Share Your Journey</h3>
              <p className="mt-1 text-lg text-slate-700">
                Just returned from your adventure? We'd love to hear about it! Your insights help us improve and inspire fellow travelers to choose the right ride for their next trip.
              </p>

              <button
                type="button"
                onClick={() => { setIsFormOpen(true) }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg shadow-lg border border-slate-300 bg-slate-50 px-8 py-2 text-base font-medium text-slate-900 hover:bg-orange-600 hover:text-white sm:w-auto lg:w-full"
              >
                Write a review
              </button>
            </div>
          </div>

          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h3 className="sr-only">Recent reviews</h3>
            <ReviewList
              reviews={currentItems as any}
            />
          </div>
        </div>

        {/* Pagination */}
        <ReviewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalPosts={filteredFiles.length}
          postsPerPage={itemsPerPage}
        />
      </div>

      {/* Popup form (move inside the component) */}
      <ReviewsForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddReview}
      />


      <ScrollToTopButton />
      <Footer />
    </>
  )
}
