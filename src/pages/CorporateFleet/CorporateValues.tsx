import { BanknotesIcon, ArrowPathIcon, ClipboardDocumentCheckIcon, UserIcon } from '@heroicons/react/24/outline'

export default function CorporateValueBenefits() {
  const benefits = [
    {
      title: 'Cost Efficiency',
      description:
        'Avoid locking capital in vehicle purchases. Shift spend from CAPEX to predictable OPEX, benefit from fully tax-deductible expenses, and keep cash flow healthy.',
      icon: BanknotesIcon,
    },
    {
      title: 'Zero Downtime',
      description:
        'If a vehicle breaks down, your operations don’t stop. We arrange a replacement car within 24 hours during maintenance so your team stays productive.',
      icon: ArrowPathIcon,
    },
    {
      title: 'Simplified Admin',
      description:
        'No more HR/Admin headaches handling renewals, insurance, and maintenance. EasyGo provides a one‑stop service and takes care of everything end to end.',
      icon: ClipboardDocumentCheckIcon,
    },
    {
      title: 'Chauffeur Service',
      description:
        'When needed, we provide experienced, English‑speaking professional drivers who deliver courteous, reliable service for executives and guests.',
      icon: UserIcon,
    },
  ]

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-16">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-orange-600">Core Values</h2>
      <p className="mt-2 text-slate-700">Why leading enterprises choose us to manage their mobility needs.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((b, i) => (
          <div key={i} className="flex flex-col h-full bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
            <b.icon className="size-10 text-orange-600 mb-2" />
            <h3 className="font-semibold text-xl text-orange-600 mb-2">{b.title}</h3>
            <p className="text-base text-slate-700 leading-relaxed flex-grow">{b.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

