import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface PasswordInputProps {
    id: string
    name: string
    label: string
    placeholder: string
    required?: boolean
    autoComplete?: string
}

export default function PasswordInput({
    id,
    name,
    label,
    placeholder,
    required = false,
    autoComplete
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-slate-900">
                {label}
            </label>
            <div className="mt-2 relative">
                <input
                    id={id}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    required={required}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="block w-full rounded-lg border-0 py-1.5 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-3 outline-none"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700 focus:outline-none"
                >
                    {showPassword ? <EyeSlashIcon className="size-5" /> : <EyeIcon className="size-5" />}
                </button>
            </div>
        </div>
    )
}
