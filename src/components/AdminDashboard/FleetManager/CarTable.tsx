import { Edit2, Trash2 } from 'lucide-react'
import type { Car } from '../../../types'

interface CarTableProps {
    cars: Car[]
    onEdit: (car: Car) => void
    onDelete: (carId: string) => void
}

export default function CarTable({ cars, onEdit, onDelete }: CarTableProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Car
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Price/Day
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Features
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {cars.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No cars found. Add your first car to get started.
                                </td>
                            </tr>
                        ) : (
                            cars.map((car) => (
                                <tr key={car.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                src={car.imageUrl}
                                                alt={car.name}
                                                className="w-16 h-12 object-cover rounded-lg mr-3"
                                            />
                                            <div>
                                                <div className="text-sm font-medium text-slate-900">{car.name}</div>
                                                <div className="text-sm text-slate-500 line-clamp-1">{car.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                            {car.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                        {car.price.toLocaleString()} THB
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {car.features.slice(0, 2).join(', ')}
                                        {car.features.length > 2 && ` +${car.features.length - 2} more`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            type="button"
                                            onClick={() => onEdit(car)}
                                            className="text-orange-600 hover:text-orange-900 mr-4"
                                            aria-label={`Edit ${car.name}`}
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => onDelete(car.id)}
                                            className="text-red-600 hover:text-red-900"
                                            aria-label={`Delete ${car.name}`}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
