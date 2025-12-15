import { Trash2 } from 'lucide-react'

export interface Message {
    id: string
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: string;
    message?: string
    createdAt?: string
}

interface GetInTouchTableProps {
    messages: Message[]
    onDelete: (id: string) => void
}

export default function GetInTouchTable({ messages, onDelete }: GetInTouchTableProps) {
    if (messages.length === 0) {
        return (
            <div className="p-12 text-center text-slate-500">
                No messages found.
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {messages.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                {[m.firstName, m.lastName].filter(Boolean).join(' ') || '—'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                {m.email || '—'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                {m.phoneNumber || '—'}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700 max-w-xl truncate" title={m.message}>
                                {m.message || '—'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                {m.createdAt || '—'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                    type="button"
                                    onClick={() => onDelete(m.id)}
                                    className="px-3 py-1 bg-rose-600 text-white rounded-lg text-sm hover:bg-rose-500 inline-flex items-center gap-1"
                                    title="Delete message"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="sr-only">Delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
