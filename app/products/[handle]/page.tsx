import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProduct, getCollectionProducts, formatPrice } from '@/lib/shopify'
import ProductDetail from '@/components/ProductDetail'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const revalidate = 60

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle)
  if (!product) notFound()

  const collectionHandle = product.collections.nodes[0]?.handle
  const collectionTitle = product.collections.nodes[0]?.title

  const similar = collectionHandle
    ? (await getCollectionProducts(collectionHandle, 9)).filter(p => p.handle !== params.handle).slice(0, 4)
    : []

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16 sm:py-20" style={{ background: 'linear-gradient(150deg, #EDD9B8 0%, #E0CCAD 45%, #D4BE9E 100%)' }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14">
          <a
            href={collectionTitle ? `/products?collection=${encodeURIComponent(collectionTitle)}` : '/products'}
            className="font-nunito text-[1.15rem] font-bold text-dark/60 hover:text-red transition-colors duration-200 mb-8 inline-flex items-center gap-2"
          >
            ← Todos los productos
          </a>
          <ProductDetail product={product} />

          {similar.length > 0 && (
            <div className="mt-20 pt-12 border-t border-brown/[0.15]">
              <p className="font-nunito text-[1.1rem] font-semibold text-[#D05A3A] mb-2 tracking-[0.05em] uppercase">
                {collectionTitle}
              </p>
              <h2 className="font-fraunces text-dark font-bold leading-[1.05] tracking-[-0.02em] mb-8" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
                Productos similares
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {similar.map(p => {
                  const img = p.images.nodes[0]
                  const available = p.variants.nodes[0]?.availableForSale ?? false
                  return (
                    <a key={p.id} href={`/products/${p.handle}`} className="bg-[#F5EFE4] rounded-[1.1rem] overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 flex flex-col no-underline">
                      <div className="w-full h-[180px] sm:h-[220px] rounded-[0.85rem] m-3 mb-0 overflow-hidden relative" style={{ width: 'calc(100% - 1.5rem)' }}>
                        {img ? (
                          <Image src={img.url} alt={img.altText ?? p.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#8B654522] to-[#6A3C1133]" />
                        )}
                      </div>
                      <div className="px-4 sm:px-5 pt-4 pb-5 flex flex-col gap-1 flex-1">
                        <p className="font-nunito text-[1.05rem] font-black text-dark uppercase tracking-[0.03em] leading-[1.2]">{p.title}</p>
                        <p className="font-nunito text-[1rem] font-semibold text-dark/55 mb-3">{formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}</p>
                        <span className={`w-full text-center py-[0.7rem] rounded-full font-nunito text-[0.9rem] font-bold tracking-[0.08em] uppercase mt-auto ${available ? 'bg-red text-white' : 'bg-dark/10 text-dark/40'}`}>
                          {available ? 'Ver producto' : 'Agotado'}
                        </span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
