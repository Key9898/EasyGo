import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { auth, db } from '../../firebaseConfig'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import DiversitySelector from './DiversitySelector'
import QuoteForm from './ContactPerson'
import CompanyInformation from './CompanyInformation'

interface SubscriptionBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubscriptionBookingModal({ isOpen, onClose }: SubscriptionBookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState(auth?.currentUser?.email || '')
  const [preferredContact, setPreferredContact] = useState<Array<'mobile' | 'email'>>([])
  const [selectedDiversity, setSelectedDiversity] = useState<null | 'general' | 'operation' | 'executive' | 'staff'>('general')
  const [startDate, setStartDate] = useState('')
  const [seats, setSeats] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [taxId, setTaxId] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (!auth) return
    const name = auth.currentUser?.displayName || ''
    setFullName(name)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    setStep(1)
    const name = auth?.currentUser?.displayName || ''
    const mail = auth?.currentUser?.email || ''
    if (name) setFullName(name)
    if (mail) setEmail(mail)
  }, [isOpen])

  const progress = useMemo(() => (step === 1 ? 33 : step === 2 ? 66 : 100), [step])

  const goToStep2 = () => {
    if (!selectedDiversity) {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Select Segment', message: 'Please choose a segment to continue.' } }))
      return
    }
    setStep(2)
  }

  const goToStep3FromCompany = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const validate = () => {
    if (!fullName || !phone || !email || !startDate) return false
    const phoneNormalized = phone.replace(/[\s-]/g, '')
    const phoneOk = /^(0\d{9}|\+66\d{8,9})$/.test(phoneNormalized)
    if (!phoneOk) return false
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!ok) return false
    if (preferredContact.length === 0) return false
    return true
  }

  const submitIfValid = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Missing Information', message: 'Fill all required fields. Enter a valid phone and email. Select preferred contact.' } }))
      return
    }
    await handleSubmit(e)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db) {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Error', message: 'Service unavailable' } }))
      return
    }
    if (!validate()) {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Missing Information', message: 'Fill all required fields. Enter a valid phone and email. Select preferred contact.' } }))
      return
    }
    setSubmitting(true)
    try {
      await addDoc(collection(db!, 'corporateRequests'), {
        segment: selectedDiversity,
        contactName: fullName,
        phone,
        email,
        fleetSize: seats ? Number(seats) : null,
        desiredStartDate: startDate,
        preferredContact,
        companyName,
        taxId,
        companyPhone,
        businessEmail,
        docUploads: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
        status: 'pending',
        userId: auth?.currentUser?.uid || 'guest',
        createdAt: serverTimestamp(),
      })

      window.dispatchEvent(new CustomEvent('app:notify', {
        detail: { type: 'success', title: 'Submitted', message: 'We will contact you via Email/Phone to confirm availability.' }
      }))

      setFullName(auth?.currentUser?.displayName || '')
      setPhone('')
      setEmail(auth?.currentUser?.email || '')
      setPreferredContact([])
      setStartDate('')
      setCompanyName('')
      setTaxId('')
      setCompanyPhone('')
      setBusinessEmail('')
      setFiles([])
      onClose()
    } catch {
      window.dispatchEvent(new CustomEvent('app:notify', {
        detail: { type: 'error', title: 'Submission Failed', message: 'Please try again later.' }
      }))
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-bold text-left text-orange-600">Start Corporate</h2>
              <p className="text-sm text-slate-600 mt-1">Lead-only. No payment required now.</p>
            </div>
            <button type="button" aria-label="Close subscription modal" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 pt-4">
            <div className="w-full h-2 bg-slate-200 rounded-full">
              <div className="h-2 bg-orange-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600 mt-2">
              <span className={step === 1 ? 'font-semibold text-orange-600' : ''}>Step 1: Choose Segment</span>
              <span className={step === 2 ? 'font-semibold text-orange-600' : ''}>Step 2: Company Information</span>
              <span className={step === 3 ? 'font-semibold text-orange-600' : ''}>Step 3: Your Details</span>
            </div>
          </div>

          {step === 1 ? (
            <DiversitySelector
              selectedDiversity={selectedDiversity}
              onSelect={(id) => setSelectedDiversity(id)}
              onBack={onClose}
              onContinue={goToStep2}
            />
          ) : step === 2 ? (
            <CompanyInformation
              companyName={companyName}
              setCompanyName={setCompanyName}
              taxId={taxId}
              setTaxId={setTaxId}
              phone={companyPhone}
              setPhone={setCompanyPhone}
              businessEmail={businessEmail}
              setBusinessEmail={setBusinessEmail}
              files={files}
              setFiles={setFiles}
              onBack={() => setStep(1)}
              onSubmit={goToStep3FromCompany}
            />
          ) : (
            <QuoteForm
              fullName={fullName}
              setFullName={setFullName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              seats={seats}
              setSeats={setSeats}
              startDate={startDate}
              setStartDate={setStartDate}
              preferredContact={preferredContact}
              setPreferredContact={setPreferredContact}
              submitting={submitting}
              onBack={() => setStep(2)}
              onSubmit={submitIfValid}
            />
          )}
        </div>
      </div>
    </div>
  )
}
