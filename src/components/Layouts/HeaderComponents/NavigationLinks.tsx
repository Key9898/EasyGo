interface NavigationItem {
    name: string
    slug: string
}

interface NavigationLinksProps {
    navigation: NavigationItem[]
    onNavigate?: (page: string) => void
    textColor: string
    isSticky: boolean
    isMobile?: boolean
    closeMobileMenu?: () => void
}

export default function NavigationLinks({ navigation, onNavigate, textColor, isSticky, isMobile, closeMobileMenu }: NavigationLinksProps) {
    if (isMobile) {
        return (
            <div className="space-y-2 py-6">
                {navigation.map((item) => (
                    <button
                        key={item.slug}
                        type="button"
                        onClick={() => { onNavigate?.(item.slug); closeMobileMenu?.() }}
                        className="-mx-3 block w-full rounded-lg px-3 py-2 text-left text-base font-semibold text-slate-900 hover:bg-slate-50"
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        )
    }

    // Desktop View
    if (!isSticky) {
        return (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <div className="flex items-center gap-x-8">
                    {navigation.map((item) => (
                        <button
                            key={item.slug}
                            type="button"
                            onClick={() => { onNavigate?.(item.slug) }}
                            className={`text-base font-semibold hover:text-orange-600 transition-colors ${textColor}`}
                        >
                            {item.name}
                        </button>
                    ))}
                    {/* Helper div to inject children (like UserPanel) if needed, but managing layout in parent is better. */}
                    {/* For this specific layout, parent handles positioning relative to other elements */}
                </div>
            </div>
        )
    }

    return (
        <div className="hidden lg:flex lg:gap-x-12 absolute left-1/2 -translate-x-1/2">
            {navigation.map((item) => (
                <button
                    key={item.slug}
                    type="button"
                    onClick={() => { onNavigate?.(item.slug) }}
                    className={`text-base font-semibold hover:text-orange-600 transition-colors ${textColor}`}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
}
