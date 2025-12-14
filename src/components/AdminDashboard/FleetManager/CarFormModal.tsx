import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Car } from '../../../types'
import { storage } from '../../../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

interface CarFormModalProps {
    isOpen: boolean
    onClose: () => void
    editingCar: Car | null
    onSubmit: (data: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
}

export default function CarFormModal({ isOpen, onClose, editingCar, onSubmit }: CarFormModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        features: '',
        imageUrl: '',
        description: '',
        year: ''
    })
    const [imageFile, setImageFile] = useState<File | null>(null)

    useEffect(() => {
        if (editingCar) {
            setFormData({
                name: editingCar.name,
                category: editingCar.category,
                price: editingCar.price.toString(),
                features: editingCar.features.join(', '),
                imageUrl: editingCar.imageUrl,
                description: editingCar.description,
                year: (editingCar.year ? String(editingCar.year) : (editingCar.name.match(/\b(19|20)\d{2}\b$/)?.[0] || ''))
            })
        } else {
            setFormData({
                name: '',
                category: '',
                price: '',
                features: '',
                imageUrl: '',
                description: '',
                year: ''
            })
        }
    }, [editingCar, isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let finalImageUrl = formData.imageUrl
        if (imageFile) {
            try {
                if (storage) {
                    const r = ref(storage, `cars/${Date.now()}-${imageFile.name}`)
                    await uploadBytes(r, imageFile)
                    finalImageUrl = await getDownloadURL(r)
                } else {
                    const reader = new FileReader()
                    const dataUrl = await new Promise<string>((resolve) => {
                        reader.onload = () => resolve(reader.result as string)
                        reader.readAsDataURL(imageFile)
                    })
                    finalImageUrl = dataUrl
                }
            } catch {
                // ignore
            }
        }
        await onSubmit({
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            features: formData.features.split(',').map(f => f.trim()),
            imageUrl: finalImageUrl,
            description: formData.description,
            year: formData.year ? Number(formData.year) : undefined
        })
    }

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
                            aria-label="Close car form"
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Car Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Toyota Camry 2024"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Category
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    aria-label="Select car category"
                                >
                                    <option value="">Select category</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Van">Van</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="Pickup">Pickup</option>
                                    <option value="MVP">MVP</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Price per Day (THB)
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="1500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Year
                            </label>
                            <input
                                type="number"
                                min={1900}
                                max={2099}
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="2024"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Features (comma-separated)
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.features}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Automatic, 5 Seats, GPS, Bluetooth"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Image URL
                            </label>
                            <input
                                type="url"
                                required
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-orange-500 focus:border-slate-300"
                                placeholder="https://..."
                            />
                            <div className="mt-3">
                                <label htmlFor="car-image-file" className="block text-sm font-medium text-slate-700 mb-1">
                                    Choose image
                                </label>
                                <input
                                    id="car-image-file"
                                    type="file"
                                    accept="image/*"
                                    title="Choose car image file"
                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                    className="mt-1 block w-full text-sm text-slate-600 focus:outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-slate-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Description
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Brief description of the car..."
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                                aria-label={editingCar ? 'Update car' : 'Add car'}
                            >
                                {editingCar ? 'Update Car' : 'Add Car'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
