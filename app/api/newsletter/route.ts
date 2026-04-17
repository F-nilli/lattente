import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email requerido.' }, { status: 400 })
  }

  const dc = process.env.MAILCHIMP_DC
  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
    }),
  })

  const data = await res.json()

  if (res.ok) return NextResponse.json({ ok: true })
  if (data.title === 'Member Exists') return NextResponse.json({ ok: true, already: true })

  return NextResponse.json({ error: data.detail ?? 'Error al suscribirse.' }, { status: 400 })
}
