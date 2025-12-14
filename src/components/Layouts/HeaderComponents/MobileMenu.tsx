import { Dialog, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface MobileMenuProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onNavigate?: (page: string) => void
    children: React.ReactNode
}

export default function MobileMenu({ isOpen, setIsOpen, onNavigate, children }: MobileMenuProps) {
    return (
        <Dialog open={isOpen} onClose={setIsOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => { onNavigate?.('home'); setIsOpen(false) }}
                        className="-m-1.5 p-1.5"
                    >
                        <span className="sr-only">EasyGo</span>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                            EasyGo
                        </h2>
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="-m-2.5 rounded-lg p-2.5 text-slate-700"
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-slate-500/10">
                        {children}
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    )
}
