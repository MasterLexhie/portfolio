import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { z } from 'zod'
import { Resend } from 'resend'

// Lazy singletons — constructed on first request so a missing env var
// degrades that request instead of crashing the module at import time
let ratelimit: Ratelimit | null | undefined
function getRatelimit(): Ratelimit | null {
  if (ratelimit !== undefined) return ratelimit
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('Upstash env vars missing — contact form rate limiting disabled')
    ratelimit = null
    return ratelimit
  }
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    analytics: false,
    prefix: 'portfolio_contact',
  })
  return ratelimit
}

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s\-'.]+$/, 'Name contains invalid characters'),
  email: z.email('Invalid email address').max(254, 'Email too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message too long'),
  honeypot: z.string().max(0, 'Bot detected'),
})

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function sanitise(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

export async function POST(request: NextRequest) {
  // Verify content type
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 })
  }

  // Rate limit by IP — fail closed in production if Upstash is unconfigured
  const ip = getClientIp(request)
  const limiter = getRatelimit()
  if (!limiter && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }
  if (limiter) {
    const { success: withinLimit, limit, remaining, reset } = await limiter.limit(ip)
    if (!withinLimit) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
          },
        },
      )
    }
  }

  // Parse body safely
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Validate with Zod
  const result = ContactSchema.safeParse(body)
  if (!result.success) {
    // Honeypot triggered — return fake success silently
    const honeypotError = result.error.issues.find((i) => i.path[0] === 'honeypot')
    if (honeypotError) {
      return NextResponse.json({ success: true }, { status: 200 })
    }
    return NextResponse.json(
      { error: 'Invalid submission', issues: z.flattenError(result.error).fieldErrors },
      { status: 400 },
    )
  }

  const { name, email, message } = result.data

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    console.error('Contact form not configured: RESEND_API_KEY / CONTACT_EMAIL missing')
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 },
    )
  }

  // Sanitise for HTML output only — replyTo/subject use the zod-validated
  // raw values (entity-encoding would corrupt a valid email address)
  const safeName = sanitise(name)
  const safeEmail = sanitise(email)
  const safeMessage = sanitise(message)

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2 style="font-size: 18px; font-weight: 500; margin-bottom: 24px; color: #1C1917;">
            New portfolio enquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #6B7280; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; font-size: 14px; color: #1C1917;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #6B7280; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; font-size: 14px; color: #1C1917;">
                <a href="mailto:${safeEmail}" style="color: #1C1917;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #6B7280; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; font-size: 14px; color: #1C1917; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
          <p style="font-size: 12px; color: #9CA3AF;">
            Sent from portfolio contact form · IP: ${ip}
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

// Reject all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
