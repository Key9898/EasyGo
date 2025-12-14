import { Link } from 'react-router-dom'

export default function SubscriptionFAQs() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-orange-600">FAQs</h2>
      <div className="mt-6 grid grid-cols-1 gap-6">
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-lg text-slate-900">What documents are required to subscribe?</h3>
          <p className="mt-2 text-base text-slate-700">You need a Valid Driving License and Passport/Thai ID. For the security deposit, we recommend a Credit Card. However, we also accept Debit Cards or Cash Transfer (additional documents like return flight ticket, Student ID, or work permit may be required).</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-lg text-slate-900">What does the insurance cover?</h3>
          <p className="mt-2 text-base text-slate-700">First-class commercial insurance is included. It covers accidents, third-party liability, and theft. Note: Damage caused by customer negligence is chargeable to the customer.</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-lg text-slate-900">Any kilometer limits?</h3>
          <p className="mt-2 text-base text-slate-700">Standard subscription plans include a generous 3,000 km/month allowance. This 3,000 km limit also applies to Adventure and Utility vehicles for recreational driving (commercial use requires a specific Fleet Plan). Excess mileage is charged at 5–10 THB/km, while unlimited mileage is available exclusively for short-term rentals.</p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/faqs"
          className="flex w-full items-center justify-center rounded-lg bg-orange-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-orange-500"
        >
          View All FAQs
        </Link>
      </div>
    </section>
  )
}

