import type { GuideArticle } from '../../data/guideData'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ArticleModalProps {
    article: GuideArticle
    isOpen: boolean
    onClose: () => void
}

export default function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                {/* Modal Positioning */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal Content */}
                <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">

                    {/* Header Image */}
                    <div className="relative h-56 h-64 sm:h-72 w-full">
                        <img
                            src={article.image}
                            alt={article.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <button
                            type="button"
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-2 text-white transition-colors focus:outline-none"
                            onClick={onClose}
                        >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="inline-block px-3 py-1 bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                                {article.category.replace('-', ' ')}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                                {article.title}
                            </h3>
                        </div>
                    </div>

                    {/* Body Content */}
                    <div className="px-6 py-6 sm:px-8 sm:py-8">
                        <div
                            className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900"
                            dangerouslySetInnerHTML={{ __html: typeof article.content === 'string' ? article.content : '' }}
                        />
                        {/* If article.content is a ReactNode, render it directly, but for now we used strings in data */}
                        {/* {article.content} */}

                        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
