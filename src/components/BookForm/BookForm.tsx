import { useState } from 'react'
import { X, Calendar, MapPin, User, Mail, Phone } from 'lucide-react'
import { db, auth } from '../../firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import type { BookFormProps } from '../../types'
import BookingFormInput from './BookingFormInput'
import BookingSummary from './BookingSummary'
import CarInfoDisplay from './CarInfoDisplay'

export default function BookForm({ isOpen, onClose, carName, carPrice, carImage }: BookFormProps) {
    const [formData, setFormData] = useState({
        customerName: auth?.currentUser?.displayName || '',
        customerEmail: auth?.currentUser?.email || '',
        customerPhone: '',
        pickupLocation: '',
        pickupDate: '',
        returnDate: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const calculateDays = () => {
        if (!formData.pickupDate || !formData.returnDate) return 0
        const pickup = new Date(formData.pickupDate)
        const returnD = new Date(formData.returnDate)
        const diffTime = Math.abs(returnD.getTime() - pickup.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    const days = calculateDays()
    const totalPrice = days * carPrice

    const validateForm = () => {
        if (!formData.customerName || !formData.customerEmail || !formData.customerPhone ||
            !formData.pickupLocation || !formData.pickupDate || !formData.returnDate) {
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'error',
                    title: 'Missing Information',
                    message: 'Please fill in all required fields.'
                }
            }))
            return false
        }

        const pickup = new Date(formData.pickupDate)
        const returnD = new Date(formData.returnDate)

        if (returnD <= pickup) {
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'error',
                    title: 'Invalid Dates',
                    message: 'Return date must be after pick-up date.'
                }
            }))
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            await addDoc(collection(db!, 'bookings'), {
                customerName: formData.customerName,
                customerEmail: formData.customerEmail,
                customerPhone: formData.customerPhone,
                carName: carName,
                pickupLocation: formData.pickupLocation,
                pickupDate: formData.pickupDate,
                returnDate: formData.returnDate,
                totalPrice: totalPrice,
                status: 'pending',
                userId: auth?.currentUser?.uid || 'guest',
                createdAt: serverTimestamp()
            })

            try {
                const r = await fetch('https://formspree.io/f/mldqldkg', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        customerName: formData.customerName,
                        customerEmail: formData.customerEmail,
                        customerPhone: formData.customerPhone,
                        carName,
                        pickupLocation: formData.pickupLocation,
                        pickupDate: formData.pickupDate,
                        returnDate: formData.returnDate,
                        totalPrice
                    })
                })
                if (r.ok) {
                    window.dispatchEvent(new CustomEvent('app:notify', {
                        detail: { type: 'success', title: 'Email sent', message: 'Admin has been notified.' }
                    }))
                } else {
                    window.dispatchEvent(new CustomEvent('app:notify', {
                        detail: { type: 'error', title: 'Email failed', message: 'Could not notify admin by email.' }
                    }))
                }
            } catch {
                window.dispatchEvent(new CustomEvent('app:notify', {
                    detail: { type: 'error', title: 'Email failed', message: 'Could not notify admin by email.' }
                }))
            }

            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'success',
                    title: 'Booking Submitted!',
                    message: 'Your booking request has been submitted successfully. We will contact you shortly.'
                }
            }))

            // Reset form
            setFormData({
                customerName: auth?.currentUser?.displayName || '',
                customerEmail: auth?.currentUser?.email || '',
                customerPhone: '',
                pickupLocation: '',
                pickupDate: '',
                returnDate: '',
            })
            onClose()
        } catch (error) {
            console.error('Booking error:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'error',
                    title: 'Booking Failed',
                    message: 'Something went wrong. Please try again later.'
                }
            }))
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-200">
                        <div>
                            <h2 className="text-2xl font-bold text-orange-600">Book Your Car</h2>
                            <p className="text-sm text-slate-600 mt-1">Fill in the details to complete your booking</p>
                        </div>
                        <button
                            type="button"
                            aria-label="Close booking form"
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Car Info */}
                    <CarInfoDisplay carName={carName} carPrice={carPrice} carImage={carImage} />

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Customer Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <BookingFormInput
                                label={<><User className="w-4 h-4 inline mr-1" />Full Name</>}
                                type="text"
                                value={formData.customerName}
                                onChange={(value) => setFormData({ ...formData, customerName: value })}
                                placeholder="Enter your full name"
                                required
                            />

                            <BookingFormInput
                                label={<><Mail className="w-4 h-4 inline mr-1" />Email</>}
                                type="email"
                                value={formData.customerEmail}
                                onChange={(value) => setFormData({ ...formData, customerEmail: value })}
                                placeholder="you.email@example.com"
                                required
                            />
                        </div>

                        <BookingFormInput
                            label={<><Phone className="w-4 h-4 inline mr-1" />Phone Number</>}
                            type="tel"
                            value={formData.customerPhone}
                            onChange={(value) => setFormData({ ...formData, customerPhone: value })}
                            placeholder="09 123 456 789"
                            required
                        />

                        {/* Booking Details */}
                        <BookingFormInput
                            label={<><MapPin className="w-4 h-4 inline mr-1" />Pick-up Location</>}
                            type="text"
                            value={formData.pickupLocation}
                            onChange={(value) => setFormData({ ...formData, pickupLocation: value })}
                            placeholder="Bangkok, Siam"
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <BookingFormInput
                                label={<><Calendar className="w-4 h-4 inline mr-1" />Pick-up Date</>}
                                type="date"
                                value={formData.pickupDate}
                                onChange={(value) => setFormData({ ...formData, pickupDate: value })}
                                placeholder=""
                                required
                            />

                            <BookingFormInput
                                label={<><Calendar className="w-4 h-4 inline mr-1" />Return Date</>}
                                type="date"
                                value={formData.returnDate}
                                onChange={(value) => setFormData({ ...formData, returnDate: value })}
                                placeholder=""
                                required
                            />
                        </div>

                        {/* Price Summary */}
                        <BookingSummary days={days} carPrice={carPrice} totalPrice={totalPrice} />

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label={isSubmitting ? 'Submitting booking' : 'Confirm booking'}
                            >
                                {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
