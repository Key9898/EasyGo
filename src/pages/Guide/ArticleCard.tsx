import type { GuideArticle } from '../../data/guideData'

interface ArticleCardProps {
    article: GuideArticle
    onClick: (article: GuideArticle) => void
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
    return (
        <div
            onClick={() => onClick(article)}
            className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer group"
        >
            <div className="relative h-48 overflow-hidden shrink-0">
                <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-orange-600 mb-3 transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed mb-4 line-clamp-3">
                        {article.summary}
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center text-slate-900 font-semibold text-base hover:text-orange-600 transition-colors mt-auto"
                >
                    Read Guide
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
