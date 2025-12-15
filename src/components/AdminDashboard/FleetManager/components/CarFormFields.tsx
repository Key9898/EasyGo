interface CarFormFieldsProps {
    formData: {
        name: string
        category: string
        price: string
        features: string
        description: string
        year: string
    }
    onChange: (field: string, value: string) => void
}

export default function CarFormFields({ formData, onChange }: CarFormFieldsProps) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Car Name
                </label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => onChange('name', e.target.value)}
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
                        onChange={(e) => onChange('category', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        onChange={(e) => onChange('price', e.target.value)}
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
                    onChange={(e) => onChange('year', e.target.value)}
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
                    onChange={(e) => onChange('features', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Automatic, 5 Seats, GPS, Bluetooth"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                </label>
                <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => onChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Brief description of the car..."
                />
            </div>
        </div>
    )
}
