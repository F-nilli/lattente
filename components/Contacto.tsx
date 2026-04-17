'use client'
import { useState } from 'react'
import RevealWrapper from './RevealWrapper'

const INPUT_BASE = 'bg-[#FAF7F2] border border-brown/[0.15] rounded-[0.6rem] px-4 py-[0.8rem] text-dark font-nunito text-[1.05rem] outline-none placeholder:text-dark/[0.3] focus:border-red/60 transition-colors duration-200 w-full'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', mensaje: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ nombre: '', apellido: '', email: '', mensaje: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="bg-cream py-16 sm:py-20 lg:py-[5.5rem]" style={{ background: 'radial-gradient(ellipse at 25% 60%, #EDD9B8 0%, #E0CCAD 65%)' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left column */}
          <RevealWrapper>
            <p className="font-nunito text-[1.1rem] font-semibold text-dark/55 mb-2 tracking-[0.05em] uppercase">
              ¿Hablamos?
            </p>
            <h2
              className="font-fraunces text-dark font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4rem)' }}
            >
              Contáctanos
            </h2>
            <div className="mt-6 pt-6 border-t border-brown/[0.15]">
              <div className="bg-white rounded-[2rem] px-7 py-6 border-2 border-red/60 text-center" style={{ boxShadow: '6px 6px 0px rgba(140,29,23,0.7)' }}>
                <p className="font-fraunces italic text-[1.2rem] sm:text-[1.35rem] leading-[1.5] text-dark/70">
                  "No existe el café perfecto, solo existe el café ideal para tu paladar."
                </p>
                <span className="block font-nunito text-[1.05rem] font-bold not-italic text-red mt-3">
                  — Fundadores de Lattente
                </span>
              </div>
            </div>
          </RevealWrapper>

          {/* Form */}
          <RevealWrapper delay={0.1}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-[0.4rem]">
                  <label className="font-nunito text-[1.02rem] font-semibold text-dark/45">Nombre <span className="text-red">*</span></label>
                  <input type="text" placeholder="Tu nombre" value={form.nombre} onChange={update('nombre')} required className={INPUT_BASE} />
                </div>
                <div className="flex flex-col gap-[0.4rem]">
                  <label className="font-nunito text-[1.02rem] font-semibold text-dark/45">Apellido</label>
                  <input type="text" placeholder="Tu apellido" value={form.apellido} onChange={update('apellido')} className={INPUT_BASE} />
                </div>
              </div>
              <div className="flex flex-col gap-[0.4rem] mb-4">
                <label className="font-nunito text-[1.02rem] font-semibold text-dark/45">Correo electrónico <span className="text-red">*</span></label>
                <input type="email" placeholder="tu@email.com" value={form.email} onChange={update('email')} required className={INPUT_BASE} />
              </div>
              <div className="flex flex-col gap-[0.4rem] mb-4">
                <label className="font-nunito text-[1.02rem] font-semibold text-dark/45">Mensaje <span className="text-red">*</span></label>
                <textarea
                  placeholder="¿En qué podemos ayudarte?"
                  value={form.mensaje}
                  onChange={update('mensaje')}
                  required className={`${INPUT_BASE} min-h-[110px] resize-y`}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-red text-white border-none py-4 rounded-full font-nunito text-[0.98rem] font-bold tracking-[0.06em] cursor-pointer hover:bg-[#a82219] transition-colors duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
              {status === 'sent' && (
                <p className="font-nunito text-[1rem] font-semibold text-green-700 text-center mt-3">¡Mensaje enviado! Te contactaremos pronto.</p>
              )}
              {status === 'error' && (
                <p className="font-nunito text-[1rem] font-semibold text-red text-center mt-3">Hubo un error. Por favor intenta de nuevo.</p>
              )}
            </form>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
