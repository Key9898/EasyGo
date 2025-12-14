
export default function FleetMaintenance() {
  return (
    <div className="p-8 sm:p-10 lg:p-12">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-orange-600">Fleet Maintenance</h2>
            <p className="mt-4 text-lg text-slate-500">
              We only release vehicles that meet manufacturer‑specified maintenance schedules. Each unit is checked for the most recent service date and mileage against factory intervals, with critical systems inspected. This proactive approach ensures consistent reliability, fewer breakdowns, and a smoother experience throughout your trip.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-xl bg-slate-100 lg:order-first">
            <img
              alt="Mechanic working on car fleet maintenance"
              src="/Certified/fleet_maintenance.png"
              className="aspect-video w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
