import { XMarkIcon } from '@heroicons/react/24/outline'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../../firebaseConfig'
import { addDoc, collection, serverTimestamp, setDoc, doc } from 'firebase/firestore'
import AuthHeader from './AuthHeader'
import AuthFormInput from './AuthFormInput'
import PasswordInput from './PasswordInput'
import CheckboxField from './CheckboxField'

interface SignUpProps {
  onBackToSignIn?: () => void
  onClose?: () => void
  onNavigate?: (page: string) => void
}

export default function SignUp({ onBackToSignIn, onClose, onNavigate }: SignUpProps = {}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const fullName = String(fd.get('full-name') || '')
    const email = String(fd.get('email') || '')
    const password = String(fd.get('password') || '')

    if (!auth || !(auth as any).app) {
      window.dispatchEvent(new CustomEvent('app:notify', {
        detail: { type: 'error', title: 'Auth not configured', message: 'Please set Firebase env variables.' }
      }))
      return
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)

      // Update user profile with display name
      if (cred.user && fullName) {
        await updateProfile(cred.user, {
          displayName: fullName
        })
      }

      // Create user document in Firestore
      if (db && cred.user) {
        await setDoc(doc(db, 'users', cred.user.uid), {
          email: email,
          displayName: fullName,
          role: 'user', // Default role
          createdAt: serverTimestamp(),
          photoURL: cred.user.photoURL || null
        })
      }

      window.dispatchEvent(new CustomEvent('app:notify', {
        detail: { type: 'success', title: 'Account created', message: 'You can now sign in to EasyGo.' }
      }))

      try {
        if (db && cred.user?.uid) {
          await addDoc(collection(db, 'notifications'), {
            type: 'personal',
            to: cred.user.uid,
            title: 'Welcome to EasyGo',
            message: 'Thanks for joining! Explore collections and start reading.',
            read: false,
            createdAt: serverTimestamp(),
          })
        }
      } catch { }

      if (onBackToSignIn) onBackToSignIn()
    } catch (err: any) {
      let msg = 'Sign up failed. Please try again.'
      switch (err?.code) {
        case 'auth/email-already-in-use':
          msg = 'This email is already registered.'
          break
        case 'auth/operation-not-allowed':
          msg = 'Email/Password sign-in is disabled. Enable it in Firebase Authentication.'
          break
        case 'auth/weak-password':
          msg = 'Choose a stronger password (min 6 characters).'
          break
        case 'auth/invalid-email':
          msg = 'Enter a valid email address.'
          break
        default:
          break
      }
      console.error('[SignUp] Error:', err?.code || err)
      window.dispatchEvent(new CustomEvent('app:notify', {
        detail: { type: 'error', title: 'Sign up error', message: msg }
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
            <AuthHeader title="Create account" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <AuthFormInput
                id="full-name"
                name="full-name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                required
                autoComplete="given-name"
              />

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
                placeholder="Make your strong password"
                required
                autoComplete="current-password"
              />

              <div className="space-y-3">
                <CheckboxField
                  id="privacy-policy"
                  name="privacy-policy"
                  label={
                    <>
                      Agree to the{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate?.('privacyPolicy')}
                        className="font-semibold whitespace-nowrap text-orange-600 hover:text-orange-500"
                      >
                        Privacy Policy
                      </button>
                    </>
                  }
                />

                <CheckboxField
                  id="terms-service"
                  name="terms-service"
                  label={
                    <>
                      Agree to the{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate?.('termsOfService')}
                        className="font-semibold whitespace-nowrap text-orange-600 hover:text-orange-500"
                      >
                        Terms of Service
                      </button>
                    </>
                  }
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-orange-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Continue
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onBackToSignIn}
                className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
