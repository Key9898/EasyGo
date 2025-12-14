import { useEffect, useState, useRef } from 'react'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { StarIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

interface Review {
  id: string
  author: string
  rating: number
  content: string
  date: string
  avatarSrc?: string | null
  carName?: string
}

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      if (!db) return
      try {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(10))
        const querySnapshot = await getDocs(q)
        const fetchedReviews = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            author: data.userName || data.author || 'Guest',
            rating: Number(data.rating) || 5,
            content: data.text || data.content || '',
            date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently',
            avatarSrc: data.avatarDataUrl || null,
            carName: data.carName
          }
        })
        setReviews(fetchedReviews)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = current.clientWidth * 0.8
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (loading) return null

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight sm:text-4xl mb-4">
            <span className="text-orange-600">EasyGo Certified.</span>{' '}
            <span className="text-slate-900">Customer Verified.</span>
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600">See What Our Customers Say.</p>
        </div>

        <div className="relative group">
          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors focus:outline-none hidden sm:block"
            aria-label="Previous reviews"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition-colors focus:outline-none hidden sm:block"
            aria-label="Next reviews"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-4 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-none w-full sm:w-[350px] lg:w-[400px] snap-center"
              >
                <div className="bg-white rounded-2xl shadow-md p-8 h-full flex flex-col border border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    {review.avatarSrc ? (
                      <img src={review.avatarSrc} alt={review.author} className="w-14 h-14 rounded-full object-cover border-2 border-orange-100" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <UserCircleIcon className="w-10 h-10" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900">{review.author}</h3>
                      {review.carName && <p className="text-xs text-orange-600 font-medium">{review.carName}</p>}
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          review.rating > rating ? 'text-yellow-400' : 'text-slate-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <div className="flex-grow">
                    <p className="text-slate-600 leading-relaxed line-clamp-4">"{review.content}"</p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-4 h-4 opacity-50 slatescale" />
                    <span className="text-xs text-slate-400">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Check out some <Link to="/reviews" className="text-orange-600 font-semibold hover:underline decoration-2 underline-offset-2">press coverage</Link> about EasyGo and why we are the best
          </p>
        </div>
      </div>
    </div>
  )
}
