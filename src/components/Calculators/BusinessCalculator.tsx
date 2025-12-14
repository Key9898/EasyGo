import { useMemo, useState } from 'react'
import IndividualCalculator from './IndividualCalculator'

type Mode = 'individual' | 'business'

interface UnifiedCalculatorProps {
  defaultMode?: Mode
}

const modeLabels: Record<Mode, string> = {
  individual: 'For Individuals',
  business: 'For Business',
}

export default function UnifiedCalculator({ defaultMode = 'individual' }: UnifiedCalculatorProps) {
  const [mode, setMode] = useState<Mode>(defaultMode)

  type FleetSegmentId = 'general' | 'operation' | 'executive' | 'staff'

  const FLEET_SEGMENTS: Record<FleetSegmentId, { label: string; monthly: number; avgCarPrice: number; note: string }> = {
    general: { label: 'General Pool (Yaris/City)', monthly: 21000, avgCarPrice: 650000, note: 'Predictable OPEX, no down payment' },
    operation: { label: 'Operation & Utility (Hilux/Fortuner)', monthly: 29900, avgCarPrice: 1000000, note: 'Maintenance and replacement cars included' },
    executive: { label: 'Executive Class (Camry/Alphard)', monthly: 45000, avgCarPrice: 1600000, note: 'Chauffeur options available' },
    staff: { label: 'Staff Transport (Commuter/Staria)', monthly: 55000, avgCarPrice: 1400000, note: 'Shuttle optimization and route flexibility' },
  }

  const [fleetSize, setFleetSize] = useState<number>(5)
  const [segment, setSegment] = useState<FleetSegmentId>('general')

  const selectedSegment = useMemo(() => FLEET_SEGMENTS[segment], [segment])

  const capexAvoided = useMemo(() => {
    return Math.round(fleetSize * selectedSegment.avgCarPrice * 0.2)
  }, [fleetSize, selectedSegment])

  const capexProgress = useMemo(() => {
    const max = 10000000
    const pct = Math.min(Math.round((capexAvoided / max) * 100), 100)
    return pct
  }, [capexAvoided])

  const sliderFill = useMemo(() => {
    const min = 1
    const max = 50
    const val = Math.max(min, Math.min(max, fleetSize))
    return Math.round(((val - min) / (max - min)) * 100)
  }, [fleetSize])

  const BusinessCalculator = () => {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label id="fleet-size-label" htmlFor="fleet-size" className="block text-sm font-medium text-slate-700">Fleet Size</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                id="fleet-size"
                type="range"
                min={1}
                max={50}
                step={1}
                value={fleetSize}
                onChange={(e) => setFleetSize(Number(e.target.value))}
                onInput={(e) => setFleetSize(Number((e.target as HTMLInputElement).value))}
                className="flex-1 accent-orange-600 appearance-none h-2 rounded-full cursor-pointer transition-all duration-200 ease-out bg-slate-200 [\&::-webkit-slider-runnable-track]:appearance-none [\&::-webkit-slider-runnable-track]:h-2 [\&::-webkit-slider-runnable-track]:rounded-full [\&::-webkit-slider-runnable-track]:bg-transparent [\&::-webkit-slider-thumb]:appearance-none [\&::-webkit-slider-thumb]:w-4 [\&::-webkit-slider-thumb]:h-4 [\&::-webkit-slider-thumb]:rounded-full [\&::-webkit-slider-thumb]:bg-orange-600 [\&::-webkit-slider-thumb]:shadow [\&::-webkit-slider-thumb]:transition-all [\&::-webkit-slider-thumb]:duration-200 [\&::-webkit-slider-thumb]:ease-out [\&::-moz-range-track]:appearance-none [\&::-moz-range-track]:h-2 [\&::-moz-range-track]:rounded-full [\&::-moz-range-track]:bg-transparent [\&::-moz-range-thumb]:w-4 [\&::-moz-range-thumb]:h-4 [\&::-moz-range-thumb]:rounded-full [\&::-moz-range-thumb]:bg-orange-600 [\&::-moz-range-thumb]:border-0"
                style={{ background: `linear-gradient(to right, #ea580c 0%, #ea580c ${sliderFill}%, #e5e7eb ${sliderFill}%, #e5e7eb 100%)` }}
                aria-labelledby="fleet-size-label"
                aria-label="Fleet Size"
                title="Fleet Size"
              />
              <input
                type="number"
                min={1}
                max={50}
                value={fleetSize}
                onChange={(e) => setFleetSize(Math.max(1, Math.min(50, Number(e.target.value))))}
                className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-right"
                placeholder="1–50"
                aria-labelledby="fleet-size-label"
                aria-label="Fleet Size (number)"
                title="Fleet Size"
              />
            </div>
          </div>
          <div>
            <label htmlFor="fleet-diversity" className="block text-sm font-medium text-slate-700">Fleet Diversity</label>
            <select
              id="fleet-diversity"
              value={segment}
              onChange={(e) => setSegment(e.target.value as FleetSegmentId)}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              {Object.entries(FLEET_SEGMENTS).map(([id, s]) => (
                <option key={id} value={id}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="monthly-rate" className="block text-sm font-medium text-slate-700">Monthly Rate</label>
            <input
              id="monthly-rate"
              readOnly
              value={`${selectedSegment.monthly.toLocaleString()} THB`}
              placeholder="Monthly rate (THB)"
              title="Monthly subscription rate"
              aria-label="Monthly subscription rate"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
            />
            <p className="mt-2 text-xs text-slate-500">Avg Car Price: {selectedSegment.avgCarPrice.toLocaleString()} THB</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr] gap-6">
          <div className="rounded-lg border border-slate-200 p-4">
            <h4 className="font-semibold text-slate-900">CAPEX Avoided</h4>
            <p className="mt-1 text-sm text-slate-700">Estimated down payment avoided at 20% of car price</p>
            <div className="mt-4 h-6 bg-slate-100 rounded-full">
              <div className="h-6 bg-orange-600 rounded-full transition-all duration-300 ease-out" style={{ width: `${capexProgress}%` }} />
            </div>
            <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">{capexAvoided.toLocaleString()} THB</p>
            <p className="mt-1 text-sm text-slate-600">{selectedSegment.note}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mt-6 rounded-lg bg-orange-50 border border-orange-200 p-4">
            <p className="text-orange-700 font-medium">Save {capexAvoided.toLocaleString()} THB upfront today!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section aria-label="Unified Calculator">
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex">
          <button
            type="button"
            onClick={() => setMode('individual')}
            className={`flex-1 px-4 py-3 text-sm sm:text-base font-semibold rounded-tl-xl ${mode === 'individual' ? 'bg-orange-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
          >
            {modeLabels.individual}
          </button>
          <button
            type="button"
            onClick={() => setMode('business')}
            className={`flex-1 px-4 py-3 text-sm sm:text-base font-semibold rounded-tr-xl ${mode === 'business' ? 'bg-orange-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
          >
            {modeLabels.business}
          </button>
        </div>

        {mode === 'individual' ? (
          <IndividualCalculator />
        ) : (
          <BusinessCalculator />
        )}
      </div>
    </section>
  )
}
