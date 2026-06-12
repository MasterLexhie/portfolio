import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Precious Kanu',
  description:
    'Full-stack software engineer and product owner with 5 years of experience shipping products from idea to production.',
  openGraph: {
    title: 'About — Precious Kanu',
    description:
      'Full-stack software engineer and product owner with 5 years of experience.',
    images: [{ url: '/og-default.jpg' }],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/about`,
  },
}

const skills = {
  Backend: [
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Redis',
    'BullMQ',
    'Prisma',
    'REST',
    'WebSocket',
  ],
  Frontend: [
    'React',
    'Next.js',
    'Tailwind CSS',
    'Radix UI',
    'tRPC',
    'Storybook',
  ],
  'Product + process': [
    'Discovery',
    'Roadmapping',
    'User interviews',
    'Sprint planning',
    'Technical writing',
  ],
}

const timeline = [
  // TODO: replace with real experience
  { year: '2024', role: 'Contract Engineer', company: 'Multiple clients' },
  { year: '2023', role: 'Full-Stack Engineer', company: 'Drivve Technologies' },
  { year: '2022', role: 'Frontend Engineer', company: 'Tradestack' },
  { year: '2021', role: 'Backend Engineer', company: 'Freelance' },
  { year: '2020', role: 'Junior Developer', company: 'Agency work' },
]

const currently = [
  { label: 'Building', value: 'Contract + consulting practice' },
  { label: 'Available for', value: 'Contracts, consulting, co-founder conversations' },
  { label: 'Interested in', value: 'Fintech, developer tools, B2B SaaS' },
  { label: 'Location', value: 'Lagos, Nigeria' },
]

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="md:grid md:grid-cols-2 md:gap-16">
          {/* Left column — bio */}
          <div className="mb-12 md:mb-0">
            {/* TODO: replace with real avatar */}
            <div className="w-20 h-20 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto md:mx-0 mb-4">
              <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono tracking-wide">
                photo
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl tracking-tight text-center md:text-left">
              Precious Kanu
            </h1>
            <p className="text-sm text-muted mt-1 text-center md:text-left">
              Full-Stack Engineer &middot; Product Owner &middot; Lagos, Nigeria
            </p>

            <div className="mt-6 space-y-4 text-base text-muted leading-relaxed">
              {/* TODO: replace with real bio */}
              <p>
                I&rsquo;ve spent the last five years building software that ships and
                decisions that hold up. Most of that time has been at the intersection
                of engineering and product — writing the code, but also deciding what
                gets built and why.
              </p>
              <p>
                My work tends toward systems that move money, manage inventory, or
                coordinate real-time data. The common thread is complexity that needs to
                be made simple for the people using it.
              </p>
              <p>
                I care about clean architecture, but I care more about outcomes. A system
                that&rsquo;s elegant but ships late is worse than one that&rsquo;s pragmatic
                and running in production.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
              {/* TODO: replace with real URLs */}
              <a
                href="https://github.com/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border rounded-lg px-4 py-2.5 text-sm text-muted hover:text-foreground hover:border-foreground transition-colors min-h-[44px] flex items-center"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border rounded-lg px-4 py-2.5 text-sm text-muted hover:text-foreground hover:border-foreground transition-colors min-h-[44px] flex items-center"
              >
                LinkedIn
              </a>
              <a
                href="mailto:kanuprecious89@gmail.com"
                className="border border-border rounded-lg px-4 py-2.5 text-sm text-muted hover:text-foreground hover:border-foreground transition-colors min-h-[44px] flex items-center"
              >
                Email
              </a>
            </div>
          </div>

          {/* Right column — skills, timeline, currently */}
          <div>
            {/* Skills */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-muted">01</span>
                <span className="text-xs tracking-widest uppercase text-muted">
                  Skills
                </span>
                <span className="flex-1 h-px bg-border" aria-hidden="true" />
              </div>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="mb-4">
                  <p className="text-sm font-medium mb-2">{category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-mono text-muted bg-surface px-2.5 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-muted">02</span>
                <span className="text-xs tracking-widest uppercase text-muted">
                  Experience
                </span>
                <span className="flex-1 h-px bg-border" aria-hidden="true" />
              </div>
              <div className="space-y-0">
                {timeline.map((entry, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[72px_1fr] py-3 border-b border-border last:border-0"
                  >
                    <span className="text-sm font-mono text-muted">
                      {entry.year}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{entry.role}</p>
                      <p className="text-xs text-muted">{entry.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-muted">03</span>
                <span className="text-xs tracking-widest uppercase text-muted">
                  Currently
                </span>
                <span className="flex-1 h-px bg-border" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {currently.map((item) => (
                  <div key={item.label} className="bg-surface rounded-lg p-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-border text-center md:text-left">
          <h2 className="text-2xl md:text-3xl tracking-tight mb-6">
            Let&rsquo;s build something that <em className="italic">matters</em>.
          </h2>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center w-full md:w-auto bg-accent text-accent-foreground px-8 py-3 rounded-lg text-sm hover:bg-accent-hover transition-colors min-h-[44px]"
          >
            Book 20 minutes &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
