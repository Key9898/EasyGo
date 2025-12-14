import { useState } from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import { db } from '../../../firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function NewsletterForm() {
    const [formData, setFormData] = useState({ name: '', mobile: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isFormFilled = formData.name.trim() !== '' && formData.mobile.trim() !== ''

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormFilled) return

        setIsSubmitting(true)
        try {
            if (!db) {
                window.dispatchEvent(new CustomEvent('app:notify', {
                    detail: { type: 'error', title: 'Submission Failed', message: 'Service unavailable.' }
                }))
                return
            }
            // Save to Firestore
            await addDoc(collection(db, 'notifications'), {
                name: formData.name,
                mobile: formData.mobile,
                createdAt: serverTimestamp()
            })

            // Also send to Formspree
            await fetch('https://formspree.io/f/mpwvrroa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'success',
                    title: 'Message Sent!',
                    message: 'We have received your details and will contact you shortly.'
                }
            }))
            setFormData({ name: '', mobile: '' })
        } catch (error) {
            console.error('Submission error:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'error',
                    title: 'Submission Failed',
                    message: 'Something went wrong. Please try again later.'
                }
            }))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="mt-10 xl:mt-0">
            <h3 className="text-lg font-bold text-white">Let us find the perfect car for you.</h3>
            <p className="mt-2 text-sm text-slate-300">
                Can't find what you need? Just drop your contact details, and we'll handle the rest.
            </p>
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="block w-full rounded-lg border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-3 outline-none"
                                placeholder="Enter your Name"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-white">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="mobile"
                                id="mobile"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                className="block w-full rounded-lg border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-3 outline-none"
                                placeholder="09 123 456 789"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={!isFormFilled || isSubmitting}
                        className={`flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold shadow-sm transition-colors ${isFormFilled && !isSubmitting
                            ? 'bg-orange-600 text-white hover:bg-orange-500'
                            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <BellIcon className={`h-5 w-5 ${isFormFilled && !isSubmitting ? 'text-white' : 'text-slate-500'}`} aria-hidden="true" />
                        {isSubmitting ? 'Sending...' : 'Notify Me!'}
                    </button>
                </div>
            </form>
        </div>
    )
}
