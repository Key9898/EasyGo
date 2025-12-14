import { X } from 'lucide-react'

interface SafetyChecklistModalProps {
  isOpen: boolean
  onClose: () => void
}

const sections: Array<{ title: string; items: string[] }> = [
  {
    title: 'A. Engine & Fluids',
    items: [
      'Engine Oil Level: correct level and clear condition',
      'Coolant Level: radiator and overflow tank filled to spec',
      'Brake Fluid: adequate level in reservoir',
      'Windshield Washer Fluid: topped up and ready',
      'Battery Health: good condition and clean terminals/cables',
    ],
  },
  {
    title: 'B. Tires & Brakes',
    items: [
      'Tire Pressure: proper pressure on all four tires',
      'Tire Tread Depth: sufficient tread; no cracks or excessive wear',
      'Brake Function: firm, consistent grip; no abnormal noise',
      'Parking Brake: hand/foot brake engages and holds correctly',
      'Spare Tire & Tools: spare wheel, jack, and wheel brace present',
    ],
  },
  {
    title: 'C. Visibility & Lights',
    items: [
      'Headlights: high and low beams operate correctly',
      'Brake & Tail Lights: functional under braking and at night',
      'Turn Signals: left/right indicators and hazard lights working',
      'Wipers: smooth movement; good rubbers; wipes water cleanly',
      'Mirrors: side and rearview intact and adjustable',
    ],
  },
  {
    title: 'D. Interior & Comfort',
    items: [
      'Dashboard Warning Lights: no check-engine/overheat warnings',
      'Air Conditioning: cold air and strong airflow',
      'Horn: clear sound and responsive',
      'Seatbelts: front/rear latch securely and retract properly',
      'Fuel Level: full tank per policy',
    ],
  },
]

export default function SafetyChecklistModal({ isOpen, onClose }: SafetyChecklistModalProps) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="checklist-title">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative h-full flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-xl border border-orange-200 overflow-hidden w-full max-w-3xl">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200">
            <div>
              <h3 id="checklist-title" className="text-xl sm:text-2xl font-bold text-orange-600">20-Point Pre-Rental Safety Checklist</h3>
              <p className="text-slate-600">Essential checks to ensure road safety and confidence</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close checklist" className="p-2 rounded-lg hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-5 sm:px-6 py-5 max-h-[70vh] overflow-y-auto">
            {sections.map((section, i) => {
              const start = sections.slice(0, i).reduce((acc, s) => acc + s.items.length, 0) + 1
              return (
                <div key={section.title} className="mb-6">
                  <h4 className="text-xl font-semibold text-orange-600">{section.title}</h4>
                  <ol start={start} className="mt-2 space-y-2 text-base sm:text-lg text-slate-700 list-decimal pl-6">
                    {section.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ol>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
