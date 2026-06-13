'use client'

import { useState, type FormEvent } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name = data.get('name') as string
    const email = data.get('email') as string
    const message = data.get('message') as string

    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, honeypot }),
      })

      const result = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (res.status === 429) {
          setErrorMessage(
            'You have already sent a message recently. Please try again in an hour.',
          )
        } else {
          setErrorMessage(result.error || 'Something went wrong. Please try again.')
        }
        setStatus('error')
        return
      }

      setStatus('sent')
      form.reset()
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-8" role="status">
        <p className="text-foreground font-medium mb-2">Message sent.</p>
        <p className="text-muted text-sm">
          I&rsquo;ll get back to you within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-4">
      {/* Honeypot — hidden from real users, traps bots */}
      <input
        type="text"
        name="honeypot"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute opacity-0 -top-[9999px] left-0 w-0 h-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div>
        <label htmlFor="name" className="block text-sm text-muted mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border border-border bg-background rounded-lg px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-accent transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-muted mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-border bg-background rounded-lg px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-accent transition-colors"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-muted mb-1.5">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full border border-border bg-background rounded-lg px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-accent transition-colors resize-none"
          placeholder="Tell me about the project, timeline, and what you need help with."
        />
      </div>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full md:w-auto md:self-start bg-accent text-accent-foreground px-8 py-3 rounded-lg text-sm hover:bg-accent-hover transition-colors min-h-[44px] disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : 'Book 20 minutes'}
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {status === 'sending' ? 'Sending message' : ''}
      </p>
    </form>
  )
}
