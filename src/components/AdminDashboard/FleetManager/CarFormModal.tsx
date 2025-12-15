import { X } from 'lucide-react'
import type { Car } from '../../../types'
import CarForm from './components/CarForm'

interface CarFormModalProps {
    isOpen: boolean
    onClose: () => void
    editingCar: Car | null
    onSubmit: (data: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
}

export default function CarFormModal({ isOpen, onClose, editingCar, onSubmit }: CarFormModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black/50" onClick={onClose} />

                <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-900">
                            {editingCar ? 'Edit Car' : 'Add New Car'}
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <CarForm
                        editingCar={editingCar}
                        onSubmit={onSubmit}
                        onClose={onClose}
                    />
                </div>
            </div>
        </div>
    )
}
