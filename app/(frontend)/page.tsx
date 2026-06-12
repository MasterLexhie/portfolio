import type { Metadata } from 'next'
import { MetricCard } from '@/src/components/MetricCard'
import { CaseStudyCard } from '@/src/components/CaseStudyCard'
import { TestimonialBlock } from '@/src/components/TestimonialBlock'
import { ContactForm } from '@/src/components/ContactForm'
import { SectionHeading } from '@/src/components/SectionHeading'
import { HeroContent } from '@/src/components/HeroContent'
import { FadeIn } from '@/src/components/FadeIn'
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
      <section className="min-h-[80vh] md:min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-0 md:pb-[10vh] w-full">
          <HeroContent />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-[0.16] dark:opacity-[0.10] pointer-events-none select-none">
          <pre className="font-mono text-xs text-foreground leading-relaxed">
{`// reconciliation.match.ts
async function matchTransaction(
  bank: BankEntry,
  ledger: LedgerEntry[]
): Promise<MatchResult> {
  const exact = ledger.find(
    e => e.ref === bank.ref &&
         e.amount === bank.amount
  )
  if (exact) return {
    status: 'matched',
    entry: exact
  }
  return fuzzyMatch(bank, ledger)
}`}
          </pre>
        </div>
      </section>

      {/* Section 2 — Proof numbers */}
      {/* TODO: replace with real data */}
      <section className="border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            <FadeIn delay={0}>
              <MetricCard value="12" label="Products shipped to production" />
            </FadeIn>
            <FadeIn delay={0.08}>
              <MetricCard value="60%" label="Avg. API latency reduction" />
            </FadeIn>
            <FadeIn delay={0.16}>
              <MetricCard value="8 wks" label="Fastest 0→1 SaaS build" />
            </FadeIn>
            <FadeIn delay={0.24}>
              <MetricCard value="5 yrs" label="Full-stack + product ownership" />
            </FadeIn>
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
              <FadeIn className="md:col-span-2">
                <CaseStudyCard project={featured[0]} featured />
              </FadeIn>
              {featured.slice(1).map((project, i) => (
                <FadeIn key={project.id} delay={(i + 1) * 0.12}>
                  <CaseStudyCard project={project} />
                </FadeIn>
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
            <FadeIn className="bg-neutral-200 dark:bg-neutral-800 aspect-video rounded-lg flex items-center justify-center mb-8 md:mb-0 border border-border">
              <span className="text-xs font-mono text-muted">
                fig. 01 — matching pipeline
              </span>
            </FadeIn>
            <FadeIn delay={0.15}>
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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 5 — Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <FadeIn className="max-w-2xl">
              {testimonials.map((t) => (
                <TestimonialBlock key={t.id} testimonial={t} />
              ))}
            </FadeIn>
          </div>
        </section>
      )}

      {/* Section 6 — Contact */}
      <section id="contact" className="py-16 md:py-24 lg:py-32 bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="md:grid md:grid-cols-2 md:gap-16">
            <FadeIn className="mb-10 md:mb-0">
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
            </FadeIn>
            <FadeIn delay={0.15}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
