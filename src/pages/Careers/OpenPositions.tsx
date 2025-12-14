import { useState } from 'react'
import { FaUserTie, FaCar, FaTools, FaHeadset } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'
import JobApplicationForm from './JobApplicationForm'

export default function OpenPositions() {
    const [applicationModal, setApplicationModal] = useState<{
        isOpen: boolean
        jobTitle: string
        formspreeUrl: string
    }>({ isOpen: false, jobTitle: '', formspreeUrl: '' })

    const positions = [
        {
            title: 'Professional Driver',
            department: 'Operations',
            type: 'Full-time',
            location: 'Bangkok, Thailand',
            icon: FaUserTie,
            description: 'We are looking for experienced, English-speaking drivers with a clean record to provide premium service to our VIP clients.',
            formspreeUrl: 'https://formspree.io/f/xwpgqyjo'
        },
        {
            title: 'Fleet Operations Officer',
            department: 'Logistics',
            type: 'Full-time',
            location: 'Bangkok HQ',
            icon: FaCar,
            description: 'Oversee the daily movements, maintenance scheduling, and quality assurance of our premium vehicle fleet.',
            formspreeUrl: 'https://formspree.io/f/xnnezwyb'
        },
        {
            title: 'Customer Service Specialist',
            department: 'Support',
            type: 'Full-time / Shift',
            location: 'Remote / Hybrid',
            icon: FaHeadset,
            description: 'Handle booking inquiries, manage reservations, and ensure every customer has a seamless 5-star experience.',
            formspreeUrl: 'https://formspree.io/f/mqarlnon'
        },
        {
            title: 'Vehicle Mechanic',
            department: 'Maintenance',
            type: 'Full-time',
            location: 'Service Center',
            icon: FaTools,
            description: 'Experienced technician needed for in-house maintenance of luxury sedans and EVs. Certification required.',
            formspreeUrl: 'https://formspree.io/f/myzrpoaa'
        },
    ]

    const handleApplyClick = (jobTitle: string, formspreeUrl: string) => {
        setApplicationModal({ isOpen: true, jobTitle, formspreeUrl })
    }

    return (
        <div id="open-positions">
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-8">Open Positions</h2>

            <div className="space-y-4">
                {positions.map((job) => (
                    <div key={job.title} className="group relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-orange-500 transition-colors shadow-sm hover:shadow-lg">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6">
                            <div className="flex-none p-4 rounded-full bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                <job.icon className="size-8" />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-orange-600">{job.title}</h3>
                                    <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{job.type}</span>
                                </div>
                                <div className="text-sm text-slate-500 mb-3 flex flex-wrap justify-center sm:justify-start gap-x-4">
                                    <span>📍 {job.location}</span>
                                    <span>🏢 {job.department}</span>
                                </div>
                                <p className="text-lg text-slate-600 mb-4">{job.description}</p>
                            </div>
                            <div className="flex-none">
                                <button
                                    type="button"
                                    onClick={() => handleApplyClick(job.title, job.formspreeUrl)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors"
                                >
                                    Apply Now
                                    <BsArrowRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl border border-orange-100 text-center">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">Don't see a perfect fit?</h3>
                <p className="text-white text-lg mb-4">We are always looking for talent. Send your general application to our HR team.</p>
                <a href="mailto:hr@easygo.com" className="text-white text-xl font-bold hover:text-orange-800 underline decoration-2 underline-offset-2">
                    Email hr@easygo.com
                </a>
            </div>

            {/* Application Form Modal */}
            <JobApplicationForm
                isOpen={applicationModal.isOpen}
                onClose={() => setApplicationModal({ isOpen: false, jobTitle: '', formspreeUrl: '' })}
                jobTitle={applicationModal.jobTitle}
                formspreeUrl={applicationModal.formspreeUrl}
            />
        </div>
    )
}
