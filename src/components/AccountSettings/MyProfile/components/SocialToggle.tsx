import { useState, useEffect } from 'react'

export default function SocialToggle() {
    const [enabled, setEnabled] = useState<boolean>(() => {
        const v = typeof window !== 'undefined' ? localStorage.getItem('app:social:enabled') : null
        return v === null ? true : v === 'true'
    })

    useEffect(() => {
        const v = localStorage.getItem('app:social:enabled')
        if (v !== null) setEnabled(v === 'true')
    }, [])

    const toggle = () => {
        const next = !enabled
        setEnabled(next)
        localStorage.setItem('app:social:enabled', String(next))
        window.dispatchEvent(new CustomEvent('app:social:change', { detail: { enabled: next } }))
    }

    return (
        <label className="inline-flex items-center cursor-pointer" aria-label="Toggle social media visibility">
            <input type="checkbox" checked={enabled} onChange={toggle} className="sr-only" />
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-orange-600' : 'bg-slate-300'}`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                <span className="sr-only">Toggle social media</span>
            </div>
        </label>
    )
}
