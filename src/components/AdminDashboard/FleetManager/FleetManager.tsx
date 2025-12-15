import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { db } from '../../../firebaseConfig'
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    onSnapshot
} from 'firebase/firestore'
import type { Car } from '../../../types'
import CarTable from './CarTable'
import CarFormModal from './CarFormModal'


export default function FleetManager() {
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editingCar, setEditingCar] = useState<Car | null>(null)

    useEffect(() => {
        if (!db) {
            setLoading(false)
            return
        }

        const q = collection(db, 'cars')

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const carsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Car[]
            setCars(carsData)
            setLoading(false)
        }, (error) => {
            console.error('Error fetching cars:', error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleOpenModal = (car?: Car) => {
        if (car) {
            setEditingCar(car)
        } else {
            setEditingCar(null)
        }
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setEditingCar(null)
    }

    const handleSave = async (carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!db) return
        try {
            if (editingCar) {
                // Update existing car
                await updateDoc(doc(db!, 'cars', editingCar.id), {
                    ...carData,
                    updatedAt: serverTimestamp()
                })
                window.dispatchEvent(new CustomEvent('app:notify', {
                    detail: { type: 'success', title: 'Success', message: 'Car updated successfully' }
                }))
            } else {
                // Add new car
                await addDoc(collection(db!, 'cars'), {
                    ...carData,
                    createdAt: serverTimestamp()
                })
                window.dispatchEvent(new CustomEvent('app:notify', {
                    detail: { type: 'success', title: 'Success', message: 'Car added successfully' }
                }))
            }

            handleCloseModal()
        } catch (error) {
            console.error('Error saving car:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to save car' }
            }))
        }
    }

    const handleDelete = async (carId: string) => {
        if (!confirm('Are you sure you want to delete this car?')) return

        if (!db) return
        try {
            await deleteDoc(doc(db!, 'cars', carId))
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'success', title: 'Success', message: 'Car deleted successfully' }
            }))
        } catch (error) {
            console.error('Error deleting car:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to delete car' }
            }))
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-orange-600">Fleet Management</h2>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Car
                    </button>
                </div>
            </div>

            {/* Cars Table */}
            <CarTable
                cars={cars}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
            />

            {/* Add/Edit Modal */}
            <CarFormModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                editingCar={editingCar}
                onSubmit={handleSave}
            />
        </div>
    )
}
