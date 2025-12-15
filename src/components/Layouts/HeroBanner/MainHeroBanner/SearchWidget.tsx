import { MdLocationOn, MdCalendarToday } from 'react-icons/md'
import { FaCar } from 'react-icons/fa'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../../../firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import type { SearchData } from '../../../../types'
import { locations, carTypes } from '../../../../data/constants'

interface SearchWidgetProps {
    initialValues?: {
        location?: string
        pickupDate?: string
        returnDate?: string
        carType?: string
    }
    onNavigate?: (page: string, params?: Record<string, string>) => void
}

export default function SearchWidget({ initialValues, onNavigate }: SearchWidgetProps) {
    const navigate = useNavigate()
    const [searchData, setSearchData] = useState<SearchData>({
        location: '',
        pickupDate: '',
        returnDate: '',
        carType: 'All Types',
    })

    // Update state when initialValues change
    useEffect(() => {
        if (initialValues) {
            setSearchData(prev => ({
                ...prev,
                location: initialValues.location || '',
                pickupDate: initialValues.pickupDate || '',
                returnDate: initialValues.returnDate || '',
                carType: initialValues.carType || 'All Types',
            }))
        }
    }, [initialValues])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()

        console.log('🔍 Search initiated with data:', searchData)

        // Validation
        if (!searchData.location || !searchData.pickupDate || !searchData.returnDate) {
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'error',
                    title: 'Missing Information',
                    message: 'Please fill in all required fields: location, pick-up date, and return date.'
                }
            }))
            return
        }

        // Date validation
        const pickup = new Date(searchData.pickupDate)
        const returnDate = new Date(searchData.returnDate)

        if (returnDate <= pickup) {
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'error',
                    title: 'Invalid Dates',
                    message: 'Return date must be after pick-up date.'
                }
            }))
            return
        }

        // Show success notification
        window.dispatchEvent(new CustomEvent('app:notify', {
            detail: {
                type: 'success',
                title: 'Search Started',
                message: `Finding vehicles in ${searchData.location}...`
            }
        }))

        // Save search to Firestore
        try {
            if (db) {
                addDoc(collection(db, 'searches'), {
                    ...searchData,
                    userId: auth?.currentUser?.uid || 'guest',
                    createdAt: serverTimestamp(),
                    device: navigator.userAgent
                })
            }
        } catch (error) {
            console.error("Error saving search history:", error)
        }

        // Navigate to Fleet page with search parameters
        const params = new URLSearchParams()
        params.set('location', searchData.location)
        params.set('pickupDate', searchData.pickupDate)
        params.set('returnDate', searchData.returnDate)

        // Only add carType if it's not "All Types"
        if (searchData.carType !== 'All Types') {
            params.set('carType', searchData.carType)
        }

        console.log('✅ Navigating to:', `/fleet?${params.toString()}`)
        navigate(`/fleet?${params.toString()}`)

        if (onNavigate) {
            const paramsObj: Record<string, string> = {
                location: searchData.location,
                pickupDate: searchData.pickupDate,
                returnDate: searchData.returnDate,
            }

            // Only add carType if it's not "All Types"
            if (searchData.carType !== 'All Types') {
                paramsObj.carType = searchData.carType
            }

            onNavigate('fleet', paramsObj)
        }
    }

    return (
        <div className="mt-10">
            <form onSubmit={handleSearch} className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Location */}
                    <div className="lg:col-span-1">
                        <label htmlFor="location" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                            <MdLocationOn className="size-5 text-orange-500" />
                            Pick-up Location
                        </label>
                        <div className="relative">
                            <select
                                id="location"
                                value={searchData.location}
                                onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                                className="w-full appearance-none rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
                            >
                                <option value="" className="bg-slate-800">Select District</option>
                                {locations.map((loc) => (
                                    <option key={loc} value={loc} className="bg-slate-800">{loc}</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-white pointer-events-none" />
                        </div>
                    </div>

                    {/* Pick-up Date */}
                    <div className="lg:col-span-1">
                        <label htmlFor="pickupDate" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                            <MdCalendarToday className="size-5 text-orange-500" />
                            Pick-up Date
                        </label>
                        <input
                            type="date"
                            id="pickupDate"
                            min={new Date().toISOString().split('T')[0]}
                            value={searchData.pickupDate}
                            onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                            className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent [color-scheme:dark]"
                        />
                    </div>

                    {/* Return Date */}
                    <div className="lg:col-span-1">
                        <label htmlFor="returnDate" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                            <MdCalendarToday className="size-5 text-orange-500" />
                            Return Date
                        </label>
                        <input
                            type="date"
                            id="returnDate"
                            min={searchData.pickupDate || new Date().toISOString().split('T')[0]}
                            value={searchData.returnDate}
                            onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                            className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent [color-scheme:dark]"
                        />
                    </div>

                    {/* Car Type */}
                    <div className="lg:col-span-1">
                        <label htmlFor="carType" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                            <FaCar className="size-5 text-orange-500" />
                            Car Type
                        </label>
                        <div className="relative">
                            <select
                                id="carType"
                                value={searchData.carType}
                                onChange={(e) => setSearchData({ ...searchData, carType: e.target.value })}
                                className="w-full appearance-none rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
                            >
                                {carTypes.map((type) => (
                                    <option key={type} value={type} className="bg-slate-800">{type}</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-white pointer-events-none" />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="lg:col-span-1 flex items-end">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center gap-2"
                        >
                            🔍 Find Car
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
