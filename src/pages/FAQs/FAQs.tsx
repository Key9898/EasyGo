import { useState } from 'react'
import Header from '../../components/Layouts/Common/Header'
import Footer from '../../components/Layouts/Common/Footer'
import ScrollToTopButton from '../../components/Layouts/Common/ScrollUpToTopButton'
import OtherHeroBanner from '../../components/Layouts/HeroBanner/OtherHeroBanner/OtherHeroBanner'
import Breadcrumb from '../../components/Layouts/Common/Breadcrumb'
import CategoryFilter from './CategoryFilter'
import FAQAccordion from './FAQAccordion'
import ContactCTA from './ContactCTA'
import { faqData, categories } from '../../data/faqData'

interface FAQsProps {
    onNavigate?: (page: string) => void
}

export default function FAQs({ onNavigate }: FAQsProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('All')

    const filteredFAQs = selectedCategory === 'All'
        ? faqData
        : faqData.filter(faq => faq.category === selectedCategory)

    const breadcrumbPages = [{ name: 'FAQs', href: '#faqs', current: true }]

    return (
        <>
            <Header onNavigate={onNavigate} />

            <OtherHeroBanner
                onPrimaryAction={() => onNavigate?.('faqs')}
                title="Frequently Asked Questions"
                description="Everything you need to know about renting with EasyGo. From booking details to insurance coverage, we’ve got you covered."
                buttonText="View All Topics"
                backgroundImgAlt="FAQs banner"
                variant="faqs"
                preTitleSlot={<Breadcrumb pages={breadcrumbPages} onNavigate={onNavigate} variant="dark" />}
                scrollTargetId="faqs-content"
            />

            <main id="faqs-content" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />

                    <FAQAccordion
                        faqs={filteredFAQs}
                        openIndex={openIndex}
                        onToggle={(index) => setOpenIndex(openIndex === index ? null : index)}
                    />

                    <ContactCTA onNavigate={onNavigate} />
                </div>
            </main>

            <Footer />
            <ScrollToTopButton />
        </>
    )
}
