export default function HowItWorks() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-orange-600">How It Works</h2>
      <p className="mt-2 text-slate-700">Get on the road quickly with our simple 3-step process.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-xl text-orange-600">Select</h3>
          <p className="mt-2 text-base text-slate-700">Choose your car online.</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-xl text-orange-600">Deposit</h3>
          <p className="mt-2 text-base text-slate-700">Get approved quickly and pay the low refundable deposit.</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-xl text-orange-600">Drive</h3>
          <p className="mt-2 text-base text-slate-700">Delivery within 48 hours.</p>
        </div>
      </div>
    </section>
  )
}

