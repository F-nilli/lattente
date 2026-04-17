'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Word({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span
      className="inline-block"
      style={{ opacity: 0, animation: 'fadeUp 0.7s ease forwards', animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  )
}

function Steam() {
  return (
    <svg width="48" height="64" viewBox="0 0 48 64" fill="none" className="absolute" style={{ top: '-18px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
      <path d="M12 60 Q8 48 16 36 Q24 24 16 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" style={{ animation: 'steamRise 3s ease-in-out infinite', opacity: 0.45 }} />
      <path d="M24 60 Q20 46 28 34 Q36 22 28 10" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" style={{ animation: 'steamRise 3s ease-in-out infinite', animationDelay: '1s', opacity: 0.35 }} />
      <path d="M36 60 Q32 50 38 40 Q44 30 38 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" style={{ animation: 'steamRise 3s ease-in-out infinite', animationDelay: '2s', opacity: 0.25 }} />
    </svg>
  )
}

export default function Hero() {
  const v60Ref = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      if (v60Ref.current) {
        v60Ref.current.style.transform = `rotate(-3.5deg) translateY(${scrollY * 0.18}px)`
      }
      if (mainRef.current) {
        mainRef.current.style.transform = `rotate(2deg) translateY(${scrollY * 0.08}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="bg-off-white min-h-[calc(100vh-70px)] flex items-center" style={{ background: 'radial-gradient(ellipse at 65% 35%, #EDE0C8 0%, #FAF7F2 65%)' }}>
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 pt-10 pb-12 lg:py-20 grid grid-cols-1 lg:grid-cols-[52%_48%] items-center gap-10 lg:gap-0">
        {/* Text column */}
        <div className="lg:pr-10">
          <h1
            className="font-fraunces font-black leading-[0.93] tracking-[-0.035em] text-red mb-[0.15rem]"
            style={{ fontSize: 'clamp(5.5rem, 20vw, 9.5rem)' }}
          >
            <Word delay={0.05}>Pequeños</Word>
            <br />
            <Word delay={0.2}>Detalles,</Word>
          </h1>

          <span
            className="font-fraunces font-light italic leading-[1.05] tracking-[-0.025em] text-brown block mb-8"
            style={{ fontSize: 'clamp(5.5rem, 20vw, 9.5rem)' }}
          >
            <Word delay={0.35}>Grandes</Word>{' '}
            <Word delay={0.45}>Momentos</Word>
          </span>

          <p
            className="font-lora text-[1.55rem] lg:text-[1.4rem] italic leading-[1.8] text-dark/[0.68] lg:max-w-[540px] mb-10"
            style={{ opacity: 0, animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.55s' }}
          >
            Accesorios, talleres y contenido para vivir el café de especialidad como se merece. Desde la semilla hasta la taza.
          </p>

          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-7"
            style={{ opacity: 0, animation: 'fadeUp 0.7s ease forwards', animationDelay: '0.65s' }}
          >
            <Link
              href="#contacto"
              className="text-center bg-red text-white px-12 py-[1.2rem] rounded-full font-lora text-[1.45rem] lg:text-[1.35rem] font-semibold tracking-[0.1em] uppercase no-underline hover:bg-dark hover:-translate-y-0.5 transition-all duration-200"
            >
              Conversemos
            </Link>
            <Link
              href="/products"
              className="text-center font-lora text-[1.4rem] lg:text-[1.3rem] italic font-medium text-brown no-underline border-b border-brown/[0.38] pb-[2px] hover:text-red hover:border-red transition-all duration-200"
            >
              Ver productos →
            </Link>
          </div>
        </div>

        {/* Visual column — hidden on mobile */}
        <div className="hidden lg:block relative h-[680px] w-full" style={{ overflow: 'visible' }}>
          <div className="absolute w-[520px] h-[520px] bg-cream top-1/2 left-[32%] -translate-x-1/2 -translate-y-1/2" style={{ borderRadius: '50%', animation: 'blobMorph 8s ease-in-out infinite' }} />

          {/* V60 card with parallax + steam */}
          <div
            ref={v60Ref}
            className="absolute w-[265px] h-[330px] top-[310px] left-[95px] rounded-[2rem] overflow-visible shadow-[0_20px_56px_rgba(28,10,5,0.2)] bg-sage z-[1] hover:shadow-[0_28px_64px_rgba(28,10,5,0.28)] transition-shadow duration-300 cursor-pointer"
            style={{ transform: 'rotate(-3.5deg)', willChange: 'transform' }}
          >
            <div className="w-full h-full rounded-[2rem] overflow-hidden" style={{ clipPath: 'inset(0 round 2rem)' }}>
              <Image src="/images/hero-v60.jpg" alt="V60 café de especialidad" fill className="object-cover" />
            </div>
            <Steam />
          </div>

          {/* Main photo with slower parallax */}
          <div
            ref={mainRef}
            className="absolute w-[350px] h-[465px] top-[55px] left-[290px] rounded-[1.2rem] overflow-hidden shadow-[0_20px_56px_rgba(28,10,5,0.2)] bg-brown z-[2] hover:shadow-[0_28px_64px_rgba(28,10,5,0.28)] transition-shadow duration-300 cursor-pointer"
            style={{ transform: 'rotate(2deg)', willChange: 'transform' }}
          >
            <Image src="/images/hero-principal.png" alt="Certificada con pasión" fill className="object-cover object-top" />
          </div>

          <div className="absolute top-[44px] left-[500px] bg-cream text-brown font-lora text-[1.08rem] italic px-4 py-[0.38rem] rounded-full border border-brown/[0.28] whitespace-nowrap shadow-sm rotate-[20deg] z-[3]">
            Certificada con pasión
          </div>
        </div>
      </div>
    </section>
  )
}
