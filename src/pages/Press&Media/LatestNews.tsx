import { FaBullhorn } from 'react-icons/fa'

interface NewsItem {
    id: number
    title: string
    category: string
    date: string
    excerpt: string
    image: string
}

export default function LatestNews() {
    const newsItems: NewsItem[] = [
        {
            id: 1,
            title: 'EasyGo Adds Premium SUVs to Fleet',
            category: 'Fleet Update',
            date: 'Dec 1, 2024',
            excerpt: 'Meeting the demand for luxury and comfort, we are proud to introduce the latest Ford Everest and Toyota Fortuner models to our lineup.',
            image: '/PressMedia/news_suv_fleet.png'
        },
        {
            id: 2,
            title: 'Strategic Partnership with Minor International',
            category: 'Partnership',
            date: 'Nov 15, 2024',
            excerpt: 'We are thrilled to partner with Minor International to provide exclusive mobility solutions for guests at Anantara and Avani hotels across Thailand.',
            image: '/PressMedia/news_partnership.png'
        }
    ]

    const handleReadMore = (e: React.MouseEvent, title: string) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('app:notify', {
            detail: {
                type: 'info',
                title: 'Coming Soon',
                message: `The full article "${title}" will be available shortly.`
            }
        }));
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-8">
                <FaBullhorn className="size-8 text-orange-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 hover:text-orange-600 transition-colors">Latest News</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {newsItems.map((item) => (
                    <article key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-100">
                        <div className="h-48 w-full overflow-hidden">
                            <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform hover:scale-105 duration-500" />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-slate-100 text-orange-400 rounded-lg text-base font-medium uppercase tracking-wide">{item.category}</span>
                                <span className="text-slate-500 text-base">{item.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-orange-600 mb-2">{item.title}</h3>
                            <p className="text-slate-600 text-lg mb-4">{item.excerpt}</p>
                            <a href="#" onClick={(e) => handleReadMore(e, item.title)} className="text-orange-600 font-semibold hover:text-orange-500 flex items-center gap-1 group">
                                Read full story
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}
