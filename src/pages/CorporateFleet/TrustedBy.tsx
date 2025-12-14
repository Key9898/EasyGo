import { useEffect, useMemo, useState } from 'react'

type CompanyLogo = { name: string; logo: string }

const companies: CompanyLogo[] = [
  { name: 'PTT', logo: '/CorporateTrustedByLogo/ptt.png' },
  { name: 'CP ALL', logo: '/CorporateTrustedByLogo/cpall.png' },
  { name: 'SCG', logo: '/CorporateTrustedByLogo/scg.png' },
  { name: 'AOT', logo: '/CorporateTrustedByLogo/aot.png' },
  { name: 'AIS', logo: '/CorporateTrustedByLogo/ais.png' },
  { name: 'KBank', logo: '/CorporateTrustedByLogo/kbank.png' },
  { name: 'CPF', logo: '/CorporateTrustedByLogo/cpf.png' },
  { name: 'CRC', logo: '/CorporateTrustedByLogo/crc.png' },
  { name: 'BDMS', logo: '/CorporateTrustedByLogo/bdms.png' },
  { name: 'GULF', logo: '/CorporateTrustedByLogo/gulf.png' },
  { name: 'ThaiBev', logo: '/CorporateTrustedByLogo/thaibev.png' },
  { name: 'SCBX', logo: '/CorporateTrustedByLogo/scbx.png' },
]

export default function TrustedBy() {
  const [perView, setPerView] = useState(6)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      if (w >= 1024) setPerView(6)
      else if (w >= 640) setPerView(4)
      else setPerView(3)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const totalPages = useMemo(() => Math.ceil(companies.length / perView), [perView])
  const safePage = Math.min(page, Math.max(0, totalPages - 1))
  const visible = companies.slice(safePage * perView, safePage * perView + perView)

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-orange-600">Trusted By</h2>
      <p className="mt-2 text-slate-700">Reliable fleet management for leading enterprises across Thailand.</p>

      <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        {visible.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setPage((safePage + 1) % totalPages)}
            className="h-32 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center cursor-pointer overflow-hidden transition-transform hover:scale-105"
            aria-label={`Next logos (clicked ${c.name})`}
          >
            <img
              src={c.logo}
              alt={`${c.name} logo`}
              loading="lazy"
              className="max-h-24 w-auto object-contain"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const el = e.currentTarget
                el.style.display = 'none'
                el.parentElement!.innerHTML = `<span class="text-slate-500 text-sm font-medium">${c.name}</span>`
              }}
            />
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to page ${i + 1}`}
            onClick={() => setPage(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${safePage === i ? 'bg-orange-600' : 'bg-slate-300 hover:bg-slate-400'}`}
          />
        ))}
      </div>
    </section>
  )
}
