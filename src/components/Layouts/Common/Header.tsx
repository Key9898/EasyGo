import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/outline'

import IntroAnimation from './IntroAnimation'
import LogoAnimation from './LogoAnimation'
import { auth } from '../../../firebaseConfig'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import UserPanel from '../../Auth/UserPanel/UserPanel'

// New Components
import AuthModal from '../HeaderComponents/AuthModal'
import AccountMenu from '../HeaderComponents/AccountMenu'
import NavigationLinks from '../HeaderComponents/NavigationLinks'
import MobileMenu from '../HeaderComponents/MobileMenu'

interface HeaderProps {
  onNavigate?: (page: string) => void
}

const navigation = [
  { name: 'Fleet', slug: 'fleet' },
  { name: 'Certified', slug: 'certified' },
  { name: 'Subscription', slug: 'subscription' },
  { name: 'Guide', slug: 'guide' },
]

export default function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const location = useLocation()

  // Check if intro animation has already been shown in this session
  const hasSeenIntro = sessionStorage.getItem('easygo_intro_shown') === 'true'
  const [showAnimation, setShowAnimation] = useState(!hasSeenIntro)
  const [animationComplete, setAnimationComplete] = useState(hasSeenIntro)
  const [showTextAnimation, setShowTextAnimation] = useState(hasSeenIntro)

  // Auth State
  const [user, setUser] = useState<User | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalView, setAuthModalView] = useState<'signin' | 'signup' | 'forgotPassword'>('signin')
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  // Check if we are on the home page
  // Using location.pathname is more reliable with react-router
  const isHomePage = location.pathname === '/' || location.pathname === '/index.html'

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!auth) return
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleOpenSignIn = () => {
      setAuthModalView('signin')
      setAuthModalOpen(true)
    }
    const handleOpenSignUp = () => {
      setAuthModalView('signup')
      setAuthModalOpen(true)
    }

    window.addEventListener('app:auth:open:signIn', handleOpenSignIn)
    window.addEventListener('app:auth:open:signup', handleOpenSignUp)

    return () => {
      window.removeEventListener('app:auth:open:signIn', handleOpenSignIn)
      window.removeEventListener('app:auth:open:signup', handleOpenSignUp)
    }
  }, [])

  const handleAnimationComplete = () => {
    setAnimationComplete(true)
    setShowTextAnimation(true) // Start animation immediately behind the fade
    // Mark that intro has been shown in this session
    sessionStorage.setItem('easygo_intro_shown', 'true')
    // Delay hiding the animation overlay to ensure smooth transition
    setTimeout(() => {
      setShowAnimation(false)
    }, 500)
  }
  // Determine text color based on transparency state
  // On home page, white text when transparent (not sticky), dark when sticky
  // On other pages, always dark text
  const textColor = isHomePage && !isSticky ? 'text-slate-50' : 'text-slate-700'
  const accountTextColor = isHomePage && !isSticky ? 'text-slate-50' : 'text-slate-900'

  return (
    <>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        view={authModalView}
        setView={setAuthModalView}
        onNavigate={onNavigate}
      />

      {/* Logo Animation Overlay - Full screen on initial load */}
      {showAnimation && (
        <div className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-500 ${animationComplete ? 'opacity-0' : 'opacity-100'}`}>
          <IntroAnimation onAnimationComplete={handleAnimationComplete} />
        </div>
      )}

      <header className={`${isHomePage ? 'fixed left-0 right-0' : 'sticky'
        } top-0 z-50 transition-all duration-300 ${isSticky
          ? 'bg-white shadow-md'
          : isHomePage
            ? 'bg-transparent'
            : 'bg-white/80 backdrop-blur-sm'
        }`}>
        <nav aria-label="Global" className="relative mx-auto flex max-w-7xl items-center justify-between p-6 px-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-3">
            <button
              type="button"
              onClick={() => { onNavigate?.('home') }}
              className="-m-1.5 p-1.5"
            >
              <span className="sr-only">EasyGo</span>
              {showTextAnimation && !isSticky ? (
                <LogoAnimation text="EasyGo" shouldLoop={!isSticky} />
              ) : (
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                  EasyGo
                </h1>
              )}
            </button>
          </div>

          {/* Desktop Navigation - Centered when sticky */}
          {isSticky && (
            <NavigationLinks
              navigation={navigation}
              onNavigate={onNavigate}
              textColor={textColor}
              isSticky={true}
            />
          )}

          {/* Desktop Navigation - Right side when not sticky */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="flex items-center gap-x-8">
              {!isSticky && (
                <NavigationLinks
                  navigation={navigation}
                  onNavigate={onNavigate}
                  textColor={textColor}
                  isSticky={false}
                />
              )}

              {user ? (
                <UserPanel
                  userEmail={user.email}
                  userDisplayName={user.displayName}
                  uid={user.uid}
                  onNavigate={onNavigate}
                  onSignOut={() => { if (auth) return signOut(auth) }}
                />
              ) : (
                <AccountMenu
                  isOpen={isAccountMenuOpen}
                  setIsOpen={setIsAccountMenuOpen}
                  openSignIn={() => {
                    setAuthModalView('signin')
                    setAuthModalOpen(true)
                  }}
                  openSignUp={() => {
                    setAuthModalView('signup')
                    setAuthModalOpen(true)
                  }}
                  textColor={accountTextColor}
                />
              )}
            </div>
          </div>

          {/* Mobile/Tablet Account & Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            {user ? (
              <UserPanel
                userEmail={user.email}
                userDisplayName={user.displayName}
                uid={user.uid}
                onNavigate={onNavigate}
                onSignOut={() => { if (auth) return signOut(auth) }}
              />
            ) : (
              <AccountMenu
                isOpen={isAccountMenuOpen}
                setIsOpen={setIsAccountMenuOpen}
                openSignIn={() => {
                  setAuthModalView('signin')
                  setAuthModalOpen(true)
                }}
                openSignUp={() => {
                  setAuthModalView('signup')
                  setAuthModalOpen(true)
                }}
                textColor={accountTextColor}
              />
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`inline-flex items-center justify-center p-2.5 ${textColor}`}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </nav>

        <MobileMenu
          isOpen={mobileMenuOpen}
          setIsOpen={setMobileMenuOpen}
          onNavigate={onNavigate}
        >
          <NavigationLinks
            navigation={navigation}
            onNavigate={onNavigate}
            textColor="" // Not needed for mobile
            isSticky={false} // Not needed for mobile
            isMobile={true}
            closeMobileMenu={() => setMobileMenuOpen(false)}
          />
        </MobileMenu>
      </header>
    </>
  )
}
