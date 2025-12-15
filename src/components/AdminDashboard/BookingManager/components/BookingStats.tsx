import { Calendar, Clock, CheckCircle, CheckCheck, XCircle } from 'lucide-react'
import type { Booking } from '../../../../types'

interface BookingStatsProps {
    bookings: Booking[]
}

export default function BookingStats({ bookings }: BookingStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Total Bookings</p>
                        <p className="text-2xl font-bold text-slate-900">{bookings.length}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Pending</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {bookings.filter(b => b.status === 'pending').length}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Confirmed</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {bookings.filter(b => b.status === 'confirmed').length}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <CheckCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Completed</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {bookings.filter(b => b.status === 'completed').length}
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Cancelled</p>
                        <p className="text-2xl font-bold text-slate-900">
                            {bookings.filter(b => b.status === 'cancelled').length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
