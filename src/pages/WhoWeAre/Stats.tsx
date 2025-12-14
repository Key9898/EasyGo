import { useEffect, useRef, useState } from 'react'

interface StatItemProps {
    icon: string
    value: number
    suffix?: string
    label: string
}

function StatItem({ icon, value, suffix = '', label }: StatItemProps) {
    const [count, setCount] = useState(0)
    const elementRef = useRef<HTMLDivElement>(null)
    const hasAnimated = useRef(false) // Use ref to track animation state across renders without triggering re-renders

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true

                    // Start animation
                    let start = 0
                    const end = value
                    const duration = 2000
                    const incrementTime = 30 // Update every 30ms for smoother animation
                    const totalSteps = duration / incrementTime
                    const increment = end / totalSteps

                    const timer = setInterval(() => {
                        start += increment
                        if (start >= end) {
                            setCount(end)
                            clearInterval(timer)
                        } else {
                            setCount(Math.floor(start))
                        }
                    }, incrementTime)

                    // Stop observing once animation starts
                    observer.unobserve(element)
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the item is visible
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [value])

    return (
        <div ref={elementRef} className="flex items-start gap-5 border-b border-slate-100 pb-4">
            <div className="text-4xl shrink-0 text-orange-600 mt-1">
                {icon}
            </div>
            <div>
                <dd className="text-4xl font-bold tracking-tight text-slate-900 leading-none">
                    {count.toLocaleString()}{suffix}
                </dd>
                <dt className="text-sm font-medium text-slate-600 mt-1">{label}</dt>
            </div>
        </div>
    )
}

export default function Stats() {
    // TODO: Future Integration - Replace hardcoded stats with real Firestore data
    // 
    // 1. Safe Journeys Completed (500+)
    //    - Query: collection('bookings').where('status', '==', 'completed').count()
    //    - File: src/services/bookingService.ts
    //    - Function: getCompletedBookingsCount()
    //    - Implementation:
    //      export const getCompletedBookingsCount = async (): Promise<number> => {
    //        const snapshot = await getDocs(
    //          query(collection(db, 'bookings'), where('status', '==', 'completed'))
    //        )
    //        return snapshot.size
    //      }
    //
    // 2. Customer Satisfaction Rate (98%)
    //    - Query: collection('reviews').aggregate({ avgRating: average('rating') })
    //    - Calculate: (avgRating / 5) * 100
    //    - File: src/services/reviewService.ts
    //    - Function: getAverageSatisfactionRate()
    //    - Implementation:
    //      export const getAverageSatisfactionRate = async (): Promise<number> => {
    //        const snapshot = await getDocs(collection(db, 'reviews'))
    //        if (snapshot.empty) return 0
    //        const total = snapshot.docs.reduce((sum, doc) => sum + (doc.data().rating || 0), 0)
    //        const avgRating = total / snapshot.size
    //        return Math.round((avgRating / 5) * 100)
    //      }
    //
    // 3. Certified Fleet Condition (20+)
    //    - Query: collection('cars').where('available', '==', true).count()
    //    - File: src/services/fleetService.ts
    //    - Function: getAvailableVehiclesCount()
    //    - Implementation:
    //      export const getAvailableVehiclesCount = async (): Promise<number> => {
    //        const snapshot = await getDocs(
    //          query(collection(db, 'cars'), where('available', '==', true))
    //        )
    //        return snapshot.size
    //      }
    //
    // 4. Corporate Partners Trust Us (10+)
    //    - Query: collection('corporatePartners').where('status', '==', 'active').count()
    //    - File: src/services/corporateService.ts (to be created)
    //    - Function: getActiveCorporatePartnersCount()
    //    - Implementation:
    //      export const getActiveCorporatePartnersCount = async (): Promise<number> => {
    //        const snapshot = await getDocs(
    //          query(collection(db, 'corporatePartners'), where('status', '==', 'active'))
    //        )
    //        return snapshot.size
    //      }
    //
    // Usage Example in this component:
    // const [stats, setStats] = useState({ journeys: 500, satisfaction: 98, fleet: 20, partners: 10 })
    // 
    // useEffect(() => {
    //   const fetchStats = async () => {
    //     try {
    //       const [journeys, satisfaction, fleet, partners] = await Promise.all([
    //         getCompletedBookingsCount(),
    //         getAverageSatisfactionRate(),
    //         getAvailableVehiclesCount(),
    //         getActiveCorporatePartnersCount()
    //       ])
    //       setStats({ journeys, satisfaction, fleet, partners })
    //     } catch (error) {
    //       console.error('Error fetching stats:', error)
    //     }
    //   }
    //   fetchStats()
    // }, [])
    //
    // Then use: <StatItem icon="🚗" value={stats.journeys} suffix="+" label="Safe Journeys Completed" />

    return (
        <div className="mt-8">
            <p className="text-lg font-semibold text-orange-600 mb-6">Our Impact in Numbers</p>
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <StatItem icon="🚗" value={1000} suffix="+" label="Safe Journeys Completed" />
                <StatItem icon="⭐" value={98} suffix="%" label="Customer Satisfaction Rate" />
                <StatItem icon="🛡️" value={100} suffix="+" label="Certified Fleet Condition" />
                <StatItem icon="🏢" value={10} suffix="+" label="Corporate Partners Trust Us" />
            </dl>
        </div>
    )
}
