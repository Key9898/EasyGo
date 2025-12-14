
export default function CustomerSupport() {
  return (
    <div className="p-8 sm:p-10 lg:p-12">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-orange-600">24/7 Customer Support</h2>
            <p className="mt-4 text-lg text-slate-500">
              Your journey should feel calm and supported end‑to‑end. Every car carries a 24/7 roadside hotline contact card and a stocked first‑aid kit, so help is immediate. Our team monitors requests around the clock to resolve issues fast and keep you moving with confidence.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-slate-100">
            <img
              alt="24/7 Customer Support Team"
              src="/Certified/customer_support.png"
              className="aspect-video w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
