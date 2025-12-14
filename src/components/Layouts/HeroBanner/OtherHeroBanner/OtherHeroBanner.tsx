import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'
import type { OtherHeroBannerProps } from '../../../../types'
import HeroContactList from './HeroContactList'
import { otherHeroBannerBgUrlMap } from '../../../../data/constants'

export default function OtherHeroBanner({
  onPrimaryAction,
  title,
  description,
  buttonText,
  backgroundImgAlt,
  variant,
  preTitleSlot,
  scrollTargetId
}: OtherHeroBannerProps) {

  const effectiveTitle = title ?? 'Your Journey Starts Here'
  const effectiveDescription =
    description ??
    "EasyGo is more than just transportation. It's a service designed to make your travels seamless, comfortable, and reliable. See what makes your journey special."
  const effectiveButton = buttonText ?? 'Explore Services'

  const bgUrl = variant ? (otherHeroBannerBgUrlMap[variant] || otherHeroBannerBgUrlMap.home) : otherHeroBannerBgUrlMap.home

  const sectionRef = useRef<HTMLElement | null>(null)

  const animateScrollTo = (top: number, duration = 1200) => {
    const start = window.scrollY
    const change = top - start
    const startTime = performance.now()

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOutCubic(progress)
      window.scrollTo(0, start + change * eased)

      if (progress < 1) {
        requestAnimationFrame(scroll)
      }
    }

    requestAnimationFrame(scroll)
  }

  const handlePrimaryClick = () => {
    if (scrollTargetId) {
      const target = document.getElementById(scrollTargetId)
      if (!target) return

      const header = document.querySelector('header')
      const offset = header?.offsetHeight ?? 0
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 8
      animateScrollTo(top)
      return
    }
    if (onPrimaryAction) {
      onPrimaryAction()
    }
  }

  return (
    <section
      aria-label={backgroundImgAlt ?? effectiveTitle}
      className="relative isolate bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${bgUrl}')`,
      }}
      ref={sectionRef}
    >
      <img
        src={bgUrl}
        alt={backgroundImgAlt ?? effectiveTitle}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        aria-hidden
        className="hidden"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          {preTitleSlot && (
            <div className="mb-6 sm:mb-8 lg:mb-12">
              {preTitleSlot}
            </div>
          )}
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {effectiveTitle}
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-2xl">
            {effectiveDescription}
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={handlePrimaryClick}
              className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-500"
            >
              {effectiveButton}
              <ChevronDownIcon aria-hidden="true" className="mt-2 ml-2 size-6 animate-bounce" />
            </button>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-white/20" />

        <HeroContactList />
      </div>
    </section>
  )
}
