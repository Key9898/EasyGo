import type { ReactNode } from 'react'

interface BookingFormInputProps {
    label: ReactNode
    type: string
    value: string
    onChange: (value: string) => void
    placeholder: string
    required?: boolean
}

export default function BookingFormInput({
    label,
    type,
    value,
    onChange,
    placeholder,
    required = false
}: BookingFormInputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder={placeholder}
                required={required}
            />
        </div>
    )
}
