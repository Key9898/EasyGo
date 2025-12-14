import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { FaImages } from 'react-icons/fa'

export default function MediaKit() {
    const handleDownload = (itemName: string) => {
        // Trigger toast notification
        window.dispatchEvent(new CustomEvent('app:notify', {
            detail: {
                type: 'success',
                title: 'Download Started',
                message: `Downloading ${itemName}...`
            }
        }));
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-8">
                <FaImages className="size-8 text-orange-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 hover:text-orange-600 transition-colors">Media Kit</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-orange-600 mb-4">Brand Assets</h3>
                    <p className="text-lg text-slate-600 mb-6">Download our official logos, brand guidelines, and color palettes for print and digital use.</p>
                    <div className="space-y-3">
                        <a
                            href="/MediaKit/Zips/EasyGo_Logo_Pack.zip"
                            download
                            onClick={() => handleDownload('EasyGo Logo Pack')}
                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-orange-500 hover:text-orange-600 transition-colors group cursor-pointer"
                        >
                            <span className="font-medium group-hover:text-orange-600 text-slate-900">EasyGo Logo Pack (PNG, SVG)</span>
                            <ArrowDownTrayIcon className="size-5 group-hover:text-orange-600 text-slate-500" />
                        </a>
                        <a
                            href="/MediaKit/Zips/EasyGo_Brand_Guidelines.zip"
                            download
                            onClick={() => handleDownload('Brand Guidelines')}
                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-orange-500 hover:text-orange-600 transition-colors group cursor-pointer"
                        >
                            <span className="font-medium group-hover:text-orange-600 text-slate-900">Brand Guidelines & Presentation</span>
                            <ArrowDownTrayIcon className="size-5 group-hover:text-orange-600 text-slate-500" />
                        </a>
                        <a
                            href="/MediaKit/Zips/EasyGo_Fact_Sheet.zip"
                            download
                            onClick={() => handleDownload('Company Fact Sheet')}
                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-orange-500 hover:text-orange-600 transition-colors group cursor-pointer"
                        >
                            <span className="font-medium group-hover:text-orange-600 text-slate-900">Company Fact Sheet</span>
                            <ArrowDownTrayIcon className="size-5 group-hover:text-orange-600 text-slate-500" />
                        </a>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-orange-600 mb-4">High-Res Photos</h3>
                    <p className="text-lg text-slate-600 mb-6">Access high-resolution photography of our leadership, extensive fleet, and office locations.</p>
                    <div className="space-y-3">
                        <a
                            href="/MediaKit/Zips/EasyGo_Fleet_Gallery.zip"
                            download
                            onClick={() => handleDownload('Fleet Gallery')}
                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-orange-500 hover:text-orange-600 transition-colors group cursor-pointer"
                        >
                            <span className="font-medium group-hover:text-orange-600 text-slate-900">Fleet & Vehicles Gallery</span>
                            <ArrowDownTrayIcon className="size-5 group-hover:text-orange-600 text-slate-500" />
                        </a>
                        <a
                            href="/MediaKit/Zips/EasyGo_Executive_Team.zip"
                            download
                            onClick={() => handleDownload('Executive Team')}
                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-orange-500 hover:text-orange-600 transition-colors group cursor-pointer"
                        >
                            <span className="font-medium group-hover:text-orange-600 text-slate-900">Executive Team</span>
                            <ArrowDownTrayIcon className="size-5 group-hover:text-orange-600 text-slate-500" />
                        </a>
                        <a
                            href="/MediaKit/Zips/EasyGo_Office_Locations.zip"
                            download
                            onClick={() => handleDownload('Office Locations')}
                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-orange-500 hover:text-orange-600 transition-colors group cursor-pointer"
                        >
                            <span className="font-medium group-hover:text-orange-600 text-slate-900">Office & Locations HQ</span>
                            <ArrowDownTrayIcon className="size-5 group-hover:text-orange-600 text-slate-500" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
