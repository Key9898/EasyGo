interface AuthFormInputProps {
    id: string
    name: string
    type: string
    label: string
    placeholder: string
    required?: boolean
    autoComplete?: string
}

export default function AuthFormInput({
    id,
    name,
    type,
    label,
    placeholder,
    required = false,
    autoComplete
}: AuthFormInputProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-slate-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="block w-full rounded-lg border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-3 outline-none"
                />
            </div>
        </div>
    )
}
