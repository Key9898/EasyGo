import { useEffect, useState } from 'react';
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';
import styles from './SocialMedia.module.css';

const socialIcons = [
  {
    name: 'Facebook',
    icon: <FaFacebookF className="w-full h-full" />,
    href: 'https://facebook.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    color: 'bg-[#1877F2]'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram className="w-full h-full" />,
    href: 'https://instagram.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    bgClass: 'instagramBg'
  },
  {
    name: 'TikTok',
    icon: <FaTiktok className="w-full h-full" />,
    href: 'https://tiktok.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    bgClass: 'tiktokBg'
  },
  {
    name: 'Line',
    icon: <SiLine className="w-full h-full" />,
    href: 'https://line.me',
    target: '_blank',
    rel: 'noopener noreferrer',
    color: 'bg-[#00C300]'
  },
]

const SocialMedia = () => {
    const [socialMenuOpen, setSocialMenuOpen] = useState(false)
    const [enabled, setEnabled] = useState<boolean>(() => {
        const v = localStorage.getItem('app:social:enabled')
        return v === null ? true : v === 'true'
    })

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail as { enabled?: boolean } | undefined
            if (typeof detail?.enabled === 'boolean') setEnabled(detail.enabled)
        }
        window.addEventListener('app:social:change', handler as EventListener)
        return () => {
            window.removeEventListener('app:social:change', handler as EventListener)
        }
    }, [])

    if (!enabled) return null

    return (
        <div className="fixed bottom-16 left-6 sm:bottom-10 sm:left-10 lg:bottom-6 lg:left-6 z-[60] ">
            {/* Social Media Icons */}
            <div className={`flex flex-col space-y-3 mb-3 transition-all duration-300 ${socialMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                {socialIcons.map((social, index) => (
                    <a
                        key={social.name}
                        href={social.href}
                        target={social.target}
                        rel={social.rel}
                        className={`${styles.socialMediaLink} ${social.bgClass ? styles[social.bgClass] : (social.color || '')} ${styles[`socialDelay${index}`]}`}
                        title={social.name}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>

            {/* Main Chat Icon */}
            <button
                type="button"
                onClick={() => setSocialMenuOpen(!socialMenuOpen)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg shadow-lg bg-orange-600 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:shadow-xl hover:bg-orange-500"
                aria-label="Open social media menu"
            >
                <HiOutlineChatBubbleLeftRight className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-200 ${socialMenuOpen ? 'rotate-360' : ''}`} />
            </button>
        </div>
    );
};

export default SocialMedia;
