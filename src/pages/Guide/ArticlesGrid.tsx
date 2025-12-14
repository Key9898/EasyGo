import ArticleCard from './ArticleCard'
import type { GuideArticle } from '../../data/guideData'

interface ArticlesGridProps {
    articles: GuideArticle[]
    selectedCategory: string | null
    onArticleClick: (article: GuideArticle) => void
}

export default function ArticlesGrid({ articles, selectedCategory, onArticleClick }: ArticlesGridProps) {
    const filteredArticles = selectedCategory
        ? articles.filter(article => article.category === selectedCategory)
        : articles

    if (filteredArticles.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-500">No articles found in this category.</p>
            </div>
        )
    }

    return (
        <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onClick={onArticleClick}
                    />
                ))}
            </div>
        </div>
    )
}
