import { useEffect, useState } from 'react'
import { db, auth } from '../../../firebaseConfig'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { Briefcase } from 'lucide-react'
import ApplicationCard from './components/ApplicationCard'

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

export default function MyApplicationsSection() {
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMyApplications()
    }, [])

    const fetchMyApplications = async () => {
        if (!db || !auth?.currentUser) {
            setLoading(false)
            return
        }

        try {
            const q = query(
                collection(db, 'applications'),
                where('userId', '==', auth.currentUser.uid),
                orderBy('createdAt', 'desc')
            )
            const querySnapshot = await getDocs(q)
            const applicationsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Application[]
            setApplications(applicationsData)
        } catch (error) {
            console.error('Error fetching applications:', error)
            window.dispatchEvent(new CustomEvent('app:notify', {
                detail: { type: 'error', title: 'Error', message: 'Failed to load applications' }
            }))
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                    <h2 className="text-xl font-bold text-slate-900">My Job Applications</h2>
                </div>
                <p className="mt-1 text-sm text-slate-600">Track the status of your job applications</p>
            </div>

            <div className="p-6">
                {applications.length === 0 ? (
                    <div className="text-center py-12">
                        <Briefcase className="mx-auto h-12 w-12 text-slate-400" />
                        <h3 className="mt-2 text-sm font-semibold text-slate-900">No applications yet</h3>
                        <p className="mt-1 text-sm text-slate-500">You haven't applied for any positions yet.</p>
                        <div className="mt-6">
                            <a
                                href="/careers"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                            >
                                Browse Open Positions
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <ApplicationCard key={app.id} application={app} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
