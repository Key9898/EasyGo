interface AuthHeaderProps {
    title: string
    subtitle?: string
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
    return (
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                EasyGo
            </h2>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-2 text-sm text-slate-600">
                    {subtitle}
                </p>
            )}
        </div>
    )
}
