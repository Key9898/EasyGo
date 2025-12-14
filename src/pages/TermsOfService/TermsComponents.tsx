interface TermsSectionProps {
    title: string
    children: React.ReactNode
}

export function TermsSection({ title, children }: TermsSectionProps) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
            {children}
        </section>
    )
}

interface TermsSubsectionProps {
    title: string
    children: React.ReactNode
}

export function TermsSubsection({ title, children }: TermsSubsectionProps) {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
            {children}
        </div>
    )
}

interface TermsListProps {
    items: string[]
}

export function TermsList({ items }: TermsListProps) {
    return (
        <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
}

interface TermsParagraphProps {
    children: React.ReactNode
}

export function TermsParagraph({ children }: TermsParagraphProps) {
    return <p className="text-slate-600 leading-relaxed mb-4">{children}</p>
}
