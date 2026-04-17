import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { nombre, apellido, email, mensaje } = await req.json()

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: `"Lattente Web" <${process.env.GMAIL_USER}>`,
    to: 'lattente.info@gmail.com',
    replyTo: email,
    subject: `Nuevo mensaje de ${nombre}${apellido ? ` ${apellido}` : ''} — Lattente`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #8C1D17;">Nuevo mensaje desde lattente.cafe</h2>
        <p><strong>Nombre:</strong> ${nombre}${apellido ? ` ${apellido}` : ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style="border: none; border-top: 1px solid #e0ccad; margin: 16px 0;" />
        <p style="white-space: pre-wrap;">${mensaje}</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
