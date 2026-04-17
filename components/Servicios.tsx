import Link from 'next/link'
import Image from 'next/image'
import RevealWrapper from './RevealWrapper'

const SERVICES = [
  {
    num: '— 01',
    title: 'Estrategia Digital',
    sub: 'UGC, videos & copywriting de autor',
    body: 'Nuestra estrategia de contenido se basa en la honestidad del producto y la autenticidad del proceso. Desarrollamos narrativas que llevan al consumidor desde la finca hasta la taza, explorando cada etapa con una mirada fresca: origen, proceso, método y nuevas formas de vivirlo.',
    tags: ['Video cinematic', 'Storytelling', 'Identidad digital'],
  },
  {
    num: '— 02',
    title: 'Consultoría Cafetera',
    sub: 'Diseño de barra, menús & capacitación',
    body: 'La eficiencia se encuentra con la excelencia. Auditamos flujos de trabajo en barra, diseñamos cartas estacionales y formamos equipos con precisión técnica.',
    tags: ['Auditoría de barra', 'Menús estacionales', 'Capacitación'],
  },
  {
    num: '— 03',
    title: 'Experiencias & Eventos',
    sub: 'Talleres de Cold Brew & conferencias',
    body: 'Creamos puentes entre el experto y el entusiasta. Experiencias inmersivas diseñadas para educar el paladar. Disponibles para grupos privados y eventos corporativos.',
    tags: ['Cold Brew', 'Cata sensorial', 'Talleres'],
  },
]

export default function Servicios() {
  return (
    <section id="servicios" className="py-16 sm:py-20 lg:py-[5.5rem] overflow-hidden" style={{ background: 'linear-gradient(145deg, #4A6048 0%, #3D5040 50%, #2E3C30 100%)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Header row with floating images */}
        <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 pb-10 border-b border-white/[0.1]">
          <div className="lg:max-w-[55%]">
            <p className="font-nunito text-[1.1rem] font-semibold text-[#D05A3A] mb-3 tracking-[0.05em] uppercase">
              Qué ofrecemos
            </p>
            <h2
              className="font-fraunces text-cream font-bold leading-[1.0] tracking-[-0.03em] mb-5"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4rem)' }}
            >
              Servicios que<br />mueven marcas
            </h2>
            <p className="font-fraunces italic text-[1.2rem] sm:text-[1.35rem] text-cream/40 leading-[1.5] max-w-[440px]">
              Elevamos la cultura cafetera con precisión técnica y narrativa visual.
            </p>
          </div>

          {/* Floating images — hidden on mobile */}
          <div className="hidden lg:block relative w-[300px] h-[220px] shrink-0">
            <div className="absolute w-[155px] h-[200px] top-0 left-0 rounded-[1rem] overflow-hidden rotate-[-4deg] z-[1] hover:rotate-[-5deg] transition-all duration-300 cursor-pointer">
              <Image src="/images/servicios-left.png" alt="Estrategia digital" fill className="object-cover object-top" />
            </div>
            <div className="absolute w-[180px] h-[232px] top-4 left-[125px] rounded-[1rem] overflow-hidden rotate-[4deg] z-[2] hover:rotate-[5deg] transition-all duration-300 cursor-pointer">
              <Image src="/images/servicios-right.png" alt="Consultoría cafetera" fill className="object-cover object-top" />
            </div>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((svc, i) => (
            <RevealWrapper
              key={svc.num}
              delay={i * 0.1}
              className="bg-[#F5EFE4] border border-brown/10 rounded-[1rem] p-7 lg:p-8 flex flex-col cursor-pointer hover:border-red hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              <p className="font-nunito text-[1.02rem] font-bold text-[#D05A3A]/70 mb-5 tracking-[0.05em]">{svc.num}</p>
              <h3 className="font-fraunces text-[1.7rem] font-bold text-red mb-[0.3rem]">{svc.title}</h3>
              <p className="font-nunito text-[0.98rem] font-semibold text-brown mb-[1.1rem] pb-[1.1rem] border-b border-brown/10">
                {svc.sub}
              </p>
              <p className="font-nunito text-[1.08rem] leading-[1.7] text-dark/85 flex-1 mb-6">{svc.body}</p>
              <div className="flex flex-wrap gap-[0.4rem]">
                {svc.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-nunito text-[0.95rem] font-bold px-4 py-[0.35rem] rounded-full bg-red/10 border border-red/25 text-red hover:bg-red hover:text-white hover:border-red transition-all duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </RevealWrapper>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#contacto"
            className="inline-block bg-red text-white px-10 py-[1rem] rounded-full font-nunito text-[1.1rem] font-bold tracking-[0.08em] uppercase no-underline hover:bg-[#D05A3A] hover:-translate-y-0.5 transition-all duration-200"
          >
            Cotizar un servicio
          </Link>
        </div>
      </div>
    </section>
  )
}
