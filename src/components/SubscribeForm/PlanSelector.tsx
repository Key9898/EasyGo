import { CheckCircle } from 'lucide-react'

type PlanOption = {
  id: '12' | '6' | '3' | '1'
  title: string
  subtitle: string
}

interface PlanSelectorProps {
  plans: PlanOption[]
  selectedPlanId: string
  onSelect: (p: PlanOption) => void
  onCancel: () => void
  onContinue: () => void
}

export default function PlanSelector({ plans, selectedPlanId, onSelect, onCancel, onContinue }: PlanSelectorProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {plans.map((p) => {
          const active = selectedPlanId === p.id
          return (
            <button
              type="button"
              key={p.id}
              onClick={() => onSelect(p)}
              className={`rounded-xl border p-4 text-left transition-colors ${active ? 'border-orange-600 bg-orange-50' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{p.title}</p>
                  <p className="text-sm text-slate-600">{p.subtitle}</p>
                </div>
                {active && <CheckCircle className="w-5 h-5 text-orange-600" />}
              </div>
            </button>
          )
        })}
      </div>
      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700">Cancel</button>
        <button type="button" onClick={onContinue} className="px-4 py-2 rounded-lg bg-orange-600 text-white">Continue</button>
      </div>
    </div>
  )
}

