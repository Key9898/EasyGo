import { useState, useEffect } from 'react'
import { X, User, Mail, Phone, FileText, Upload } from 'lucide-react'
import { db, auth } from '../../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import ApplicationFormInput from './ApplicationFormInput'

interface JobApplicationFormProps {
    isOpen: boolean
    onClose: () => void
    jobTitle: string
    formspreeUrl: string
}

export default function JobApplicationForm({ isOpen, onClose, jobTitle, formspreeUrl }: JobApplicationFormProps) {
    const [formData, setFormData] = useState({
        fullName: auth?.currentUser?.displayName || '',
        email: auth?.currentUser?.email || '',
        phone: '',
        coverLetter: '',
        cvFile: null as File | null
    })

    useEffect(() => {
        if (!auth) return
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setFormData(prev => ({
                    ...prev,
                    fullName: user.displayName || prev.fullName,
                    email: user.email || prev.email
                }))
            }
        })
        return () => unsubscribe()
    }, [])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateForm = () => {
        if (!formData.fullName || !formData.email || !formData.phone || !formData.coverLetter) {
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'error',
                    title: 'Missing Information',
                    message: 'Please fill in all required fields.'
                }
            }))
            return false
        }

        if (!formData.cvFile) {
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'error',
                    title: 'CV Required',
                    message: 'Please upload your CV/Resume.'
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
            // Save to Firestore
            await addDoc(collection(db!, 'applications'), {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                jobTitle: jobTitle,
                coverLetter: formData.coverLetter,
                cvFileName: formData.cvFile?.name || '',
                status: 'pending',
                userId: auth?.currentUser?.uid || 'guest',
                createdAt: serverTimestamp()
            })

            // Send to Formspree
            try {
                const formspreeData = new FormData()
                formspreeData.append('fullName', formData.fullName)
                formspreeData.append('email', formData.email)
                formspreeData.append('phone', formData.phone)
                formspreeData.append('jobTitle', jobTitle)
                formspreeData.append('coverLetter', formData.coverLetter)
                if (formData.cvFile) {
                    formspreeData.append('cv', formData.cvFile)
                }

                const res = await fetch(formspreeUrl, {
                    method: 'POST',
                    body: formspreeData,
                    headers: { 'Accept': 'application/json' }
                })

                if (res.ok) {
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
                    title: 'Application Submitted!',
                    message: 'Your job application has been submitted successfully. We will contact you shortly.'
                }
            }))

            // Reset form
            setFormData({
                fullName: auth?.currentUser?.displayName || '',
                email: auth?.currentUser?.email || '',
                phone: '',
                coverLetter: '',
                cvFile: null
            })
            onClose()
        } catch (error) {
            console.error('Application error:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'error',
                    title: 'Application Failed',
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
                            <h2 className="text-2xl font-bold text-orange-600">Apply for {jobTitle}</h2>
                            <p className="text-sm text-slate-600 mt-1">Fill in your details to submit your application</p>
                        </div>
                        <button
                            type="button"
                            aria-label="Close application form"
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Personal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ApplicationFormInput
                                label={<><User className="w-4 h-4 inline mr-1" />Full Name</>}
                                type="text"
                                value={formData.fullName}
                                onChange={(value) => setFormData({ ...formData, fullName: value })}
                                placeholder="Enter your full name"
                                required
                            />

                            <ApplicationFormInput
                                label={<><Mail className="w-4 h-4 inline mr-1" />Email</>}
                                type="email"
                                value={formData.email}
                                onChange={(value) => setFormData({ ...formData, email: value })}
                                placeholder="you.email@example.com"
                                required
                            />
                        </div>

                        <ApplicationFormInput
                            label={<><Phone className="w-4 h-4 inline mr-1" />Phone Number</>}
                            type="tel"
                            value={formData.phone}
                            onChange={(value) => setFormData({ ...formData, phone: value })}
                            placeholder="09 123 456 789"
                            required
                        />

                        {/* Cover Letter */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <FileText className="w-4 h-4 inline mr-1" />Cover Letter
                                <span className="text-red-500"> *</span>
                            </label>
                            <textarea
                                value={formData.coverLetter}
                                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                placeholder="Tell us why you're a great fit for this position..."
                                rows={5}
                                required
                            />
                        </div>

                        {/* CV Upload */}
                        <div>
                            <label htmlFor="cv-upload" className="block text-sm font-medium text-slate-700 mb-2">
                                <Upload className="w-4 h-4 inline mr-1" />Upload CV/Resume
                                <span className="text-red-500"> *</span>
                            </label>
                            <input
                                id="cv-upload"
                                name="cv"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                title="Upload CV/Resume"
                                aria-label="Upload CV/Resume"
                                onChange={(e) => setFormData({ ...formData, cvFile: e.target.files?.[0] || null })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                required
                            />
                            <p className="text-xs text-slate-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                        </div>

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
                                aria-label={isSubmitting ? 'Submitting application' : 'Submit application'}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
