import { XMarkIcon } from '@heroicons/react/24/outline'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import AuthHeader from './AuthHeader'
import AuthFormInput from './AuthFormInput'
import PasswordInput from './PasswordInput'
import CheckboxField from './CheckboxField'

interface SignInProps {
  onSwitchToSignUp?: () => void
  onClose?: () => void
  onNavigate?: (page: string) => void
}

export default function SignIn({ onSwitchToSignUp, onClose, onNavigate }: SignInProps = {}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const email = String(fd.get('email') || '')
    const password = String(fd.get('password') || '')

    if (!auth || !(auth as any).app) {
      window.dispatchEvent(new CustomEvent('app:notify', {
        detail: { type: 'error', title: 'Auth not configured', message: 'Please set Firebase env variables.' }
      }))
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      window.dispatchEvent(new CustomEvent('app:notify', {
        detail: { type: 'success', title: 'Welcome back!', message: 'You have successfully signed in.' }
      }))
      if (onClose) onClose()
    } catch (err: any) {
      let msg = 'Sign in failed. Please try again.'
      switch (err?.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          msg = 'Invalid email or password.'
          break
        case 'auth/too-many-requests':
          msg = 'Too many failed attempts. Please try again later.'
          break
        case 'auth/user-disabled':
          msg = 'This account has been disabled.'
          break
        case 'auth/invalid-email':
          msg = 'Enter a valid email address.'
          break
        default:
          break
      }
      console.error('[SignIn] Error:', err?.code || err)
      window.dispatchEvent(new CustomEvent('app:notify', {
        detail: { type: 'error', title: 'Sign in error', message: msg }
      }))
    }
  }

  return (
    <>
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

            {/* Header */}
            <AuthHeader title="Sign in to your account" />

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

              <PasswordInput
                id="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between">
                <CheckboxField
                  id="remember-me"
                  name="remember-me"
                  label="Remember me"
                />

                <div className="text-sm leading-6">
                  <button
                    type="button"
                    onClick={() => onNavigate?.('forgotPassword')}
                    className="font-semibold text-orange-600 hover:text-orange-500"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-orange-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
              Not a member?{' '}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
