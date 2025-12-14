import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface AccountMenuProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    openSignIn: () => void
    openSignUp: () => void
    textColor: string
}

export default function AccountMenu({ isOpen, setIsOpen, openSignIn, openSignUp, textColor }: AccountMenuProps) {
    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 text-base font-semibold transition-colors hover:text-orange-600 ${textColor}`}
            >
                Account
                {isOpen ? (
                    <ChevronUpIcon className="size-4" />
                ) : (
                    <ChevronDownIcon className="size-4" />
                )}
            </button>

            <div
                className={`absolute right-0 top-full mt-4 w-48 origin-top rounded-lg bg-white p-2 shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 ease-out ${isOpen
                    ? 'transform opacity-100 scale-y-100 translate-y-0'
                    : 'pointer-events-none transform opacity-0 scale-y-0 -translate-y-2'
                    }`}
            >
                <div className="flex flex-col gap-1">
                    <button
                        type="button"
                        onClick={openSignIn}
                        className="w-full rounded-lg px-4 py-2 text-left text-base font-semibold text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={openSignUp}
                        className="w-full rounded-lg px-4 py-2 text-left text-base font-semibold text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}
