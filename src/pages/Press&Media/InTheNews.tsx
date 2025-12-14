import { FaRegNewspaper } from 'react-icons/fa'

const handleReadArticle = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('app:notify', {
        detail: {
            type: 'info',
            title: 'External Link',
            message: `Redirecting to "${title}"... (Simulation: Article coming soon)`
        }
    }));
}

export default function InTheNews() {
    return (
        <section>
            <div className="flex items-center gap-3 mb-8">
                <FaRegNewspaper className="size-8 text-orange-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 hover:text-orange-600 transition-colors">In the News</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="#" onClick={(e) => handleReadArticle(e, 'Bangkok Post')} className="block p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-200 transition-all group">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors">Bangkok Post</h4>
                                <span className="text-sm font-medium text-orange-400 bg-slate-100 px-3 py-1 rounded-lg">Oct 20, 2024</span>
                            </div>
                            <p className="text-xl font-medium text-orange-600 leading-snug mb-2">"EasyGo Revolutionizes Car Rental Market in Thailand"</p>
                            <p className="text-lg text-slate-600">The new player in town is shaking up the industry with its transparent pricing model.</p>
                        </div>
                        <div className="mt-6 text-orange-600 font-semibold text-sm flex items-center gap-1">
                            Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </div>
                </a>
                <a href="#" onClick={(e) => handleReadArticle(e, 'Tech In Asia')} className="block p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-200 transition-all group">

                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-bold text-slate-800 group-hover:text-orange-600 transition-colors">Tech In Asia</h4>
                                <span className="text-sm font-medium text-orange-400 bg-slate-50 px-3 py-1 rounded-lg">Sep 12, 2024</span>
                            </div>
                            <p className="text-xl font-medium text-orange-600 leading-snug mb-2">"Top 10 Mobility Startups to Watch in SE Asia"</p>
                            <p className="text-lg text-slate-600">EasyGo recognized for its innovative approach to seamless cross-border travel.</p>
                        </div>
                        <div className="mt-6 text-orange-600 font-semibold text-sm flex items-center gap-1">
                            Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    )
}
