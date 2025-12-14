interface LocationFieldProps {
  location: string
  onChange: (value: string) => void
}

export default function LocationField({ location, onChange }: LocationFieldProps) {
  return (
    <div className="mt-4 sm:mt-6">
      <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
      <input
        id="location"
        type="text"
        required
        value={location}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:border-orange-600 focus:outline-none"
        placeholder="Bangkok, Siam"
      />
    </div>
  )
}
