import { useState } from 'react'
import Header from '../../components/Layouts/Common/Header'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import OtherHeroBanner from '../../components/Layouts/HeroBanner/OtherHeroBanner/OtherHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import CategoryGrid from './CategoryGrid'
import ArticlesGrid from './ArticlesGrid'
import GuideCTA from './GuideCTA'
import ArticleModal from './ArticleModal'
import { guideCategories, guideArticles, type GuideArticle } from '../../data/guideData'

interface GuideProps {
    onNavigate?: (page: string) => void
}

export default function Guide({ onNavigate }: GuideProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null)

    const breadcrumbPages = [{ name: 'Guide', href: '#guide', current: true }]

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
        // Smooth scroll to articles section
        setTimeout(() => {
            const articlesSection = document.getElementById('articles-section')
            if (articlesSection) {
                const header = document.querySelector('header') as HTMLElement | null
                const offset = header?.offsetHeight ?? 0
                const top = articlesSection.getBoundingClientRect().top + window.scrollY - offset - 16
                window.scrollTo({ top, behavior: 'smooth' })
            }
        }, 100)
    }

    return (
        <>
            <Header onNavigate={onNavigate} />

            <OtherHeroBanner
                onPrimaryAction={() => onNavigate?.('guide')}
                title="EasyGo Rental Guide"
                description="From Rental Basics and Safety & Rules to Tech & Fuel insights and Travel Tips—we have all the answers for your road trip."
                buttonText="Browse Guides"
                backgroundImgAlt="Guide banner"
                variant="guide"
                preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} variant="dark" />}
                scrollTargetId="guide-content"
            />

            <main id="guide-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
                    <CategoryGrid
                        categories={guideCategories}
                        onSelectCategory={handleCategorySelect}
                    />

                    <div id="articles-section">
                        {selectedCategory && (
                            <div className="mb-8 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {guideCategories.find(c => c.id === selectedCategory)?.title} Articles
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory(null)}
                                    className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear Filter
                                </button>
                            </div>
                        )}

                        <ArticlesGrid
                            articles={guideArticles}
                            selectedCategory={selectedCategory}
                            onArticleClick={setSelectedArticle}
                        />
                    </div>

                    <GuideCTA onNavigate={onNavigate} />
                </div>
            </main>

            {selectedArticle && (
                <ArticleModal
                    article={selectedArticle}
                    isOpen={!!selectedArticle}
                    onClose={() => setSelectedArticle(null)}
                />
            )}

            <Footer />
            <ScrollToTopButton />
        </>
    )
}
