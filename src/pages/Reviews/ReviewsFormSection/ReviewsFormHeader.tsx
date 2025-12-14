import { XMarkIcon } from '@heroicons/react/24/solid'

interface ReviewsFormHeaderProps {
  onClose: () => void
}

export default function ReviewsFormHeader({ onClose }: ReviewsFormHeaderProps) {
  return (
    <div className="px-4 sm:px-6">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-orange-600">Write a Review</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
      <div className="border-b border-slate-200/60" />
    </div>
  )
}

