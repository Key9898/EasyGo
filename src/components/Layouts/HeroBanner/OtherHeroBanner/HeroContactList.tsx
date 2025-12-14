import { FaPhoneVolume, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa6'
import { IoIosMail } from 'react-icons/io'
import { SiLine } from 'react-icons/si'
import type { ContactItem } from '../../../../types'

const contacts: ContactItem[] = [
    {
        label: 'Phone',
        value: '094-301-8336',
        href: 'tel:+959430183336',
        icon: FaPhoneVolume,
    },
    {
        label: 'Email',
        value: 'contact@easygo.com',
        href: 'mailto:contact@easygo.com',
        icon: IoIosMail,
    },
    {
        label: 'Facebook',
        value: '@easygo',
        href: 'https://facebook.com/easygo',
        icon: FaFacebook,
    },
    {
        label: 'Instagram',
        value: '@easygo',
        href: 'https://instagram.com/easygo',
        icon: FaInstagram,
    },
    {
        label: 'TikTok',
        value: '@easygo',
        href: 'https://tiktok.com/@easygo',
        icon: FaTiktok,
    },
    {
        label: 'Line',
        value: '@easygo',
        href: 'https://line.me/ti/p/@easygo',
        icon: SiLine,
    },
]

export default function HeroContactList() {
    return (
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {contacts.map((item) => (
                <div key={item.label} className="">
                    {item.href?.startsWith('http') ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="group">
                            <div className="mb-2 flex items-center gap-3">
                                <item.icon aria-hidden className="size-7 text-orange-500 group-hover:text-orange-400" />
                                <h3 className="text-white font-semibold text-lg">{item.label}</h3>
                            </div>
                            <p className="mt-1 text-white/70 text-base">{item.value}</p>
                        </a>
                    ) : (
                        <>
                            {/* For email/tel, we might want links too, but copying logic from original file */}
                            {item.href ? (
                                <a href={item.href} className="group">
                                    <div className="mb-2 flex items-center gap-3">
                                        <item.icon aria-hidden className="size-7 text-orange-500 group-hover:text-orange-400" />
                                        <h3 className="text-white font-semibold text-lg">{item.label}</h3>
                                    </div>
                                    <p className="mt-1 text-white/70 text-base">{item.value}</p>
                                </a>
                            ) : (
                                <>
                                    <div className="mb-2 flex items-center gap-3">
                                        <item.icon aria-hidden className="size-7 text-orange-500 hover:text-orange-400" />
                                        <h3 className="text-white font-semibold text-lg">{item.label}</h3>
                                    </div>
                                    <p className="mt-1 text-white/70 text-base">{item.value}</p>
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}
