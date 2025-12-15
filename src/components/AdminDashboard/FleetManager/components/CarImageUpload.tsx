interface CarImageUploadProps {
    imageUrl: string
    onUrlChange: (url: string) => void
    onFileChange: (file: File | null) => void
}

export default function CarImageUpload({ imageUrl, onUrlChange, onFileChange }: CarImageUploadProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
                Image URL
            </label>
            <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => onUrlChange(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-slate-300"
                placeholder="https://..."
            />
            <div className="mt-3">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Or Upload Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                    className="mt-1 block w-full text-sm text-slate-600 focus:outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-slate-200"
                />
            </div>
        </div>
    )
}
