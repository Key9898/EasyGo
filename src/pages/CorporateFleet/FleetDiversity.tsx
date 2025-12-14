export default function FleetDiversity() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-2xl font-bold text-orange-600">Fleet Diversity</h2>
      <p className="mt-2 text-slate-700">Comprehensive vehicle solutions tailored for your business needs.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        <div className="rounded-lg border border-slate-200 p-4 flex flex-col h-full">
          <h3 className="font-semibold text-xl text-orange-600">General Pool</h3>
          <p className="mt-2 inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-orange-400 font-semibold w-fit">Everyday Mobility</p>
          <ul>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Yaris</span></li>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Honda City</span></li>
            <li className="mt-2 mb-2 text-base font-semibold text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Or similar</span></li>
          </ul>
          <p className="mt-auto text-base text-slate-700 border-t border-slate-200 pt-2">Starting 21,000 THB/mo</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 flex flex-col h-full">
          <h3 className="font-semibold text-xl text-orange-600">Operation & Utility</h3>
          <p className="mt-2 inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-orange-400 font-semibold w-fit">Site & Field Work</p>
          <ul>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Hilux Revo</span></li>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Fortuner</span></li>
            <li className="mt-2 mb-2 text-base font-semibold text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Or similar</span></li>
          </ul>
          <p className="mt-auto text-base text-slate-700 border-t border-slate-200 pt-2">Starting 29,900 THB/mo</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 flex flex-col h-full">
          <h3 className="font-semibold text-xl text-orange-600">Executive Class</h3>
          <p className="mt-2 inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-orange-400 font-semibold w-fit">Management & VIP</p>
          <ul>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Camry</span></li>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Alphard</span></li>
            <li className="mt-2 mb-2 text-base font-semibold text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Or similar</span></li>
          </ul>
          <p className="mt-auto text-base text-slate-700 border-t border-slate-200 pt-2">Starting 45,000 THB/mo</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-4 flex flex-col h-full">
          <h3 className="font-semibold text-xl text-orange-600">Staff Transport</h3>
          <p className="mt-2 inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-orange-400 font-semibold w-fit">Shuttle Services</p>
          <ul>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Toyota Commuter</span></li>
            <li className="mt-2 text-base text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Hyundai Staria</span></li>
            <li className="mt-2 mb-2 text-base font-semibold text-slate-700 flex items-center gap-2"><span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-orange-600"></span><span>Or similar</span></li>
          </ul>
          <p className="mt-auto text-base text-slate-700 border-t border-slate-200 pt-2">Starting 55,000 THB/mo</p>
        </div>
      </div>
    </section>
  )
}
