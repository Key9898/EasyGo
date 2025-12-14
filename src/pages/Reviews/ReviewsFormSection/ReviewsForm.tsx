import { useState, useRef } from 'react'
import { auth } from '../../../firebaseConfig'
import ReviewsFormHeader from './ReviewsFormHeader'
import AvatarNameField from './AvatarNameField'
import LocationField from './LocationField'
import RatingDateFields from './RatingDateFields'
import ContentField from './ContentField'
import AvatarUploadField from './AvatarUploadField'
import FormActions from './FormActions'
import CarSelector from './CarSelector'

export type ReviewFormData = {
  fullName: string
  location: string
  rating: number
  content: string
  date: string
  carName?: string
  avatarFile?: File | null
  avatarDataUrl?: string | null
}

interface ReviewsFormProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: ReviewFormData) => void
}

export default function ReviewsForm({ open, onClose, onSubmit }: ReviewsFormProps) {
  const [location, setLocation] = useState('')
  const [carName, setCarName] = useState('')
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const avatarFileRef = useRef<File | null>(null)
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [fullName, setFullName] = useState('')

  const fullNameDerived = (() => {
    const u = auth?.currentUser || null
    const name = u?.displayName || (u?.email ? u.email.split('@')[0] : '')
    return name || ''
  })()

  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    avatarFileRef.current = file
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setAvatarPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setAvatarPreview(null)
    }
  }

  // car selection handled by subcomponent

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: ReviewFormData = {
      fullName: fullName || fullNameDerived || 'Guest',
      location,
      carName,
      rating,
      content,
      date,
      avatarFile: avatarFileRef.current ?? null,
      avatarDataUrl: avatarPreview ?? null,
    }
    onSubmit?.(payload)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg sm:max-w-xl rounded-lg bg-white shadow-lg">
          {/* Header */}
          <ReviewsFormHeader onClose={onClose} />

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 py-4 sm:px-6 sm:py-6">
            {/* Avatar + Name */}
            <AvatarNameField avatarPreview={avatarPreview} fullName={fullName || fullNameDerived} readOnly={!!auth?.currentUser} onChange={setFullName} />
            {/* Location */}
            <LocationField location={location} onChange={setLocation} />
            {/* Car Selection */}
            <input type="hidden" value={carName} required />
            <CarSelector carName={carName} onChange={setCarName} />
            {/* Rating + Date */}
            <RatingDateFields
              rating={rating}
              date={date}
              onRatingChange={(val) => setRating(val)}
              onDateChange={(val) => setDate(val)}
            />
            {/* Content */}
            <ContentField content={content} onChange={setContent} />
            {/* Optional photo upload */}
            <AvatarUploadField onChange={handleFileChange} />
            {/* Actions */}
            <FormActions onCancel={onClose} submitLabel="Submit Review" />
          </form>
        </div>
      </div>
    </div>
  )
}
