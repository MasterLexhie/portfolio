import type { Metadata } from 'next'
import Link from 'next/link'
import { MetricCard } from '@/src/components/MetricCard'
import { CaseStudyCard } from '@/src/components/CaseStudyCard'
import { TestimonialBlock } from '@/src/components/TestimonialBlock'
import { ContactForm } from '@/src/components/ContactForm'
import { SectionHeading } from '@/src/components/SectionHeading'
// TODO: replace with Payload query in Phase 2
import { getFeaturedProjects, getHomepageTestimonials } from '@/src/lib/dummy-data'

export const metadata: Metadata = {
  title: 'Precious Kanu — Full-Stack Engineer & Product Owner',
  description:
    'I build products that ship — from idea to production. Full-stack software engineer with product ownership experience.',
  openGraph: {
    title: 'Precious Kanu — Full-Stack Engineer & Product Owner',
    description:
      'I build products that ship — from idea to production.',
    images: [{ url: '/og-default.jpg' }],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SERVER_URL,
  },
}

export default function HomePage() {
  // TODO: replace with Payload query in Phase 2
  const featured = getFeaturedProjects()
  const testimonials = getHomepageTestimonials()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Precious Kanu',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    jobTitle: 'Full-Stack Software Engineer',
    sameAs: [
      'https://github.com/placeholder', // TODO: replace
      'https://linkedin.com/in/placeholder', // TODO: replace
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Section 1 — Hero */}
      <section className="min-h-[80vh] md:min-h-screen flex items-center relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-0 w-full fade-in">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-foreground/40" aria-hidden="true" />
            <p className="text-xs tracking-widest uppercase text-muted">
              Full-stack engineer &middot; Product owner
            </p>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl leading-[1.08]">
            I build products that <em className="italic">ship</em> — from idea
            to production.
          </h1>
          <p className="text-base md:text-lg text-muted mt-6 max-w-md leading-relaxed">
            End-to-end engineering with a bias toward decisions that hold up
            six months later.
          </p>
          <div className="mt-10">
            <Link
              href="#work"
              className="inline-flex items-center justify-center w-full md:w-auto bg-accent text-white px-8 py-3 rounded-lg text-sm hover:bg-accent/90 transition-colors min-h-[44px]"
            >
              See the work
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-muted">
              Available for contracts and consulting
            </span>
          </div>
        </div>
        <div
          className="absolute bottom-8 left-4 md:left-8 hidden md:flex items-center gap-3"
          aria-hidden="true"
        >
          <span className="text-xs font-mono text-muted">Scroll</span>
          <span className="w-px h-8 bg-border" />
        </div>
      </section>

      {/* Section 2 — Proof numbers */}
      {/* TODO: replace with real data */}
      <section className="border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            <MetricCard value="12" label="Products shipped to production" />
            <MetricCard value="60%" label="Avg. API latency reduction" />
            <MetricCard value="8 wks" label="Fastest 0→1 SaaS build" />
            <MetricCard value="5 yrs" label="Full-stack + product ownership" />
          </div>
        </div>
      </section>

      {/* Section 3 — Featured case studies */}
      <section id="work" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <SectionHeading
            index="01"
            label="Selected work"
            title="Projects I led from discovery to production"
            className="mb-10 md:mb-14"
          />
          {featured.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-8 md:gap-y-14">
              <div className="md:col-span-2">
                <CaseStudyCard project={featured[0]} featured />
              </div>
              {featured.slice(1).map((project) => (
                <CaseStudyCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 4 — Technical depth signal */}
      {/* TODO: owner replaces diagram image and copy */}
      <section className="py-16 md:py-24 lg:py-32 bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <div className="bg-neutral-200 dark:bg-neutral-800 aspect-video rounded-lg flex items-center justify-center mb-8 md:mb-0 border border-border">
              <span className="text-xs font-mono text-muted">
                fig. 01 — matching pipeline
              </span>
            </div>
            <div>
              <SectionHeading
                index="02"
                label="Under the hood"
                title="The reconciliation engine's matching pipeline"
                className="mb-5"
              />
              <p className="text-base text-muted leading-relaxed">
                The system processes ₦2B in monthly transactions across four
                banks, each with its own CSV format and reference scheme. The
                normalisation layer maps all formats into a canonical shape
                before the matching engine runs two passes: exact match on
                cleaned references, then fuzzy match on amount, date, and
                partial reference. Unmatched transactions surface in a manual
                review queue rather than failing silently — the finance team
                resolves roughly 80 per month, down from thousands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="max-w-2xl">
              {testimonials.map((t) => (
                <TestimonialBlock key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 6 — Contact */}
      <section id="contact" className="py-16 md:py-24 lg:py-32 bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="md:grid md:grid-cols-2 md:gap-16">
            <div className="mb-10 md:mb-0">
              <SectionHeading
                index="03"
                label="Get in touch"
                title="Building something? Let's talk for 20 minutes."
                className="mb-5"
              />
              <p className="text-base text-muted leading-relaxed mb-8">
                I take on contract work, consulting engagements, and select
                co-founder conversations. If you have a project that needs an
                engineer who thinks about the product — not just the code —
                reach out.
              </p>
              <div className="flex items-center gap-3">
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
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
