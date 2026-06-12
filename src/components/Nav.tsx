'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/95 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-serif text-xl tracking-tight">
          Precious Kanu
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/work"
            className="text-sm text-muted hover:text-foreground transition-colors min-h-[44px] flex items-center"
          >
            Work
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted hover:text-foreground transition-colors min-h-[44px] flex items-center"
          >
            About
          </Link>
          <ThemeToggle />
          <Link
            href="/#contact"
            className="text-sm bg-accent text-accent-foreground px-5 py-2.5 rounded-lg hover:bg-accent-hover transition-colors min-h-[44px] flex items-center"
          >
            Contact
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col md:hidden">
          <div className="flex items-center justify-between px-4 h-16 border-b border-border">
            <Link
              href="/"
              className="font-serif text-xl tracking-tight"
              onClick={() => setMenuOpen(false)}
            >
              Precious Kanu
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col px-4 pt-8 gap-2">
            <Link
              href="/work"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-serif py-3 min-h-[48px] flex items-center"
            >
              Work
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-serif py-3 min-h-[48px] flex items-center"
            >
              About
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-serif py-3 min-h-[48px] flex items-center"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
