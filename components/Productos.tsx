import { getCollections } from '@/lib/shopify'
import ProductosCarousel from './ProductosCarousel'

export default async function Productos() {
  let collections: Awaited<ReturnType<typeof getCollections>> = []
  try {
    collections = (await getCollections()).filter(c => c.products.nodes.length > 0)
  } catch (e) {
    console.error('Shopify fetch error:', e)
  }

  return (
    <section id="productos" className="bg-cream py-16 sm:py-20 lg:py-[5.5rem]" style={{ background: 'linear-gradient(150deg, #EDD9B8 0%, #E0CCAD 45%, #D4BE9E 100%)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 sm:mb-12">
          <div>
            <p className="font-nunito text-[1.1rem] font-semibold text-[#D05A3A] mb-2 tracking-[0.05em] uppercase">
              El Rincón Cafetero
            </p>
            <h2
              className="font-fraunces text-brown font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4rem)' }}
            >
              Productos
            </h2>
          </div>
          <a
            href="/products"
            className="font-nunito text-[1.05rem] font-bold tracking-[0.06em] uppercase no-underline bg-red text-white px-8 py-[0.75rem] rounded-full hover:bg-dark hover:-translate-y-0.5 transition-all duration-200 self-start sm:self-auto shadow-md"
          >
            Ver todo →
          </a>
        </div>

        {collections.length === 0 ? (
          <p className="font-nunito text-dark/40 text-center py-16">No hay productos disponibles.</p>
        ) : (
          <ProductosCarousel collections={collections} />
        )}

        <p className="font-nunito text-[1.05rem] font-medium text-dark/60 mt-8 text-center">
          Vendemos al por mayor.{' '}
          <a href="https://wa.me/573246004983" target="_blank" rel="noopener noreferrer" className="font-bold text-red underline hover:text-dark transition-colors duration-200">
            Escríbenos y conversamos.
          </a>
        </p>
      </div>
    </section>
  )
}
