'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShopifyCollection, formatPrice } from '@/lib/shopify'
import { useCart } from '@/context/CartContext'

export default function ProductosCarousel({ collections }: { collections: ShopifyCollection[] }) {
  const [indices, setIndices] = useState<number[]>(collections.map(() => 0))
  const { addItem, loading } = useCart()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => prev.map((idx, i) => {
        const count = collections[i].products.nodes.length
        return count > 1 ? (idx + 1) % count : idx
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [collections])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {collections.map((col, i) => {
        const product = col.products.nodes[indices[i]]
        if (!product) return null
        const image = product.images.nodes[0]
        const price = formatPrice(
          product.priceRange.minVariantPrice.amount,
          product.priceRange.minVariantPrice.currencyCode
        )
        const available = product.variants.nodes[0]?.availableForSale ?? false

        return (
          <a
            key={col.id}
            href={`/products/${product.handle}`}
            className="bg-[#F5EFE4] rounded-[1.1rem] overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 cursor-pointer flex flex-col no-underline"
          >
            <div className="w-full h-[180px] sm:h-[220px] rounded-[0.85rem] m-3 mb-0 overflow-hidden relative" style={{ width: 'calc(100% - 1.5rem)' }}>
              {image ? (
                <Image
                  key={product.id}
                  src={image.url}
                  alt={image.altText ?? product.title}
                  fill
                  className="object-cover transition-opacity duration-700"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#8B654522] to-[#6A3C1133] flex items-center justify-center font-nunito text-[0.93rem] font-medium tracking-[0.1em] text-dark/20 uppercase">
                  imagen producto
                </div>
              )}
              <span className="absolute bottom-2 right-2 bg-black/30 text-white font-nunito text-[0.75rem] font-bold px-2 py-[2px] rounded-full tracking-[0.05em] uppercase">
                {col.title}
              </span>
            </div>
            <div className="px-4 sm:px-5 pt-4 pb-5 flex flex-col gap-1 flex-1">
              <p className="font-nunito text-[1.05rem] sm:text-[1.15rem] font-black text-dark uppercase tracking-[0.03em] leading-[1.2]">
                {product.title}
              </p>
              <p className="font-nunito text-[1.02rem] font-semibold text-dark/55 mb-3">
                {price}
              </p>
              <button
                onClick={e => { e.preventDefault(); if (available) addItem(product.variants.nodes[0].id) }}
                disabled={!available || loading}
                className="w-full bg-red text-white border-none py-[0.75rem] rounded-full font-nunito text-[0.95rem] font-bold tracking-[0.08em] uppercase cursor-pointer hover:bg-[#6e1510] transition-colors duration-200 mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {available ? 'Añadir' : 'Agotado'}
              </button>
            </div>
          </a>
        )
      })}
    </div>
  )
}
