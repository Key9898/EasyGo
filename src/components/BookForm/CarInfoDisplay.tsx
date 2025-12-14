interface CarInfoDisplayProps {
    carName: string
    carPrice: number
    carImage?: string
}

export default function CarInfoDisplay({ carName, carPrice, carImage }: CarInfoDisplayProps) {
    return (
        <div className="p-6 bg-orange-50 border-b border-orange-100">
            <div className="flex items-center gap-4">
                {carImage && (
                    <img
                        src={carImage}
                        alt={carName}
                        className="w-24 h-16 object-cover rounded-lg"
                    />
                )}
                <div>
                    <h3 className="font-bold text-lg text-slate-900">{carName}</h3>
                    <p className="text-orange-600 font-semibold">{carPrice.toLocaleString()} THB/day</p>
                </div>
            </div>
        </div>
    )
}
