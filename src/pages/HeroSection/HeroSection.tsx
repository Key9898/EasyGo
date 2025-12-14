import Header from '../../components/Layouts/Common/Header'

interface HeroSectionProps {
  onNavigate?: (page: string) => void
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header onNavigate={onNavigate} />
      <div
        className="flex-1 overflow-hidden bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/HeroBanner/main.png')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative isolate h-full flex items-center justify-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <div className="mx-auto max-w-2xl">
              <div className="hidden sm:mb-6 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-base text-slate-200 ring-1 ring-white/30 hover:ring-white/50 bg-black/20 backdrop-blur-sm">
                  New to EasyGo? Get 10% off your first rental today!{' '}
                  <span aria-hidden="true" className="text-orange-400 font-bold">&rarr;</span>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl xl:text-6xl drop-shadow-md">
                  Travel Made Easy with EasyGo
                </h1>
                <p className="mt-4 sm:mt-6 text-lg font-medium text-pretty text-slate-100 sm:text-base lg:text-lg drop-shadow-sm">
                  Your trusted partner for seamless transportation. Experience transparent pricing, pristine condition, and travel with confidence.
                </p>
                <div className="mt-6 sm:mt-8 flex items-center justify-center gap-x-4 sm:gap-x-6">
                  <button
                    type="button"
                    onClick={() => onNavigate?.('fleet')}
                    className="rounded-lg bg-orange-600 px-3 py-2 sm:px-3.5 sm:py-2.5 text-sm sm:text-base font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Browse Fleet
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate?.('certified')}
                    className="rounded-lg bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-3.5 sm:py-2.5 text-sm sm:text-base font-semibold text-slate-900 shadow-xs hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Our Guarantee
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
