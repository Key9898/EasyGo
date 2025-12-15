interface Application {
    id: string
    fullName: string
    email: string
    phone: string
    jobTitle: string
    coverLetter: string
    cvFileName: string
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
    userId: string
    createdAt: any
}

interface ApplicationsTableProps {
    applications: Application[]
    onStatusChange: (id: string, status: Application['status']) => void
    onDelete: (id: string) => void
}

export default function ApplicationsTable({ applications, onStatusChange, onDelete }: ApplicationsTableProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applicant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CV</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No applications found
                                </td>
                            </tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-900">{app.fullName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-900">{app.jobTitle}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-900">{app.email}</div>
                                        <div className="text-sm text-slate-500">{app.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-slate-500">{app.cvFileName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={app.status}
                                            onChange={(e) => onStatusChange(app.id, e.target.value as Application['status'])}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                                    app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => onDelete(app.id)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            Delete
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
export type { Application }
