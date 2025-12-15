import { useEffect, useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import Header from '../../components/Layouts/Common/Header'
import MainHeroBanner from '../../components/Layouts/HeroBanner/MainHeroBanner/MainHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import BookForm from '../../components/BookForm/BookForm'
import FleetHeader from './FleetHeader'
import FleetPagination from './FleetPagination'
import VehicleCard from './VehicleCard'
import ActiveFilters from './ActiveFilters'
import EmptyState from './EmptyState'
import CarLoader from '../../components/Layouts/Common/CarLoader'
import type { FleetProps, Vehicle, SearchParams } from '../../types'


const vehiclesPerPage = 6
const breadcrumbPages = [
    { name: 'Fleet', href: '#fleet', current: true },
]

export default function Fleet({ onNavigate }: FleetProps) {
    const location = useLocation()
    const [sortBy, setSortBy] = useState('latest')
    const [currentPage, setCurrentPage] = useState(1)
    const [searchParams, setSearchParams] = useState<SearchParams>({})

    const [bookingModal, setBookingModal] = useState<{
        isOpen: boolean
        car: Vehicle | null
    }>({ isOpen: false, car: null })

    // ✅ Cached Data Fetching: Vehicles
    const { data: firestoreVehicles = [], isLoading: loadingVehicles } = useQuery({
        queryKey: ['vehicles'], // Cache key
        queryFn: async () => {
            if (!db) return []
            const querySnapshot = await getDocs(collection(db, 'cars'))
            return querySnapshot.docs.map(doc => {
                const data = doc.data()
                return {
                    id: doc.id,
                    name: data.name,
                    category: data.category === 'Luxury' ? 'MVP' : data.category,
                    description: data.description,
                    imageUrl: data.imageUrl,
                    price: `${data.price.toLocaleString()} THB/day`,
                    priceValue: Number(data.price),
                    features: data.features || [],
                    year: typeof data.year === 'number' ? data.year : (typeof data.year === 'string' ? Number(data.year) : undefined),
                    status: data.status || 'available'
                } as Vehicle
            })
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 mins
    })

    // ✅ Cached Data Fetching: Reviews
    const { data: reviewStatsByCar = {} } = useQuery({
        queryKey: ['reviewStats'],
        queryFn: async () => {
            if (!db) return {}
            const snaps = await getDocs(collection(db, 'reviews'))
            const agg: Record<string, { sum: number; count: number }> = {}
            snaps.docs.forEach(d => {
                const data = d.data() as { carName?: string; rating?: number }
                const name = data.carName || ''
                const rating = Number(data.rating) || 0
                if (!name || rating <= 0) return
                const cur = agg[name] || { sum: 0, count: 0 }
                agg[name] = { sum: cur.sum + rating, count: cur.count + 1 }
            })
            const stats: Record<string, { avg: number; count: number }> = {}
            Object.keys(agg).forEach((k) => {
                const a = agg[k]
                stats[k] = { avg: Number((a.sum / a.count).toFixed(1)), count: a.count }
            })
            return stats
        },
        staleTime: 1000 * 60 * 10, // Cache for 10 mins
    })



    // Combine static and firestore vehicles (Now only Firestore)
    const allVehicles = useMemo(() => {
        return firestoreVehicles
    }, [firestoreVehicles])

    // Read URL parameters on mount and when URL changes
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const locationParam = params.get('location')
        const pickupDate = params.get('pickupDate')
        const returnDate = params.get('returnDate')
        const carType = params.get('carType')

        const newParams: SearchParams = {
            location: locationParam || undefined,
            pickupDate: pickupDate || undefined,
            returnDate: returnDate || undefined,
            carType: carType || undefined,
        }

        setSearchParams(newParams)

        if (locationParam || pickupDate || returnDate || carType) {
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: {
                    type: 'info',
                    title: 'Search Applied',
                    message: `Showing vehicles${carType ? ` for ${carType}` : ''}${locationParam ? ` in ${locationParam}` : ''}`
                }
            }))
        }
    }, [location.search])

    // Filter and sort vehicles
    const filteredAndSortedVehicles = useMemo(() => {
        let result = [...allVehicles]

        // Filter by car type if specified
        if (searchParams.carType && searchParams.carType.toLowerCase() !== 'all types') {
            const targetType = searchParams.carType.toLowerCase().trim()
            result = result.filter(v => {
                const carCat = (v.category || '').toLowerCase().trim()
                return carCat === targetType
            })
        }

        // Sort
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.priceValue - b.priceValue)
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.priceValue - a.priceValue)
        }

        return result
    }, [searchParams, sortBy, allVehicles])

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedVehicles.length / vehiclesPerPage)
    const paginatedVehicles = useMemo(() => {
        const startIndex = (currentPage - 1) * vehiclesPerPage
        return filteredAndSortedVehicles.slice(startIndex, startIndex + vehiclesPerPage)
    }, [filteredAndSortedVehicles, currentPage])

    // Reset to page 1 when filters or sort changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchParams, sortBy])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        const fleetContent = document.getElementById('fleet-content')
        if (fleetContent) {
            const header = document.querySelector('header') as HTMLElement | null
            const offset = header?.offsetHeight ?? 0
            window.scrollTo({
                top: fleetContent.getBoundingClientRect().top + window.scrollY - offset - 20,
                behavior: 'smooth'
            })
        }
    }

    const handleClearFilters = () => {
        setSearchParams({})
        window.history.pushState({}, '', window.location.pathname)
    }

    const handleBookClick = (vehicle: Vehicle) => {
        setBookingModal({ isOpen: true, car: vehicle })
    }

    return (
        <>
            <Header onNavigate={onNavigate} />

            <MainHeroBanner
                title="Our Premium Certified Fleet"
                description="Discover our diverse selection of certified, high-quality vehicles. From efficient city cars to spacious family SUVs, we offer the perfect ride for every unique journey."
                buttonText="Explore Vehicles"
                variant="fleet"
                preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} />}
                scrollTargetId="fleet-content"
                onNavigate={onNavigate}
                initialValues={searchParams}
            />

            <main id="fleet-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FleetHeader
                        totalVehicles={filteredAndSortedVehicles.length}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />

                    <ActiveFilters
                        searchParams={searchParams}
                        onClearFilters={handleClearFilters}
                    />

                    {loadingVehicles ? (
                        <CarLoader />
                    ) : paginatedVehicles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {paginatedVehicles.map((vehicle) => (
                                <VehicleCard
                                    key={vehicle.id}
                                    vehicle={vehicle}
                                    isBooked={vehicle.status !== 'available'}
                                    ratingAvg={reviewStatsByCar[vehicle.name]?.avg}
                                    ratingCount={reviewStatsByCar[vehicle.name]?.count}
                                    onBookClick={handleBookClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState onClearFilters={handleClearFilters} />
                    )}

                    {filteredAndSortedVehicles.length > vehiclesPerPage && (
                        <div className="mt-8">
                            <FleetPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                totalPosts={filteredAndSortedVehicles.length}
                                postsPerPage={vehiclesPerPage}
                            />
                        </div>
                    )}
                </div>
            </main>

            {bookingModal.car && (
                <BookForm
                    isOpen={bookingModal.isOpen}
                    onClose={() => setBookingModal({ isOpen: false, car: null })}
                    carName={bookingModal.car.name}
                    carPrice={bookingModal.car.priceValue}
                    carImage={bookingModal.car.imageUrl}
                />
            )}

            <Footer />
            <ScrollToTopButton />
        </>
    )
}
