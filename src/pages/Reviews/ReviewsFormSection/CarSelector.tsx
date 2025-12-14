import { staticVehicles } from '../../../data/constants'

interface CarSelectorProps {
  carName: string
  onChange: (value: string) => void
}

export default function CarSelector({ carName, onChange }: CarSelectorProps) {
  const carOptions = staticVehicles.map(v => v.name)

  return (
    <div className="mt-4 sm:mt-6">
      <label htmlFor="carName" className="block text-sm font-medium text-slate-700">Car</label>
      <select
        id="carName"
        value={carName}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg bg-white px-3.5 py-2 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600"
      >
        <option value="">Select a car</option>
        {carOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
