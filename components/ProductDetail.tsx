'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ShopifyProductDetail, formatPrice } from '@/lib/shopify'
import { useCart } from '@/context/CartContext'

export default function ProductDetail({ product }: { product: ShopifyProductDetail }) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map(o => [o.name, o.values[0]]))
  )
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem, loading } = useCart()

  const selectedVariant = product.variants.nodes.find(v =>
    v.selectedOptions.every(o => selectedOptions[o.name] === o.value)
  ) ?? product.variants.nodes[0]

  const hasOptions = product.options.some(o => !(o.values.length === 1 && o.values[0] === 'Default Title'))
  const images = product.images.nodes
  const isCamisas = product.collections.nodes.some(c => c.title === 'Camisas')

  const prev = () => setActiveImage(i => (i - 1 + images.length) % images.length)
  const next = () => setActiveImage(i => (i + 1) % images.length)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      {/* Images */}
      <div className="flex flex-col gap-3">
        <div className={`relative w-full rounded-[1.4rem] overflow-hidden bg-[#F5EFE4] ${isCamisas ? 'aspect-[9/16]' : 'aspect-square'}`}>
          {images[activeImage] && (
            <Image
              src={images[activeImage].url}
              alt={images[activeImage].altText ?? product.title}
              fill
              className={isCamisas ? 'object-contain' : 'object-cover'}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          )}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200 backdrop-blur-sm"
                aria-label="Imagen anterior"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="#1C1009" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all duration-200 backdrop-blur-sm"
                aria-label="Imagen siguiente"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="#1C1009" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === activeImage ? 'bg-white scale-125' : 'bg-white/50'}`} />
                ))}
              </div>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative shrink-0 rounded-[0.7rem] overflow-hidden border-2 transition-all duration-200 ${isCamisas ? 'w-[48px] h-[72px]' : 'w-[72px] h-[72px]'} ${i === activeImage ? 'border-red' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <Image src={img.url} alt={img.altText ?? ''} fill className="object-cover" sizes="72px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col">

        <h1 className="font-fraunces text-dark font-bold leading-[1.05] tracking-[-0.02em] mb-4" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)' }}>
          {product.title}
        </h1>

        <p className="font-nunito text-[1.7rem] font-bold text-dark mb-7">
          {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
        </p>

        {/* Variant selectors */}
        {hasOptions && product.options.map(option => (
          <div key={option.name} className="mb-5">
            <p className="font-nunito text-[1rem] font-bold text-dark/60 uppercase tracking-[0.06em] mb-2">
              {option.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {option.values.map(value => (
                <button
                  key={value}
                  onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                  className={`font-nunito text-[0.95rem] font-semibold px-4 py-[0.5rem] rounded-full border-2 transition-all duration-200 ${
                    selectedOptions[option.name] === value
                      ? 'bg-red text-white border-red'
                      : 'bg-white text-dark border-brown/25 hover:border-brown/50'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Description */}
        {product.descriptionHtml && (
          <div
            className="mb-6 font-nunito text-[1.1rem] leading-[1.85] text-dark/75"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        )}

        {/* Quantity + Add to cart */}
        <div className="flex gap-3 mb-2">
          <div className="flex items-center border-2 border-brown/25 rounded-full overflow-hidden bg-white">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-11 h-11 flex items-center justify-center font-nunito text-[1.3rem] text-dark/60 hover:text-dark hover:bg-brown/[0.06] transition-colors"
            >−</button>
            <span className="font-nunito text-[1.1rem] font-bold text-dark w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-11 h-11 flex items-center justify-center font-nunito text-[1.3rem] text-dark/60 hover:text-dark hover:bg-brown/[0.06] transition-colors"
            >+</button>
          </div>
          <button
            onClick={() => selectedVariant && addItem(selectedVariant.id, quantity)}
          disabled={!selectedVariant?.availableForSale || loading}
            className="flex-1 bg-red text-white py-[1.1rem] rounded-full font-nunito text-[1.1rem] font-bold tracking-[0.06em] uppercase hover:bg-[#a82219] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!selectedVariant?.availableForSale ? 'Agotado' : loading ? 'Añadiendo...' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}
