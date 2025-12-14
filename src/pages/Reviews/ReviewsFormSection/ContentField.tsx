interface ContentFieldProps {
  content: string
  onChange: (value: string) => void
}

export default function ContentField({ content, onChange }: ContentFieldProps) {
  return (
    <div className="mt-4 sm:mt-6">
      <label htmlFor="content" className="block text-sm font-medium text-slate-700">Your Review</label>
      <textarea
        id="content"
        rows={5}
        required
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:border-orange-600 focus:outline-none"
        placeholder="Share your experience with the car..."
      />
    </div>
  )
}
