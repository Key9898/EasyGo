import React from 'react'
import { TrendingUp } from 'lucide-react'

interface StatsCardProps {
    title: string
    value: string | number
    icon: React.ElementType
    trend?: string
    trendUp?: boolean
}

export default function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-600">{title}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                            <TrendingUp className={`w-4 h-4 ${!trendUp && 'rotate-180'}`} />
                            <span>{trend}</span>
                        </div>
                    )}
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                    <Icon className="w-8 h-8 text-orange-600" />
                </div>
            </div>
        </div>
    )
}
