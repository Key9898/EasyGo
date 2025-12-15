import { useState } from 'react'
import { Star, Pencil, Calendar } from 'lucide-react'

// Defined locally in parent, re-defining here or use shared type if available.
// Parent defined `type Review = { id: string; carName?: string; rating: number; text: string; createdAt?: string }`
// The types.ts might have `Review` but parent defined it inline. I'll define interface here.

export interface Review {
    id: string
    carName?: string
    rating: number
    text: string
    createdAt?: string
}

interface ReviewItemProps {
    review: Review
    onSave: (id: string, rating: number, text: string) => Promise<void>
}

function classNames(...c: (string | false | null | undefined)[]) { return c.filter(Boolean).join(' ') }

export default function ReviewItem({ review, onSave }: ReviewItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({ rating: review.rating, text: review.text })

    const handleEditClick = () => {
        setEditData({ rating: review.rating, text: review.text })
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditData({ rating: review.rating, text: review.text })
    }

    const handleSaveClick = async () => {
        await onSave(review.id, editData.rating, editData.text)
        setIsEditing(false)
    }

    return (
        <div className="border border-slate-200 rounded-lg p-6 hover:border-orange-300 transition-colors">
            {!isEditing ? (
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                                {review.carName || 'Unknown Car'}
                            </span>
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <Star
                                        key={i}
                                        className={classNames(
                                            review.rating > i ? 'text-yellow-400' : 'text-slate-300',
                                            'w-5 h-5'
                                        )}
                                        fill={review.rating > i ? 'currentColor' : 'none'}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-slate-700 mt-3">{review.text}</p>
                        {review.createdAt && (
                            <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>{review.createdAt}</span>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleEditClick}
                        className="ml-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
                    >
                        <Pencil className="w-4 h-4" />
                        Edit
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-700">Rating:</span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() => setEditData(prev => ({ ...prev, rating: n }))}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={classNames(
                                            editData.rating >= n ? 'text-yellow-400' : 'text-slate-300',
                                            'w-6 h-6 hover:scale-110 transition-transform'
                                        )}
                                        fill={editData.rating >= n ? 'currentColor' : 'none'}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Review Text</label>
                        <textarea
                            value={editData.text}
                            onChange={(e) => setEditData(prev => ({ ...prev, text: e.target.value }))}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                            rows={4}
                            placeholder="Update your review..."
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-6 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveClick}
                            className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
