import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'

interface CategoryFilterProps {
    categories: string[]
    selectedCategory: string
    onSelectCategory: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">Browse by Category</h2>

            {/* Mobile Dropdown */}
            <div className="sm:hidden relative max-w-sm mx-auto" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-900 font-bold transition-all active:scale-95 hover:border-orange-500"
                >
                    <span className="truncate mr-2">
                        {selectedCategory === 'All' ? 'All Questions' : selectedCategory}
                    </span>
                    <ChevronDownIcon className={`w-5 h-5 text-orange-600 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="max-h-64 overflow-y-auto">
                            <button
                                type="button"
                                onClick={() => {
                                    onSelectCategory('All')
                                    setIsOpen(false)
                                }}
                                className={`w-full text-left px-6 py-3 flex items-center justify-between hover:bg-orange-50 transition-colors
                                    ${selectedCategory === 'All' ? 'text-orange-600 bg-orange-50 font-bold' : 'text-slate-600 font-medium'}
                                `}
                            >
                                All Questions
                                {selectedCategory === 'All' && <CheckIcon className="w-5 h-5 text-orange-600" />}
                            </button>
                            {categories.filter(cat => cat !== 'All').map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => {
                                        onSelectCategory(category)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full text-left px-6 py-3 flex items-center justify-between hover:bg-orange-50 transition-colors border-t border-slate-50
                                        ${selectedCategory === category ? 'text-orange-600 bg-orange-50 font-bold' : 'text-slate-600 font-medium'}
                                    `}
                                >
                                    {category}
                                    {selectedCategory === category && <CheckIcon className="w-5 h-5 text-orange-600" />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Pills */}
            <div className="hidden sm:flex flex-wrap justify-center gap-3">
                <button
                    type="button"
                    onClick={() => onSelectCategory('All')}
                    className={`px-6 py-3 rounded-lg text-base font-semibold transition-all shadow-sm
                        ${selectedCategory === 'All'
                            ? 'bg-orange-600 text-white shadow-orange-200 ring-2 ring-orange-600 ring-offset-2'
                            : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
                        }`}
                >
                    All Questions
                </button>
                {categories.filter(cat => cat !== 'All').map((category) => (
                    <button
                        type="button"
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-6 py-3 rounded-lg text-base font-semibold transition-all shadow-sm
                            ${selectedCategory === category
                                ? 'bg-orange-600 text-white shadow-orange-200 ring-2 ring-orange-600 ring-offset-2'
                                : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    )
}
