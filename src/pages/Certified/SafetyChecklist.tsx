import { useState } from 'react'
import SafetyChecklistModal from './SafetyChecklistModal'

const features = [
  { name: 'Engine & Fluids', description: 'Comprehensive check of engine oil, coolant, brake fluid, and battery health to prevent breakdowns.' },
  { name: 'Tires & Brakes', description: 'Inspection of tire pressure, tread wear, brake performance, and parking brake for maximum safety.' },
  { name: 'Visibility & Lights', description: 'Verification of all exterior lights, turn signals, wiper blades, and mirrors for clear visibility.' },
  { name: 'Interior & Comfort', description: 'Check of dashboard warnings, air conditioning, seatbelts, horn, and fuel level for a comfortable ride.' },
]

export default function SafetyChecklist() {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-orange-600">20-points Inspection</h2>
          <p className="mt-4 text-lg text-slate-500">
            Every vehicle undergoes a rigorous 20-point safety inspection before handover. We ensure every car meets our high standards for performance, safety, and cleanliness, giving you total peace of mind on the road.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-500"
              aria-label="View 20-point safety checklist"
            >
              View 20-Point Checklist
            </button>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-slate-200 pt-4">
                <dt className="font-semibold text-orange-600">{feature.name}</dt>
                <dd className="mt-2 text-base text-slate-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Mechanic checking engine oil"
            src="/Certified/safety_engine.png"
            className="rounded-2xl bg-orange-100 aspect-square object-cover w-full h-full"
          />
          <img
            alt="Tire tread depth inspection"
            src="/Certified/safety_tires.png"
            className="rounded-2xl bg-orange-100 aspect-square object-cover w-full h-full"
          />
          <img
            alt="Headlight and visibility check"
            src="/Certified/safety_lights.png"
            className="rounded-2xl bg-orange-100 aspect-square object-cover w-full h-full"
          />
          <img
            alt="Interior dashboard and controls inspection"
            src="/Certified/safety_interior.png"
            className="rounded-2xl bg-orange-100 aspect-square object-cover w-full h-full"
          />
          <SafetyChecklistModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </div>
  )
}
