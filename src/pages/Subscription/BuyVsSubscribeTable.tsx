export default function BuyVsSubscribeTable() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-orange-600">Buy vs Subscribe</h2>
      <p className="mt-2 text-slate-700">See how EasyGo subscription compares to buying a car.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-lg border border-slate-200 p-4 md:col-span-2 lg:col-span-1">
          <h3 className="font-semibold text-xl text-orange-600">Cost Items</h3>
          <ul className="mt-3 text-base text-slate-700 space-y-2">
            <li>Upfront Payment</li>
            <li>Insurance & Registration</li>
            <li>Maintenance</li>
            <li>Depreciation Risk</li>
            <li>Exit Process</li>
            <li>Commitment Period</li>
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-xl text-orange-600">Buying</h3>
          <ul className="mt-3 text-base text-slate-700 space-y-2">
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>30% Down Payment</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>Pay annually (variable)</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>Self-funded repairs</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>Depreciation, resale risk</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>Find buyer, negotiate price</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-orange-600">⚠️</span><span>5-7 Years Loan Lock-in</span></li>
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-xl text-orange-600">EasyGo Subscription</h3>
          <ul className="mt-3 text-base text-slate-700 space-y-2">
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>Low refundable deposit</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>Included (flat monthly fee)</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>Routine maintenance included</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>No resale concerns</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>Return keys, done</span></li>
            <li className="flex items-start gap-2"><span aria-hidden="true" className="text-green-600">✅</span><span>Flexible (1-12 Months)</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
