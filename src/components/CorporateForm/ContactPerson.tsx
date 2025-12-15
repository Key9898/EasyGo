import { Calendar, Mail, Phone as PhoneIcon, User } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface QuoteFormProps {
  fullName: string
  setFullName: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  email: string
  setEmail: (v: string) => void
  seats: string
  setSeats: (v: string) => void
  startDate: string
  setStartDate: (v: string) => void
  preferredContact: Array<'mobile' | 'email'>
  setPreferredContact: Dispatch<SetStateAction<Array<'mobile' | 'email'>>>
  submitting: boolean
  onBack: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function QuoteForm({
  fullName,
  setFullName,
  phone,
  setPhone,
  email,
  setEmail,
  seats,
  setSeats,
  startDate,
  setStartDate,
  preferredContact,
  setPreferredContact,
  onBack,
  onSubmit,
}: QuoteFormProps) {
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <label htmlFor="sub-full-name" className="block text-sm font-medium text-slate-700 mb-1"><User className="w-4 h-4 inline mr-1" />Contact Person</label>
          <input id="sub-full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Full Name" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sub-phone" className="block text-sm font-medium text-slate-700 mb-1"><PhoneIcon className="w-4 h-4 inline mr-1" />Phone Number</label>
          <input id="sub-phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="08x-xxx-xxxx" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
        <div>
          <label htmlFor="sub-email" className="block text-sm font-medium text-slate-700 mb-1"><Mail className="w-4 h-4 inline mr-1" />Email</label>
          <input id="sub-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@company.com" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sub-seats" className="block text-sm font-medium text-slate-700 mb-1">Seats</label>
          <input id="sub-seats" value={seats} onChange={(e) => setSeats(e.target.value)} type="number" min={1} placeholder="e.g., 4, 7, 12" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>
        <div>
          <label htmlFor="sub-start-date" className="block text-sm font-medium text-slate-700 mb-1"><Calendar className="w-4 h-4 inline mr-1" />Start Date</label>
          <input id="sub-start-date" value={startDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => setStartDate(e.target.value)} type="date" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>
      </div>
      <div>
        <label className="block text-left text-sm font-medium text-slate-700 mb-2">Preferred Mode Of Contact<span className="text-orange-600">*</span></label>
        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2 text-slate-700">
            <input
              type="checkbox"
              className="rounded border-slate-300 accent-orange-600 focus:ring-orange-600"
              checked={preferredContact.includes('mobile')}
              onChange={(e) => {
                const checked = e.target.checked
                setPreferredContact((prev) => checked ? [...prev, 'mobile'] : prev.filter((v) => v !== 'mobile'))
              }}
            />
            Mobile
          </label>
          <label className="inline-flex items-center gap-2 text-slate-700">
            <input
              type="checkbox"
              className="rounded border-slate-300 accent-orange-600 focus:ring-orange-600"
              checked={preferredContact.includes('email')}
              onChange={(e) => {
                const checked = e.target.checked
                setPreferredContact((prev) => checked ? [...prev, 'email'] : prev.filter((v) => v !== 'email'))
              }}
            />
            Email
          </label>
        </div>
      </div>

      <div className="rounded-lg bg-orange-50 p-4 text-sm text-orange-700">
        No payment required yet. Our team will contact you via Email/Phone to confirm availability.
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700">Back</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-orange-600 text-white">Submit</button>
      </div>
    </form>
  )
}
