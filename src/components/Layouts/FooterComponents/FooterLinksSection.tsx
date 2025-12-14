import { Link } from 'react-router-dom'

interface FooterLinkItem {
    name: string
    href: string
}

interface FooterLinksSectionProps {
    title: string
    items: FooterLinkItem[]
}

export default function FooterLinksSection({ title, items }: FooterLinksSectionProps) {
    return (
        <div>
            <h3 className="text-sm/6 font-semibold text-white">{title}</h3>
            <ul role="list" className="mt-6 space-y-4">
                {items.map((item) => (
                    <li key={item.name}>
                        <Link to={item.href} className="text-sm/6 text-slate-300 hover:text-white">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
