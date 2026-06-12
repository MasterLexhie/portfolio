'use client'

import { useState, type FormEvent } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name = data.get('name') as string
    const email = data.get('email') as string
    const message = data.get('message') as string

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      // Fallback to mailto
      window.location.href = `mailto:kanuprecious89@gmail.com?subject=Project inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`
      setStatus('sent')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block text-sm text-muted mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border border-border bg-background rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
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
          className="w-full border border-border bg-background rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
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
          className="w-full border border-border bg-background rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Tell me about the project, timeline, and what you need help with."
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-accent text-white px-6 py-3 rounded-lg text-sm hover:bg-accent/90 transition-colors min-h-[44px] disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent' : 'Book 20 minutes'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">
          Something went wrong. Try emailing directly at kanuprecious89@gmail.com
        </p>
      )}
    </form>
  )
}
