import { StarIcon } from '@heroicons/react/20/solid'
import { UserCircleIcon } from '@heroicons/react/24/solid'
// icons removed for book types

interface ReviewItem {
  id: string
  author: string
  country?: string
  carName?: string
  avatarSrc?: string | null
  rating: number
  date?: string
  content: string
}

interface ReviewListProps {
  reviews: ReviewItem[]
}

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="flow-root">
      <div className="-my-12 divide-y divide-slate-200">
        {reviews.map((review) => {
          const displayAuthor = review.author
          const origin = review.country
          const car = String(review.carName || '')

          return (
            <div key={review.id} className="py-12">
              <div className="flex items-center">
                {typeof review.avatarSrc === 'string' && review.avatarSrc.trim() ? (
                  <img
                    alt={`${review.author}.`}
                    src={review.avatarSrc}
                    className="size-12 rounded-lg"
                  />
                ) : (
                  <div className="size-12 rounded-lg bg-slate-100 flex items-center justify-center">
                    <UserCircleIcon className="size-8 text-slate-400" />
                  </div>
                )}
                <div className="ml-4 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h4 className="text-base font-bold text-slate-900">{displayAuthor}</h4>
                    {origin ? (
                      <span className="inline-flex items-center rounded-lg bg-orange-50 hover:bg-orange-100 px-2.5 py-1 text-base font-medium text-slate-700">
                        {origin}
                      </span>
                    ) : null}
                    {car ? (
                      <span className="inline-flex items-center rounded-lg bg-orange-50 hover:bg-orange-100 px-2.5 py-1 text-base font-medium text-slate-700">
                        {car}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          review.rating > rating ? 'text-yellow-400' : 'text-slate-300',
                          'size-5 shrink-0',
                        )}
                      />
                    ))}
                    {review.date ? (
                      <span className="ml-3 text-base text-slate-700 leading-5">{review.date}</span>
                    ) : null}
                  </div>
                  <p className="sr-only">{review.rating} out of 5 stars</p>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: review.content }}
                className="mt-4 space-y-6 text-base text-slate-700"
              />
              {/* comments input removed */}
            </div>
          )
        })}
      </div>
    </div>
  )
}
