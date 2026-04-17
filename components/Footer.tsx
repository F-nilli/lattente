'use client'
import { useState } from 'react'
import Image from 'next/image'
import { InstagramIcon, YouTubeIcon, WhatsAppIcon } from './SocialIcons'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="bg-[#8B5230]" style={{ background: 'linear-gradient(145deg, #9B6240 0%, #8B5230 50%, #6A3C18 100%)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 pb-8 sm:pb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-10 sm:pb-12 border-b border-white/[0.15] mb-8">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start shrink-0">
            <Image src="/images/logo-beige.png" alt="Lattente" width={480} height={165} className="h-[4.5rem] w-auto" />
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center text-center gap-2 w-full lg:flex-1 lg:max-w-md">
            <p className="font-fraunces text-[1.1rem] font-bold text-cream leading-tight">
              Tu dosis semanal de café.
            </p>
            {status === 'done' ? (
              <p className="font-nunito text-[1rem] font-semibold text-cream/80 text-center">¡Gracias! Ya estás suscrito.</p>
            ) : (
            <form onSubmit={handleSubmit} className="flex w-full">
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-white/[0.08] border border-white/[0.18] border-r-0 rounded-l-full px-4 py-[0.65rem] text-white font-nunito text-[1rem] outline-none placeholder:text-white/30 focus:bg-white/[0.13] transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-red text-white border-none rounded-r-full px-4 sm:px-5 py-[0.65rem] font-nunito text-[1rem] font-bold cursor-pointer whitespace-nowrap hover:bg-[#a82219] transition-colors duration-200 disabled:opacity-60"
              >
                {status === 'sending' ? '...' : 'Suscribirme'}
              </button>
            </form>
            )}
            {status === 'error' && (
              <p className="font-nunito text-[0.9rem] font-semibold text-red-300 text-center mt-2">Hubo un error. Intenta de nuevo.</p>
            )}
          </div>

          {/* Social icons */}
          <div className="flex justify-center lg:justify-end gap-5 shrink-0">
            {[
              { href: 'https://www.instagram.com/lattenteco/', icon: <InstagramIcon /> },
              { href: 'https://www.youtube.com/@Lattente-co', icon: <YouTubeIcon /> },
              { href: 'https://wa.me/573246004983', icon: <WhatsAppIcon /> },
            ].map(({ href, icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white transition-colors duration-200">
                {icon}
              </a>
            ))}
          </div>
        </div>

        <p className="font-nunito text-[1rem] font-medium text-white/30 text-center">
          © 2025 Lattente. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
