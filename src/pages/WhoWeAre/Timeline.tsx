import { useState } from 'react'
import { timelineData } from "../../data/timelineData"
import TimelineItem from "./TimelineItem"

const Timeline = () => {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)

  const years = [2024, 2025, 2026]
  const filteredData = timelineData.filter(item => item.year === selectedYear)

  if (timelineData.length === 0) return null

  return (
    <div className="border-2 border-slate-200 rounded-2xl p-8 sm:p-12 lg:p-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tight text-orange-600">Our Journey</h2>
        <p className="mt-2 text-lg text-slate-600">From humble beginnings to regional leader</p>
      </div>

      {/* Year Filter */}
      <div className="flex justify-end mb-8">
        <div className="inline-flex rounded-lg border-2 border-slate-200 p-1 bg-slate-50">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${selectedYear === year
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-100'
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      {
        filteredData.length > 0 ? (
          <div className="relative flex flex-col after:absolute after:left-[calc(50%_-_2px)] after:h-full after:w-1 after:content-normal after:bg-orange-300">
            {filteredData.map((data, idx) => (
              <TimelineItem data={data} key={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No milestones for this year yet.</p>
          </div>
        )
      }

      {/* Coming Soon Message for 2026 */}
      {
        selectedYear === 2026 && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl px-6 py-4">
              <p className="text-orange-800 font-semibold">🚀 Exciting plans ahead! Stay tuned for updates.</p>
            </div>
          </div>
        )
      }
    </div >

  )
}

export default Timeline
