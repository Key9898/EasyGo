import { Squares2X2Icon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState, useRef, useEffect } from 'react'
import type { FleetHeaderProps } from '../../types'
import { sortOptions } from '../../data/constants'

export default function FleetHeader({
    totalVehicles,
    sortBy,
    onSortChange,
}: FleetHeaderProps) {
    const [isSortOpen, setIsSortOpen] = useState(false)
    const sortRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSortSelect = (value: string) => {
        onSortChange(value)
        setIsSortOpen(false)
    }

    return (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            {/* Left: Title */}
            <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">
                    Available Vehicles
                    <span className="block text-sm font-normal text-slate-500 sm:inline sm:ml-2 sm:text-base lg:text-xl">
                        ({totalVehicles} {totalVehicles === 1 ? 'vehicle' : 'vehicles'})
                    </span>
                </h2>
            </div>

            {/* Right: Sort & Grid Icon */}
            <div className="flex items-center gap-2 sm:gap-6">
                {/* Custom Sort Dropdown */}
                <div className="relative" ref={sortRef}>
                    <button
                        type="button"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-1 text-base font-medium text-slate-700 hover:text-slate-900 focus:outline-none"
                    >
                        Sort
                        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isSortOpen && (
                        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-orange-200 ring-opacity-5 focus:outline-none z-10">
                            <div className="p-1">
                                {sortOptions.map((option) => (
                                    <button
                                        type="button"
                                        key={option.value}
                                        onClick={() => handleSortSelect(option.value)}
                                        className={`block w-full px-4 py-2 text-left text-base rounded-lg ${sortBy === option.value
                                            ? 'bg-orange-50 text-orange-600 font-medium'
                                            : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Grid Icon (Static) */}
                <div className="text-slate-400">
                    <Squares2X2Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    )
}
