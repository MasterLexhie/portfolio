import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <p className="font-serif text-2xl md:text-3xl tracking-tight max-w-md">
          Software that ships. Decisions that{' '}
          <em className="italic">hold up</em>.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-wide text-muted mb-3">
              Pages
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/work"
                className="text-sm text-foreground/60 dark:text-foreground/70 hover:text-foreground transition-colors duration-150"
              >
                Work
              </Link>
              <Link
                href="/about"
                className="text-sm text-foreground/60 dark:text-foreground/70 hover:text-foreground transition-colors duration-150"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-foreground/60 dark:text-foreground/70 hover:text-foreground transition-colors duration-150"
              >
                Contact
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wide text-muted mb-3">
              Elsewhere
            </p>
            <div className="flex flex-col gap-2">
              {/* TODO: replace with real URLs */}
              <a
                href="https://github.com/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/60 dark:text-foreground/70 hover:text-foreground transition-colors duration-150"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/60 dark:text-foreground/70 hover:text-foreground transition-colors duration-150"
              >
                LinkedIn
              </a>
              <a
                href="mailto:kanuprecious89@gmail.com"
                className="text-sm text-foreground/60 dark:text-foreground/70 hover:text-foreground transition-colors duration-150"
              >
                Email
              </a>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 md:text-right">
            <p className="text-xs font-mono uppercase tracking-wide text-muted mb-3">
              Status
            </p>
            <div className="flex md:justify-end items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-sm text-muted">
                Available for new work
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Precious Kanu
          </p>
          <p className="text-xs font-mono text-muted">
            Lagos, Nigeria &middot; UTC+1
          </p>
        </div>
      </div>
    </footer>
  )
}
