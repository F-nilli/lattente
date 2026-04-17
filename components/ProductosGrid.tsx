'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ShopifyProduct, ShopifyCollection, formatPrice } from '@/lib/shopify'
import { useCart } from '@/context/CartContext'

function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.images.nodes[0]
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  )
  const available = product.variants.nodes[0]?.availableForSale ?? false
  const variantId = product.variants.nodes[0]?.id
  const { addItem, loading } = useCart()

  return (
    <a
      href={`/products/${product.handle}`}
      className="bg-[#F5EFE4] rounded-[1.1rem] overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 cursor-pointer flex flex-col no-underline"
    >
      <div className="w-full h-[180px] sm:h-[220px] rounded-[0.85rem] m-3 mb-0 overflow-hidden relative" style={{ width: 'calc(100% - 1.5rem)' }}>
        {image ? (
          <Image src={image.url} alt={image.altText ?? product.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#8B654522] to-[#6A3C1133] flex items-center justify-center font-nunito text-[0.93rem] font-medium tracking-[0.1em] text-dark/20 uppercase">
            imagen producto
          </div>
        )}
      </div>
      <div className="px-4 sm:px-5 pt-4 pb-5 flex flex-col gap-1 flex-1">
        <p className="font-nunito text-[1.05rem] sm:text-[1.15rem] font-black text-dark uppercase tracking-[0.03em] leading-[1.2]">
          {product.title}
        </p>
        <p className="font-nunito text-[1.02rem] font-semibold text-dark/55 mb-3">
          {price}
        </p>
        <button
          onClick={e => { e.preventDefault(); if (available && variantId) addItem(variantId) }}
          disabled={!available || loading}
          className="w-full bg-red text-white border-none py-[0.75rem] rounded-full font-nunito text-[0.95rem] font-bold tracking-[0.08em] uppercase cursor-pointer hover:bg-[#6e1510] transition-colors duration-200 mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {available ? 'Añadir al carrito' : 'Agotado'}
        </button>
      </div>
    </a>
  )
}

interface Props {
  collections: ShopifyCollection[]
}

export default function ProductosGrid({ collections }: Props) {
  const searchParams = useSearchParams()
  const initialCollection = searchParams.get('collection')
  const [activeTab, setActiveTab] = useState(() => {
    if (initialCollection) {
      const match = collections.find(c => c.title === initialCollection)
      if (match) return match.title
    }
    return collections[0]?.title ?? ''
  })

  useEffect(() => {
    const col = searchParams.get('collection')
    if (col && collections.find(c => c.title === col)) setActiveTab(col)
  }, [searchParams, collections])

  const filtered = collections.find(c => c.title === activeTab)?.products.nodes ?? []

  return (
    <>
      {/* Category tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto scrollbar-none flex-wrap" style={{ scrollbarWidth: 'none' }}>
        {collections.map(col => (
          <button
            key={col.id}
            onClick={() => setActiveTab(col.title)}
            className={`font-nunito text-[1rem] font-bold px-6 py-[0.6rem] rounded-full cursor-pointer border-2 transition-all duration-200 whitespace-nowrap shrink-0 tracking-[0.05em] uppercase ${
              activeTab === col.title
                ? 'bg-red text-white border-red shadow-md'
                : 'bg-transparent text-brown border-brown/30 hover:border-brown/60 hover:text-brown'
            }`}
          >
            {col.title}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p className="font-nunito text-dark/40 text-center py-16">No hay productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}
