import type { ReactNode } from 'react'

interface CheckboxFieldProps {
    id: string
    name: string
    label: ReactNode
}

export default function CheckboxField({ id, name, label }: CheckboxFieldProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                    <input
                        id={id}
                        name={name}
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded border border-slate-300 bg-white checked:border-orange-600 checked:bg-orange-600 indeterminate:border-orange-600 indeterminate:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:border-slate-300 disabled:bg-slate-100 disabled:checked:bg-slate-100 forced-colors:appearance-auto"
                    />
                    <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-slate-950/25"
                    >
                        <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                    </svg>
                </div>
            </div>
            <label htmlFor={id} className="block text-sm leading-6 text-slate-900">
                {label}
            </label>
        </div>
    )
}
