'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ThemeToggle } from './ThemeToggle'

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const wasOpen = useRef(false)
  useEffect(() => {
    if (menuOpen) {
      closeButtonRef.current?.focus()
    } else if (wasOpen.current) {
      // Only restore focus when the menu was actually open (not on mount)
      hamburgerRef.current?.focus()
    }
    wasOpen.current = menuOpen
  }, [menuOpen])

  function handleOverlayKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      setMenuOpen(false)
      return
    }
    // Trap Tab within the overlay while it is open
    if (e.key !== 'Tab' || !overlayRef.current) return
    const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

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
            aria-current={isActive('/work') ? 'page' : undefined}
            className={`text-sm transition-colors min-h-[44px] flex items-center ${
              isActive('/work')
                ? 'text-foreground underline underline-offset-8 decoration-1'
                : 'text-muted hover:text-foreground'
            }`}
          >
            Work
          </Link>
          <Link
            href="/about"
            aria-current={isActive('/about') ? 'page' : undefined}
            className={`text-sm transition-colors min-h-[44px] flex items-center ${
              isActive('/about')
                ? 'text-foreground underline underline-offset-8 decoration-1'
                : 'text-muted hover:text-foreground'
            }`}
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
            ref={hamburgerRef}
            onClick={() => setMenuOpen(true)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onKeyDown={handleOverlayKeyDown}
          className="fixed inset-0 z-50 bg-background flex flex-col md:hidden"
        >
          <div className="flex items-center justify-between px-4 h-16 border-b border-border">
            <Link
              href="/"
              className="font-serif text-xl tracking-tight"
              onClick={() => setMenuOpen(false)}
            >
              Precious Kanu
            </Link>
            <button
              ref={closeButtonRef}
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
              aria-current={isActive('/work') ? 'page' : undefined}
              className={`text-2xl font-serif py-3 min-h-[48px] flex items-center ${
                isActive('/work')
                  ? 'underline underline-offset-8 decoration-1'
                  : 'text-muted'
              }`}
            >
              Work
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              aria-current={isActive('/about') ? 'page' : undefined}
              className={`text-2xl font-serif py-3 min-h-[48px] flex items-center ${
                isActive('/about')
                  ? 'underline underline-offset-8 decoration-1'
                  : 'text-muted'
              }`}
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
