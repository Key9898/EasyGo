
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import { XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import AuthHeader from './AuthHeader'
import AuthFormInput from './AuthFormInput'

interface ForgotPasswordProps {
    onBackToSignIn: () => void
    onClose?: () => void
}

export default function ForgotPassword({ onBackToSignIn, onClose }: ForgotPasswordProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const fd = new FormData(form)
        const email = String(fd.get('email') || '')

        setIsLoading(true)

        if (!auth) {
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Firebase not initialized.' }
            }))
            setIsLoading(false)
            return
        }

        try {
            await sendPasswordResetEmail(auth, email)
            setIsSent(true)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'success', title: 'Email Sent', message: 'Please check your inbox to reset your password.' }
            }))
        } catch (error: any) {
            console.error('Password reset error:', error)
            let msg = 'Failed to send reset email.'
            if (error.code === 'auth/user-not-found') {
                msg = 'No account found with this email.'
            } else if (error.code === 'auth/invalid-email') {
                msg = 'Invalid email address.'
            }

            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: msg }
            }))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="relative bg-white px-6 py-10 shadow-2xl sm:rounded-3xl sm:px-12">
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-label="Close"
                    >
                        <XMarkIcon className="size-6" aria-hidden="true" />
                    </button>

                    {/* Back button */}
                    <button
                        type="button"
                        onClick={onBackToSignIn}
                        className="absolute left-4 top-4 rounded-full p-1 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-label="Back to Sign In"
                    >
                        <ArrowLeftIcon className="size-6" aria-hidden="true" />
                    </button>

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <AuthHeader title="Reset Password" />
                        <p className="mt-2 text-sm text-slate-600">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {!isSent ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AuthFormInput
                                id="email"
                                name="email"
                                type="email"
                                label="Email address"
                                placeholder="your.email@example.com"
                                required
                                autoComplete="email"
                            />

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full justify-center rounded-lg bg-orange-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="rounded-md bg-green-50 p-4">
                                <div className="text-sm text-green-700">
                                    <p>Check your email! We've sent a password reset link to verify your account.</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={onBackToSignIn}
                                className="text-sm font-semibold text-orange-600 hover:text-orange-500"
                            >
                                Back to Sign In
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
