'use client'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/shopify'

export default function CartDrawer() {
  const { cart, cartOpen, closeCart, removeItem, updateItem, loading } = useCart()
  const lines = cart?.lines.nodes ?? []

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#FAF7F2] z-50 flex flex-col shadow-2xl transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brown/[0.12]">
          <h2 className="font-fraunces text-[1.5rem] font-bold text-dark">Tu carrito</h2>
          <button onClick={closeCart} className="text-dark/40 hover:text-dark transition-colors duration-200 p-1">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {lines.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-20 text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-brown/25">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
                <path d="M14 18h20l-2.5 13H16.5L14 18z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M19 18v-2a5 5 0 0110 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p className="font-nunito text-[1.05rem] font-semibold text-dark/40">Tu carrito está vacío</p>
              <button onClick={closeCart} className="font-nunito text-[0.95rem] font-bold text-red hover:underline mt-1">
                Seguir comprando →
              </button>
            </div>
          ) : (
            lines.map(line => (
              <div key={line.id} className="flex gap-4 bg-white rounded-[0.85rem] p-3 shadow-sm">
                <div className="w-[72px] h-[72px] rounded-[0.6rem] overflow-hidden relative shrink-0 bg-[#F0EAE0]">
                  {line.merchandise.image ? (
                    <Image src={line.merchandise.image.url} alt={line.merchandise.image.altText ?? line.merchandise.product.title} fill className="object-cover" sizes="72px" />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-nunito text-[0.95rem] font-black text-dark uppercase tracking-[0.02em] leading-tight truncate">
                    {line.merchandise.product.title}
                  </p>
                  {line.merchandise.title !== 'Default Title' && (
                    <p className="font-nunito text-[0.85rem] text-dark/50 mt-[2px]">{line.merchandise.title}</p>
                  )}
                  <p className="font-nunito text-[0.95rem] font-semibold text-dark/60 mt-1">
                    {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-brown/20 rounded-full overflow-hidden">
                      <button
                        onClick={() => line.quantity > 1 ? updateItem(line.id, line.quantity - 1) : removeItem(line.id)}
                        disabled={loading}
                        className="w-7 h-7 flex items-center justify-center font-nunito text-[1.1rem] text-dark/60 hover:text-dark hover:bg-brown/[0.08] transition-colors disabled:opacity-40"
                      >−</button>
                      <span className="font-nunito text-[0.9rem] font-bold text-dark w-6 text-center">{line.quantity}</span>
                      <button
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={loading}
                        className="w-7 h-7 flex items-center justify-center font-nunito text-[1.1rem] text-dark/60 hover:text-dark hover:bg-brown/[0.08] transition-colors disabled:opacity-40"
                      >+</button>
                    </div>
                    <button onClick={() => removeItem(line.id)} disabled={loading} className="font-nunito text-[0.82rem] text-dark/35 hover:text-red transition-colors disabled:opacity-40">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && cart && (
          <div className="px-6 py-5 border-t border-brown/[0.12] flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-nunito text-[1.05rem] font-semibold text-dark/60">Total</span>
              <span className="font-fraunces text-[1.3rem] font-bold text-dark">
                {formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}
              </span>
            </div>
            <a
              href={cart.checkoutUrl.replace(/https?:\/\/[^/]+/, 'https://lattente-5.myshopify.com')}
              className="w-full bg-red text-white text-center py-4 rounded-full font-nunito text-[1rem] font-bold tracking-[0.06em] uppercase no-underline hover:bg-[#a82219] transition-colors duration-200"
            >
              Finalizar compra →
            </a>
            <button onClick={closeCart} className="font-nunito text-[0.95rem] font-semibold text-dark/40 hover:text-dark transition-colors text-center">
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
