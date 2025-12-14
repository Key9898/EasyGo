import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { auth, db } from '../../firebaseConfig'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import PlanSelector from './PlanSelector'
import SegmentSelector from './SegmentSelector'
import DetailsForm from './DetailsForm'

interface SubscriptionBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

type PlanOption = {
  id: '12' | '6' | '3' | '1'
  title: string
  subtitle: string
}

const plans: PlanOption[] = [
  { id: '12', title: '12 Months', subtitle: 'Best Value' },
  { id: '6', title: '6 Months', subtitle: 'Base + 3k' },
  { id: '3', title: '3 Months', subtitle: 'Base + 5k' },
  { id: '1', title: '1 Month', subtitle: 'Base + 8k' },
]

export default function SubscriptionBookingModal({ isOpen, onClose }: SubscriptionBookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>(plans[0])
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState(auth?.currentUser?.email || '')
  const [preferredContact, setPreferredContact] = useState<Array<'mobile' | 'email'>>([])
  const [selectedSegment, setSelectedSegment] = useState<null | 'budget' | 'family' | 'utility' | 'executive'>('budget')
  const [startDate, setStartDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

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

  const goToStep2FromPlan = () => {
    if (!selectedPlan) {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Select Plan', message: 'Please choose a plan to continue.' } }))
      return
    }
    setStep(2)
  }

  const goToStep3FromSegment = () => {
    if (!selectedSegment) {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Select Segment', message: 'Please choose a segment to continue.' } }))
      return
    }
    setStep(3)
  }

  const validate = () => {
    if (!fullName || !phone || !email || !startDate) return false
    if (!/^08/.test(phone)) return false
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!ok) return false
    if (preferredContact.length === 0) return false
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db) {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Error', message: 'Service unavailable' } }))
      return
    }
    if (!validate()) {
      window.dispatchEvent(new CustomEvent('app:notify', { detail: { type: 'error', title: 'Missing Information', message: 'Fill all required fields. Phone should start with 08. Enter a valid email. Select preferred contact.' } }))
      return
    }
    setSubmitting(true)
    try {
      await addDoc(collection(db!, 'subscriptionRequests'), {
        planMonths: selectedPlan.id,
        planLabel: `${selectedPlan.title} (${selectedPlan.subtitle})`,
        fullName,
        phone,
        email,
        desiredStartDate: startDate,
        preferredContact,
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
              <h2 className="text-2xl font-bold text-left text-orange-600">Start Subscription</h2>
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
              <span className={step === 1 ? 'font-semibold text-orange-600' : ''}>Step 1: Choose Plan</span>
              <span className={step === 2 ? 'font-semibold text-orange-600' : ''}>Step 2: Choose Segment</span>
              <span className={step === 3 ? 'font-semibold text-orange-600' : ''}>Step 3: Your Details</span>
            </div>
          </div>

          {step === 1 ? (
            <PlanSelector
              plans={plans}
              selectedPlanId={selectedPlan.id}
              onSelect={(p) => setSelectedPlan(p)}
              onCancel={onClose}
              onContinue={goToStep2FromPlan}
            />
          ) : step === 2 ? (
            <SegmentSelector
              selectedSegment={selectedSegment}
              onSelect={(id) => setSelectedSegment(id)}
              onBack={() => setStep(1)}
              onContinue={goToStep3FromSegment}
            />
          ) : (
            <DetailsForm
              fullName={fullName}
              setFullName={setFullName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              startDate={startDate}
              setStartDate={setStartDate}
              preferredContact={preferredContact}
              setPreferredContact={setPreferredContact}
              submitting={submitting}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}
