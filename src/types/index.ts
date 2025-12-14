import type { ReactNode } from 'react'

// Component Props Interfaces
export interface MainHeroBannerProps {
    onPrimaryAction?: () => void
    onNavigate?: (page: string, params?: Record<string, string>) => void
    title?: string
    description?: string
    buttonText?: string
    backgroundImgAlt?: string
    backgroundImgClass?: string
    variant?: string
    preTitleSlot?: ReactNode
    scrollTargetId?: string
    initialValues?: {
        location?: string
        pickupDate?: string
        returnDate?: string
        carType?: string
    }
}

export interface CertifiedHeroBannerProps {
    onPrimaryAction?: () => void
    onNavigate?: (page: string, params?: Record<string, string>) => void
    title?: string
    description?: string
    buttonText?: string
    backgroundImgAlt?: string
    backgroundImgClass?: string
    variant?: string
    preTitleSlot?: ReactNode
    scrollTargetId?: string
}

export interface FleetHeaderProps {
    totalVehicles: number
    sortBy: string
    onSortChange: (sort: string) => void
}

export interface FleetProps {
    onNavigate?: (page: string, params?: Record<string, string>) => void
}

export interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    totalPosts: number
    postsPerPage: number
}

export interface BookFormProps {
    isOpen: boolean
    onClose: () => void
    carName: string
    carPrice: number
    carImage: string
}

export interface BreadcrumbProps {
    pages: BreadcrumbPage[]
    onNavigate?: (page: string) => void
    variant?: 'light' | 'dark'
}

export interface UserPanelProps {
    onNavigate?: (page: string) => void
}

export interface HeaderProps {
    onNavigate?: (page: string) => void
}

export interface CertifiedProps {
    onNavigate?: (page: string) => void
}

export interface SubscriptionProps {
    onNavigate?: (page: string) => void
}

export interface GuideProps {
    onNavigate?: (page: string) => void
}

export interface IntroAnimationProps {
    onComplete?: () => void
}

export interface HeroSectionProps {
    title: string
    description: string
    buttonText?: string
    onButtonClick?: () => void
}

export interface OtherHeroBannerProps {
    onPrimaryAction?: () => void
    title?: string
    description?: string
    buttonText?: string
    backgroundImgAlt?: string
    backgroundImgClass?: string
    variant?: string
    preTitleSlot?: ReactNode
    scrollTargetId?: string
    contactItems?: ContactItem[]
}

export interface AdminLayoutProps {
    children: ReactNode
}

export interface AdminRouteProps {
    children: ReactNode
}

export interface SignUpProps {
    onClose: () => void
    onSwitchToSignIn: () => void
}

export interface StatsCardProps {
    title: string
    value: string | number
    icon: ReactNode
    trend?: string
}

// Data Model Interfaces
export interface Vehicle {
    id: string | number
    name: string
    category: string
    description: string
    imageUrl: string
    price: string
    priceValue: number
    features: string[]
    year?: number
    status?: string
}

export interface Car {
    id: string
    name: string
    category: string
    description: string
    imageUrl: string
    price: number
    features: string[]
    available?: boolean
    status?: string
    year?: number
    createdAt?: any
    updatedAt?: any
}

export interface Booking {
    id: string
    carName: string
    customerName: string
    customerEmail: string
    customerPhone?: string
    pickupLocation: string
    pickupDate: string
    returnDate: string
    totalPrice: number
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    createdAt: any
    userId?: string
}

export interface Inquiry {
    id: string
    name: string
    email: string
    phone?: string
    message: string
    carInterest?: string
    status: 'new' | 'contacted' | 'resolved'
    createdAt: any
}

export interface Notification {
    id: string
    type: 'booking' | 'inquiry' | 'system'
    title: string
    message: string
    read: boolean
    createdAt: any
}

export interface CorporateRequest {
    id: string
    companyName: string
    contactName: string
    email: string
    phone?: string
    fleetSize: number
    segment?: string
    monthlyRate?: number
    note?: string
    status: 'pending' | 'contacted' | 'approved' | 'rejected'
    createdAt: any
    userId?: string
}

export interface BreadcrumbPage {
    name: string
    href: string
    current: boolean
}

export interface ContactItem {
    icon: React.ElementType
    label: string
    value: string
    href?: string
}

// Search & Filter Interfaces
export interface SearchParams {
    location?: string
    pickupDate?: string
    returnDate?: string
    carType?: string
}

export interface SearchData {
    location: string
    pickupDate: string
    returnDate: string
    carType: string
}

// Sort Options Interface
export interface SortOption {
    value: string
    label: string
}

export interface SubscriptionRequest {
    id: string
    planMonths: '12' | '6' | '1'
    planLabel: string
    fullName: string
    phone: string
    lineId?: string
    desiredStartDate: string
    status: 'pending' | 'contacted' | 'confirmed' | 'cancelled'
    createdAt?: any
    userId?: string
}
