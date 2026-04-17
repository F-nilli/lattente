import Link from 'next/link'
import Image from 'next/image'
import RevealWrapper from './RevealWrapper'

const SIDE_ITEMS = [
  { date: '25 Mar 2026', title: 'Te enseño el ratio de café perfecto en menos de 4 minutos', url: 'https://www.youtube.com/watch?v=mf-lyynPbkA', thumb: 'https://img.youtube.com/vi/mf-lyynPbkA/hqdefault.jpg' },
  { date: '25 Mar 2026', title: 'Cómo preparar café de especialidad en cada destino', url: 'https://www.youtube.com/watch?v=I0Zfr1VRIFk', thumb: 'https://img.youtube.com/vi/I0Zfr1VRIFk/hqdefault.jpg' },
  { date: '25 Mar 2026', title: 'El secreto para hacer la mejor prensa francesa en casa', url: 'https://www.youtube.com/watch?v=A7kp8ZdlWuQ&t=39s', thumb: 'https://img.youtube.com/vi/A7kp8ZdlWuQ/hqdefault.jpg' },
]

const FEATURED_THUMB = 'https://img.youtube.com/vi/lSfSF26833s/maxresdefault.jpg'

function PlayIcon({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  const dims = size === 'lg' ? 'w-[62px] h-[62px]' : 'w-[30px] h-[30px]'
  const arrow = size === 'lg' ? { w: 17, h: 20 } : { w: 10, h: 12 }
  return (
    <div className={`${dims} bg-cream/10 rounded-full border border-cream/20 flex items-center justify-center shrink-0 group-hover:bg-[#D05A3A] group-hover:border-[#D05A3A] transition-colors duration-300`}>
      <svg width={arrow.w} height={arrow.h} viewBox="0 0 17 20" fill="none" aria-hidden>
        <path d="M1 1L16 10L1 19V1Z" fill="rgba(232,222,202,0.85)" />
      </svg>
    </div>
  )
}

export default function Tutoriales() {
  return (
    <section id="tutoriales" className="bg-warm py-16 sm:py-20 lg:py-[5.5rem]" style={{ background: 'linear-gradient(155deg, #DEC9A8 0%, #D4B896 50%, #C8AA80 100%)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 sm:mb-12">
          <div>
            <p className="font-nunito text-[1.1rem] font-semibold text-[#D05A3A] mb-2 tracking-[0.05em] uppercase">
              Aprende con nosotros
            </p>
            <h2
              className="font-fraunces text-brown font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4rem)' }}
            >
              Últimos Tutoriales
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@Lattente-co"
            target="_blank"
            rel="noopener noreferrer"
            className="font-nunito text-[1.05rem] font-semibold text-brown no-underline border-b border-brown/[0.38] pb-[2px] hover:text-[#D05A3A] hover:border-[#D05A3A] transition-all duration-200 self-start sm:self-auto"
          >
            Ver todos →
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5 lg:gap-6 items-start">
          {/* Featured tutorial */}
          <a href="https://www.youtube.com/watch?v=lSfSF26833s&t=1s" target="_blank" rel="noopener noreferrer" className="block no-underline">
          <RevealWrapper className="group bg-off-white rounded-[1rem] overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(0,0,0,0.2)] transition-all duration-300">
            <div className="w-full aspect-video relative flex items-center justify-center overflow-hidden">
              <Image src={FEATURED_THUMB} alt="Tutorial destacado" fill className="object-cover" />
              <div className="absolute inset-0 bg-dark/20" />
              <span className="absolute top-4 left-4 font-nunito text-[0.98rem] font-semibold text-cream/90 bg-dark/50 px-3 py-[0.3rem] rounded-full z-10">
                Tutorial destacado
              </span>
              <div className="relative z-10"><PlayIcon size="lg" /></div>
            </div>
            <div className="px-6 sm:px-7 py-5 sm:py-6">
              <div className="flex items-center gap-4 mb-3">
                <span className="font-nunito text-[0.98rem] font-bold text-[#D05A3A] bg-[#D05A3A]/10 px-[0.7rem] py-[0.25rem] rounded-full">
                  Salud & Café
                </span>
              </div>
              <h3 className="font-fraunces text-[1.1rem] sm:text-[1.2rem] font-bold text-dark leading-[1.4]">
                El café que tomas cada mañana te está enfermando (y no lo sabías)
              </h3>
            </div>
          </RevealWrapper>
          </a>

          {/* Side list */}
          <RevealWrapper delay={0.1} className="flex flex-col gap-3">
            {SIDE_ITEMS.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[160px_1fr] bg-off-white rounded-[0.85rem] overflow-hidden border border-brown/10 cursor-pointer hover:border-[#D05A3A]/40 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 no-underline"
              >
                <div className="relative aspect-video bg-dark flex items-center justify-center overflow-hidden">
                  <Image src={item.thumb} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-dark/10" />
                  <div className="relative z-10"><PlayIcon size="sm" /></div>
                </div>
                <div className="px-5 py-4 flex flex-col justify-center">
                  <p className="font-nunito text-[1.05rem] font-bold text-dark leading-[1.4]">{item.title}</p>
                </div>
              </a>
            ))}
          </RevealWrapper>
        </div>

      </div>
    </section>
  )
}
