import { Suspense } from 'react'
import Image from 'next/image'
import { getCollections } from '@/lib/shopify'
import ProductosGrid from '@/components/ProductosGrid'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const revalidate = 60

export default async function ProductsPage() {
  const collections = await getCollections()

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16 sm:py-20 lg:py-[5.5rem]" style={{ background: 'linear-gradient(160deg, #F2E4CA 0%, #E8D4B0 30%, #DECA9E 60%, #D0B88C 100%)' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-10 sm:mb-12">
            <p className="font-nunito text-[1.1rem] font-semibold text-[#D05A3A] mb-2 tracking-[0.05em] uppercase">
              El Rincón Cafetero
            </p>
            <h1
              className="font-fraunces text-brown font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4rem)' }}
            >
              Todos los productos
            </h1>
          </div>
          <Suspense fallback={null}>
            <ProductosGrid collections={collections} />
          </Suspense>
        </div>
      </main>

      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #D0B88C 0%, #C8AE84 50%, #BFA07A 100%)' }}>
        <div className="py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-center gap-8 px-6">
          {/* Copy */}
          <div className="max-w-[420px]">
            <h2 className="font-fraunces text-red font-bold leading-[1.05] tracking-[-0.02em] mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
              ¿Tienes una tienda o cafetería?
            </h2>
            <p className="font-nunito text-[1.05rem] text-dark/55">
              Vendemos al por mayor.{' '}
              <a href="/#contacto" className="font-bold text-red underline underline-offset-4 hover:text-dark transition-colors duration-200">
                Escríbenos y conversamos.
              </a>
            </p>
          </div>
          {/* Image */}
          <div className="relative w-[200px] h-[200px] shrink-0 rounded-[1.1rem] overflow-hidden shadow-[0_12px_32px_rgba(28,10,5,0.15)] rotate-[1deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
            <Image src="/images/pines-wholesale.jpg" alt="Pines Lattente al por mayor" fill className="object-cover object-center" sizes="200px" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
