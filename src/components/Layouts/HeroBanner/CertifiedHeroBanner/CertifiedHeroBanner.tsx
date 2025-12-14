import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'
import { backgroundImageMap } from '../../../../data/constants'
import type { CertifiedHeroBannerProps } from '../../../../types'
import TermWidget from './TermWidget'

export default function CertifiedHeroBanner({
    onPrimaryAction,
    title,
    description,
    buttonText,
    backgroundImgAlt,
    backgroundImgClass,
    variant,
    preTitleSlot,
    scrollTargetId,
}: CertifiedHeroBannerProps) {
    const effectiveTitle = title ?? 'EasyGo Certified Vehicles'
    const effectiveDescription =
        description ??
        "Drive with confidence. Every vehicle in our certified fleet undergoes rigorous inspection and maintenance to ensure your safety and comfort."
    const effectiveButton = buttonText ?? 'View Certified Fleet'
    const effectiveBgClass = backgroundImgClass ?? (variant ? backgroundImageMap[variant] : undefined) ?? backgroundImageMap.certified ?? backgroundImageMap.home
    const bgUrlMatch = (effectiveBgClass || '').match(/url\(['"]([^'"]+)['"]\)/)
    const bgUrl = bgUrlMatch ? bgUrlMatch[1] : ''

    const sectionRef = useRef<HTMLElement | null>(null)

    const animateScrollTo = (top: number, duration = 1200) => {
        const start = window.scrollY
        const change = top - start
        const startTime = performance.now()
        const step = (now: number) => {
            const elapsed = now - startTime
            const t = Math.min(elapsed / duration, 1)
            const eased = t * t * t
            window.scrollTo({ top: start + change * eased, behavior: 'auto' })
            if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }

    const handlePrimaryAction = () => {
        let target: HTMLElement | null = null
        if (scrollTargetId) target = document.getElementById(scrollTargetId)
        if (!target && sectionRef.current?.nextElementSibling) {
            target = sectionRef.current.nextElementSibling as HTMLElement
        }
        if (target) {
            const header = document.querySelector('header') as HTMLElement | null
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
            className={`relative isolate bg-cover bg-center bg-no-repeat ${effectiveBgClass}`}
            ref={sectionRef}
        >
            {bgUrl && (
                <img
                    src={bgUrl}
                    alt={backgroundImgAlt ?? effectiveTitle}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    aria-hidden
                    className="hidden"
                />
            )}
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
                            onClick={handlePrimaryAction}
                            className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-500"
                        >
                            {effectiveButton}
                            <ChevronDownIcon aria-hidden="true" className="mt-2 ml-2 size-6 animate-bounce" />
                        </button>
                    </div>
                </div>

                <div className="mt-10 h-px w-full bg-white/20" />

                {/* Certified Widget */}
                <TermWidget />
            </div>
        </section>
    )
}
