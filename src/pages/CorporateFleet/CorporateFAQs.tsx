import { Link } from 'react-router-dom'

export default function FAQ() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl font-bold text-orange-600">FAQs</h2>
      <div className="mt-6 grid grid-cols-1 gap-6">
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">Can I get a tax invoice for my company?</h3>
          <p className="mt-2 text-sm text-slate-700">Yes, absolutely. We issue full tax invoices compliant with the Thai Revenue Department for all corporate payments. You can use these for VAT claiming and corporate income tax deductions. Just provide your Tax ID and Branch details during registration.</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">What is the minimum contract term?</h3>
          <p className="mt-2 text-sm text-slate-700">We offer flexibility to suit your business cycles. While our most competitive corporate rates are based on 12-month contracts, we can customize short-term solutions starting from 1 month for specific projects or probation periods.</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">Can we add our company logo to the vehicles?</h3>
          <p className="mt-2 text-sm text-slate-700">Yes, for long-term contracts (12 months+), we allow vehicle branding. You can apply your company logo or wrap the vehicles to match your corporate identity, subject to removing them upon return.</p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/faqs"
          className="flex w-full items-center justify-center rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
        >
          View All FAQs
        </Link>
      </div>
    </section>
  )
}

