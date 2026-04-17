'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { InstagramIcon, YouTubeIcon, WhatsAppIcon, CartIcon } from './SocialIcons'
import { useCart } from '@/context/CartContext'

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      {open ? (
        <>
          <line x1="4" y1="4" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="4" x2="4" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { openCart, itemCount } = useCart()

  return (
    <nav className="sticky top-0 z-50 bg-off-white/[0.97] backdrop-blur-[12px] border-b border-red/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-[1.1rem] flex items-center justify-between">
        <Link href="/" className="shrink-0 no-underline" onClick={close}>
          <Image src="/images/logo-red.png" alt="Lattente" width={420} height={144} className="h-[4.5rem] w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 lg:gap-11 list-none items-center m-0 p-0">
          {(['Servicios', 'Productos', 'Nosotros', 'Tutoriales'] as const).map(item => (
            <li key={item}>
              <Link
                href={item === 'Productos' ? '/products' : `#${item.toLowerCase()}`}
                className="font-fraunces text-[1.18rem] font-medium text-dark no-underline tracking-[0.02em] hover:text-red transition-colors duration-200"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#contacto"
              className="font-nunito text-[1.18rem] font-bold tracking-[0.08em] uppercase bg-red text-white px-6 py-[0.6rem] rounded-full hover:bg-dark transition-colors duration-200 no-underline"
            >
              Contacto
            </Link>
          </li>
        </ul>

        {/* Desktop social icons */}
        <div className="hidden md:flex items-center gap-4">
          {[
            { href: 'https://www.instagram.com/lattenteco/', icon: <InstagramIcon /> },
            { href: 'https://www.youtube.com/@Lattente-co', icon: <YouTubeIcon /> },
            { href: 'https://wa.me/573246004983', icon: <WhatsAppIcon /> },
          ].map(({ href, icon }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-dark/40 hover:text-red transition-colors duration-200">
              {icon}
            </a>
          ))}
          <button
            onClick={openCart}
            className="text-dark/40 hover:text-red transition-colors duration-200 ml-1 relative"
            aria-label="Ver carrito"
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red text-white text-[0.65rem] font-bold font-nunito w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile right — cart + hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={openCart}
            className="text-dark/50 hover:text-red transition-colors duration-200 relative"
            aria-label="Ver carrito"
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red text-white text-[0.65rem] font-bold font-nunito w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(o => !o)}
            className="text-dark/70 hover:text-red transition-colors duration-200"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden bg-off-white border-t border-red/10 px-6 pt-6 pb-8 flex flex-col gap-6">
          <ul className="list-none p-0 m-0 flex flex-col gap-5">
            {['Servicios', 'Productos', 'Nosotros', 'Tutoriales', 'Contacto'].map(item => (
              <li key={item}>
                <Link
                  href={item === 'Productos' ? '/products' : `#${item.toLowerCase()}`}
                  onClick={close}
                  className="font-fraunces text-[1.3rem] font-medium text-dark no-underline hover:text-red transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#contacto"
            onClick={close}
            className="font-nunito text-[1.08rem] font-bold tracking-[0.08em] uppercase bg-red text-white text-center py-[0.85rem] rounded-full hover:bg-dark transition-colors duration-200 no-underline"
          >
            Conversemos
          </Link>

          <div className="flex gap-5 pt-2 border-t border-brown/10">
            {[
              { href: 'https://www.instagram.com/lattenteco/', icon: <InstagramIcon /> },
              { href: 'https://www.youtube.com/@Lattente-co', icon: <YouTubeIcon /> },
              { href: 'https://wa.me/573246004983', icon: <WhatsAppIcon /> },
            ].map(({ href, icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-dark/40 hover:text-red transition-colors duration-200">
                {icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
