import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Nosotros from '@/components/Nosotros'
import Servicios from '@/components/Servicios'
import Productos from '@/components/Productos'
import Tutoriales from '@/components/Tutoriales'
import Contacto from '@/components/Contacto'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Servicios />
      <Productos />
      <Nosotros />
      <Tutoriales />
      <Contacto />
      <Footer />
    </>
  )
}
