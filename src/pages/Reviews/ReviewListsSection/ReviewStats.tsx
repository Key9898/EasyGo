import { StarIcon } from '@heroicons/react/20/solid'

interface ReviewCount {
  rating: number
  count: number
}

interface ReviewStatsProps {
  averageRating: number
  totalCount: number
  countsByRating: ReviewCount[]
}

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ReviewStats({ averageRating, totalCount, countsByRating }: ReviewStatsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-orange-600">Rider Reviews</h2>

      <div className="mt-3 flex items-center">
        <div>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                aria-hidden="true"
                className={classNames(
                  averageRating > rating ? 'text-yellow-400' : 'text-slate-300',
                  'size-5 shrink-0',
                )}
              />
            ))}
          </div>
          <p className="sr-only">{averageRating} out of 5 stars</p>
        </div>
        <p className="ml-2 text-base text-slate-900">Based on {totalCount} reviews</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Review data</h3>

        <dl className="space-y-3">
          {countsByRating.map((count) => (
            <div key={count.rating} className="flex items-center text-sm">
              <dt className="flex flex-1 items-center">
                <p className="w-3 font-medium text-slate-900">
                  {count.rating}
                  <span className="sr-only"> star reviews</span>
                </p>
                <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                  <StarIcon
                    aria-hidden="true"
                    className={classNames(count.count > 0 ? 'text-yellow-400' : 'text-slate-300', 'size-5 shrink-0')}
                  />
                  <div className="relative ml-3 flex-1">
                    <div className="h-3 rounded-full border border-slate-200 bg-slate-100" />
                    {count.count > 0 ? (
                      <div
                        style={{ width: `calc(${count.count} / ${totalCount} * 100%)` }}
                        className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                      />
                    ) : null}
                  </div>
                </div>
              </dt>
              <dd className="ml-3 w-12 text-right text-sm text-slate-900 tabular-nums">
                {totalCount > 0 ? Math.round((count.count / totalCount) * 100) : 0}%
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
