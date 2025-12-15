import { Dialog, DialogPanel } from '@headlessui/react'
import SignIn from '../../Auth/AuthForm/SignIn'
import SignUp from '../../Auth/AuthForm/SignUp'
import ForgotPassword from '../../Auth/AuthForm/ForgotPassword'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    view: 'signin' | 'signup' | 'forgotPassword'
    setView: (view: 'signin' | 'signup' | 'forgotPassword') => void
    onNavigate?: (page: string) => void
}

export default function AuthModal({ isOpen, onClose, view, setView, onNavigate }: AuthModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-[2000]">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-lg bg-transparent">
                    {view === 'signin' && (
                        <SignIn
                            onClose={onClose}
                            onSwitchToSignUp={() => setView('signup')}
                            onForgotPassword={() => setView('forgotPassword')}
                        />
                    )}
                    {view === 'signup' && (
                        <SignUp
                            onClose={onClose}
                            onNavigate={onNavigate}
                            onBackToSignIn={() => setView('signin')}
                        />
                    )}
                    {view === 'forgotPassword' && (
                        <ForgotPassword
                            onClose={onClose}
                            onBackToSignIn={() => setView('signin')}
                        />
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    )
}
