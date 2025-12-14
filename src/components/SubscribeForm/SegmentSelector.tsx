import { CheckCircle } from 'lucide-react'

type SegmentId = 'budget' | 'family' | 'utility' | 'executive'

interface SegmentSelectorProps {
  selectedSegment: SegmentId | null
  onSelect: (id: SegmentId) => void
  onBack: () => void
  onContinue: () => void
}

const segments: Array<{ id: SegmentId; title: string; price: string }> = [
  { id: 'budget', title: 'Budget Saver', price: 'Starting 19,900 THB/mo' },
  { id: 'family', title: 'Family Comfort', price: 'Starting 34,500 THB/mo' },
  { id: 'utility', title: 'Adventure & Utility', price: 'Starting 39,900 THB/mo' },
  { id: 'executive', title: 'Executive Class', price: 'Starting 49,000 THB/mo' },
]

export default function SegmentSelector({ selectedSegment, onSelect, onBack, onContinue }: SegmentSelectorProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Segments</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {segments.map((seg) => {
            const active = selectedSegment === seg.id
            return (
              <button
                type="button"
                key={seg.id}
                onClick={() => onSelect(seg.id)}
                className={`rounded-xl border p-4 text-left transition-colors ${active ? 'border-orange-600 bg-orange-50' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{seg.title}</p>
                    <p className="text-sm text-slate-600">{seg.price}</p>
                  </div>
                  {active && <CheckCircle className="w-5 h-5 text-orange-600" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700">Back</button>
        <button type="button" onClick={onContinue} className="px-4 py-2 rounded-lg bg-orange-600 text-white">Continue</button>
      </div>
    </div>
  )
}

