interface RatingDateFieldsProps {
  rating: number
  date: string
  onRatingChange: (value: number) => void
  onDateChange: (value: string) => void
}

export default function RatingDateFields({ rating, date, onRatingChange, onDateChange }: RatingDateFieldsProps) {
  return (
    <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-slate-700">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => onRatingChange(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-orange-600 focus:outline-none"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} stars
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
        <input
          id="date"
          type="date"
          required
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-orange-600 focus:outline-none"
        />
      </div>
    </div>
  )
}
