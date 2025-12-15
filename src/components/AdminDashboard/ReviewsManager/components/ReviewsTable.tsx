import { Trash2, Pencil } from 'lucide-react'


export type Review = { id: string; userName?: string; userId?: string; carName?: string; rating: number; text: string; createdAt?: string }

interface ReviewsTableProps {
    reviews: Review[]
    editing: Record<string, { rating: number; text: string }>
    onStartEdit: (r: Review) => void
    onSaveEdit: (id: string) => void
    onCancelEdit: (id: string) => void
    onRemoveReview: (id: string) => void
    onUpdateEditing: (id: string, field: 'rating' | 'text', value: string | number) => void
}

export default function ReviewsTable({
    reviews,
    editing,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onRemoveReview,
    onUpdateEditing
}: ReviewsTableProps) {
    if (reviews.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center text-slate-500">
                No reviews found.
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Car</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Comment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {reviews.map((r) => {
                            const edit = editing[r.id]
                            return (
                                <tr key={r.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{r.userName || r.userId || 'Unknown'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{r.carName || '—'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {!edit ? (
                                            <span className="inline-flex items-center gap-1">
                                                {r.rating} / 5
                                            </span>
                                        ) : (
                                            <select
                                                value={edit.rating}
                                                onChange={(e) => onUpdateEditing(r.id, 'rating', Number(e.target.value))}
                                                className="px-2 py-1 border border-slate-300 rounded-lg text-sm"
                                                title="Rating"
                                            >
                                                {[5, 4, 3, 2, 1].map((n) => (<option key={n} value={n}>{n}</option>))}
                                            </select>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {!edit ? (
                                            <p className="text-slate-700 max-w-xl truncate" title={r.text}>{r.text}</p>
                                        ) : (
                                            <input
                                                value={edit.text}
                                                onChange={(e) => onUpdateEditing(r.id, 'text', e.target.value)}
                                                className="w-full max-w-xl px-2 py-1 border border-slate-300 rounded-lg text-sm"
                                                title="Review text"
                                                placeholder="Update review"
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{r.createdAt || '—'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {!edit ? (
                                            <div className="flex items-center gap-2">
                                                <button type="button" onClick={() => onStartEdit(r)} className="px-3 py-1 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-500" title="Edit"><Pencil className="w-4 h-4 inline" /></button>
                                                <button type="button" onClick={() => onRemoveReview(r.id)} className="px-3 py-1 bg-rose-600 text-white rounded-lg text-sm hover:bg-rose-500" title="Delete"><Trash2 className="w-4 h-4 inline" /></button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <button type="button" onClick={() => onSaveEdit(r.id)} className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500" title="Save">Save</button>
                                                <button type="button" onClick={() => onCancelEdit(r.id)} className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-100" title="Cancel">Cancel</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
