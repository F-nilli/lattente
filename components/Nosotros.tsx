import Image from 'next/image'
import RevealWrapper from './RevealWrapper'

const CARDS = [
  {
    num: '01',
    title: 'La Autenticidad',
    body: 'Sabemos jugar con las tendencias pero nunca a costa de lo que somos. Todo lo que compartimos, recomendamos u ofrecemos pasa primero por nuestra experiencia real. El formato cambia, la esencia no.',
    img: '/images/nosotros-autenticidad.png',
    alt: 'La Autenticidad',
  },
  {
    num: '02',
    title: 'La Técnica',
    body: 'Ocho años en el mundo del café: tostando, seleccionando origen, detrás de la barra, optimizando operaciones y construyendo marcas. No hablamos de café desde afuera. Lo conocemos desde la semilla hasta la taza.',
    img: '/images/nosotros-tecnica.png',
    alt: 'La Técnica',
  },
  {
    num: '03',
    title: 'La Comunidad',
    body: 'El café de especialidad no es solo una bebida, es un punto de encuentro. Hemos trabajado con las personas, las marcas y los espacios que construyen esta cultura. Lattente nació para ser parte de eso, no para venderle desde lejos.',
    img: '/images/nosotros-comunidad.jpg',
    alt: 'La Comunidad',
  },
]

export default function Nosotros() {
  return (
    <section id="nosotros" className="bg-[#8B5230] py-16 sm:py-20 lg:py-[5.5rem]" style={{ background: 'linear-gradient(145deg, #A06038 0%, #8B5230 50%, #7A4422 100%)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12 pb-8 border-b border-white/[0.15]">
          <div>
            <p className="font-nunito text-[1.1rem] font-semibold text-white/70 mb-2 tracking-[0.05em] uppercase">
              Nuestra filosofía
            </p>
            <h2
              className="font-fraunces text-off-white font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4rem)' }}
            >
              El Ritual de lo<br />Intencional
            </h2>
          </div>
          <p className="font-nunito text-[1.15rem] font-medium text-white/70 sm:max-w-[340px] leading-[1.7] sm:text-right">
            Una Marca creada para elevar la experiencia cafetera y conectar con el café desde el estilo, el conocimiento y la sensibilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {CARDS.map((card, i) => (
            <RevealWrapper
              key={card.num}
              delay={i * 0.1}
              className="bg-[#F5EFE4] rounded-[1.1rem] p-5 relative hover:scale-[1.02] hover:z-10 hover:shadow-[0_20px_48px_rgba(0,0,0,0.18)] transition-all duration-300 cursor-pointer"
            >
              <span className="font-fraunces font-black text-[4.5rem] text-brown/[0.07] absolute top-3 right-6 leading-none pointer-events-none select-none">
                {card.num}
              </span>
              <div className="w-full aspect-[6/5] lg:aspect-[6/8] rounded-[0.6rem] mb-6 overflow-hidden relative">
                <Image src={card.img} alt={card.alt} fill className="object-cover" style={{ objectPosition: 'center 15%' }} />
              </div>
              <h3 className="font-fraunces text-[1.4rem] font-bold text-red mt-4 mb-2">{card.title}</h3>
              <p className="font-nunito text-[1.05rem] leading-[1.7] text-dark/60">{card.body}</p>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
