import { useState, useEffect } from 'react'
import type { Car } from '../../../../types'
import { storage } from '../../../../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import CarFormFields from './CarFormFields'
import CarImageUpload from './CarImageUpload'

interface CarFormProps {
    editingCar: Car | null
    onSubmit: (data: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
    onClose: () => void
}

export default function CarForm({ editingCar, onSubmit, onClose }: CarFormProps) {
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
    const [loading, setLoading] = useState(false)

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
        }
    }, [editingCar])

    const handleFieldChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
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
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CarFormFields
                formData={formData}
                onChange={handleFieldChange}
            />

            <CarImageUpload
                imageUrl={formData.imageUrl}
                onUrlChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                onFileChange={setImageFile}
            />

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : (editingCar ? 'Update Car' : 'Add Car')}
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
    )
}
