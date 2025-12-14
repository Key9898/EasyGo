
export default function HygieneAndCleanliness() {
  return (
    <div className="p-8 sm:p-10 lg:p-12">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-orange-600">Hygiene & Cleanliness</h2>
            <p className="mt-4 text-lg text-slate-500">
              We maintain hotel‑grade hygiene for every new renter. Our deep cleaning and sanitization process covers full interior vacuuming, high‑touch surface disinfection, and odor neutralization. Before handover, staff confirm sanitization records and air quality so the cabin feels safe, fresh, and truly clean.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-slate-100">
            <img
              alt="Professional car interior cleaning and sanitization"
              src="/Certified/hygiene_cleaning.png"
              className="aspect-video w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
