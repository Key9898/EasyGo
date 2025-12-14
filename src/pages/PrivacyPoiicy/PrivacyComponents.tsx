interface PrivacySectionProps {
    title: string
    children: React.ReactNode
}

export function PrivacySection({ title, children }: PrivacySectionProps) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
            {children}
        </section>
    )
}

interface PrivacySubsectionProps {
    title: string
    children: React.ReactNode
}

export function PrivacySubsection({ title, children }: PrivacySubsectionProps) {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
            {children}
        </div>
    )
}

interface PrivacyListProps {
    items: string[]
}

export function PrivacyList({ items }: PrivacyListProps) {
    return (
        <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
            {items.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
        </ul>
    )
}

interface PrivacyParagraphProps {
    children: React.ReactNode
}

export function PrivacyParagraph({ children }: PrivacyParagraphProps) {
    return <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
}
