export default function WhyLeaseVsBuyTable() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-orange-600">Buy vs Lease</h2>
      <p className="mt-2 text-slate-700">B2B comparison of buying a fleet vs EasyGo corporate leasing.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-lg border border-slate-200 p-4 md:col-span-2 lg:col-span-1">
          <h3 className="font-semibold text-xl text-orange-600">Cost Items</h3>
          <ul className="mt-3 text-base text-slate-700 space-y-2">
            <li>Initial Investment</li>
            <li>Maintenance Cost</li>
            <li>Resale Value Risk</li>
            <li>Tax Benefit</li>
            <li>Replacement Car</li>
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-xl text-orange-600">Buying Fleet</h3>
          <ul className="mt-3 text-base text-slate-700 space-y-2">
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>High CAPEX</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>Variable (Unpredictable)</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>High Risk at resale</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>Depreciation Only</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>Self-organized</span></li>
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-xl text-orange-600">EasyGo Corporate Fleet</h3>
          <ul className="mt-3 text-base text-slate-700 space-y-2">
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>Low/Zero CAPEX</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>Fixed & Predictable</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>No Resale Concerns</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>100% Tax Deductible</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>Guaranteed Replacement</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
