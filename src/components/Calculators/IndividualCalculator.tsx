import { useMemo, useState } from 'react'

type Duration = '1' | '3' | '6' | '12'

const vehicles = [
  { id: 1, name: 'Budget Saver (Toyota Yaris)', baseSubscription: 19900, marketPrice: 650000, deposit: 5000 },
  { id: 2, name: 'Family Comfort (Mitsubishi Xpander)', baseSubscription: 34500, marketPrice: 950000, deposit: 10000 },
  { id: 3, name: 'Adventure & Utility (Ford Ranger)', baseSubscription: 39900, marketPrice: 1100000, deposit: 15000 },
  { id: 4, name: 'Executive Class (Toyota Camry)', baseSubscription: 49000, marketPrice: 1650000, deposit: 20000 },
] as const

export default function IndividualCalculator() {
  const [modelId, setModelId] = useState<string | number>(vehicles[0].id)
  const [duration, setDuration] = useState<Duration>('12')

  const selected = useMemo(() => {
    return vehicles.find(v => String(v.id) === String(modelId)) || vehicles[0]
  }, [modelId])

  const monthlySurcharge = useMemo(() => {
    if (duration === '12') return 0
    if (duration === '6') return 3000
    if (duration === '3') return 5000
    return 8000
  }, [duration])

  const subscriptionFirstMonth = useMemo(() => {
    return selected.baseSubscription + monthlySurcharge
  }, [selected, monthlySurcharge])

  const buyingUpfront = useMemo(() => {
    return Math.round(selected.marketPrice * 0.3 + 25000)
  }, [selected])

  const easyGoEntryCost = useMemo(() => {
    return selected.deposit + subscriptionFirstMonth
  }, [selected, subscriptionFirstMonth])

  const upfrontSavings = useMemo(() => {
    return Math.max(buyingUpfront - easyGoEntryCost, 0)
  }, [buyingUpfront, easyGoEntryCost])

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="calc-model" className="block text-sm font-medium text-slate-700">Select Car Model</label>
          <select
            id="calc-model"
            name="model"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="calc-duration" className="block text-sm font-medium text-slate-700">Select Duration</label>
          <select
            id="calc-duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value as Duration)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>
        <div>
          <label htmlFor="calc-monthly" className="block text-sm font-medium text-slate-700">Monthly Rate (estimated)</label>
          <input
            id="calc-monthly"
            name="monthly"
            value={`${subscriptionFirstMonth.toLocaleString()} THB`}
            readOnly
            title="Estimated monthly subscription rate"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">Buying Upfront</h4>
          <p className="mt-2 text-sm text-slate-700">30% down + insurance + registration</p>
          <div className="mt-4 h-8 bg-slate-100 rounded">
            <div className="h-8 bg-slate-400 rounded" style={{ width: '80%' }} />
          </div>
          <p className="mt-2 text-lg font-semibold text-slate-900">{buyingUpfront.toLocaleString()} THB</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900">EasyGo Entry Cost</h4>
          <p className="mt-2 text-sm text-slate-700">Refundable deposit + first month</p>
          <div className="mt-4 h-8 bg-slate-100 rounded">
            <div className="h-8 bg-orange-500 rounded" style={{ width: '20%' }} />
          </div>
          <p className="mt-2 text-lg font-semibold text-slate-900">{easyGoEntryCost.toLocaleString()} THB</p>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-orange-50 border border-orange-200 p-4">
        <p className="text-orange-700 font-medium">Save {upfrontSavings.toLocaleString()} THB upfront today!</p>
      </div>
    </div>
  )
}
