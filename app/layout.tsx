import type { Metadata } from 'next'
import { Fraunces, Lora, Nunito } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/CartDrawer'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lattente — El Ritual de lo Intencional',
  description: 'Accesorios, talleres y contenido para vivir el café de especialidad como se merece. Desde la semilla hasta la taza.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${lora.variable} ${nunito.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
