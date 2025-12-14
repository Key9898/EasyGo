export default function Segments() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-orange-600">Segments</h2>
      <p className="mt-2 text-slate-700">Diverse premium vehicles tailored to fit your specific lifestyle.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        <div className="rounded-lg border border-slate-200 p-4 flex flex-col h-full">
          <h3 className="font-semibold text-xl text-orange-600">Budget Saver</h3>
          <ul>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Yaris</span></li>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Suzuki Swift</span></li>
            <li className="mt-2 mb-2 text-base font-semibold text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Or similar</span></li>
          </ul>
          <p className="mt-auto text-base text-slate-700 border-t border-slate-200 pt-2">Starting 19,900 THB/mo</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 flex flex-col h-full">
          <h3 className="font-semibold text-xl text-orange-600">Family Comfort</h3>
          <ul>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Mitsubishi Xpander</span></li>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Veloz</span></li>
            <li className="mt-2 text-base font-semibold text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Or similar</span></li>
          </ul>
          <p className="mt-auto text-base text-slate-700 border-t border-slate-200 pt-2">Starting 34,500 THB/mo</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 flex flex-col h-full">
          <h3 className="font-semibold text-xl text-orange-600">Adventure & Utility</h3>
          <ul>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Ford Ranger</span></li>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Fortuner</span></li>
            <li className="mt-2 text-base font-semibold text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Or similar</span></li>
          </ul>
          <p className="mt-auto text-base text-slate-700 border-t border-slate-200 pt-2">Starting 39,900 THB/mo</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 flex flex-col h-full">
          <h3 className="font-semibold text-xl text-orange-600">Executive Class</h3>
          <ul>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Camry</span></li>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Alphard</span></li>
            <li className="mt-2 text-base font-semibold text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Or similar</span></li>
          </ul>
          <p className="mt-auto text-base text-slate-700 border-t border-slate-200 pt-2">Starting 49,000 THB/mo</p>
        </div>
      </div>
    </section>
  )
}
