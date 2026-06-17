import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MetricCard } from '@/src/components/MetricCard'
import { CaseStudyCard } from '@/src/components/CaseStudyCard'
import { TestimonialBlock } from '@/src/components/TestimonialBlock'
import { ContactForm } from '@/src/components/ContactForm'
import { SectionHeading } from '@/src/components/SectionHeading'
import { HeroContent } from '@/src/components/HeroContent'
import { FadeIn } from '@/src/components/FadeIn'
import { getFeaturedProjects, getHomepageTestimonials } from '@/src/lib/data'

export const metadata: Metadata = {
  title: 'Precious Kanu — Software Engineer & Product Builder',
  description:
    'I build products that ship — from idea to production. Full-stack software engineer with product building experience.',
  openGraph: {
    title: 'Precious Kanu — Software Engineer & Product Builder',
    description:
      'I build products that ship — from idea to production.',
    images: [{ url: '/og-default.jpg' }],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SERVER_URL,
  },
}

export default async function HomePage() {
  const featured = await getFeaturedProjects()
  const testimonials = await getHomepageTestimonials()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Precious Kanu',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    jobTitle: 'Software Engineer & Product Builder',
    sameAs: [
      'https://github.com/MasterLexhie',
      'https://www.linkedin.com/in/precious-alexandra-kanu/',
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
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-0 md:pb-[15vh] w-full">
          <HeroContent />
        </div>
        <div
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-[0.16] dark:opacity-[0.10] pointer-events-none select-none"
        >
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
      <section className="border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            <FadeIn delay={0}>
              <MetricCard value="8" label="Products shipped to production" />
            </FadeIn>
            <FadeIn delay={0.08}>
              <MetricCard value="97%" label="API response time reduction" />
            </FadeIn>
            <FadeIn delay={0.16}>
              <MetricCard value="8 wks" label="Fastest 0→1 SaaS build" />
            </FadeIn>
            <FadeIn delay={0.24}>
              <MetricCard value="7+ yrs" label="Full-stack + product ownership" />
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
          {featured.length > 0 ? (
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
          ) : (
            <FadeIn className="border border-border rounded-lg p-8 md:p-12">
              <p className="text-base text-muted leading-relaxed max-w-md">
                Case studies are being written up. If you want to hear about
                recent work before they&rsquo;re published, get in touch.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center min-h-[44px] mt-4 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Get in touch &rarr;
              </Link>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Section 4 — Technical depth signal */}
      <section className="py-16 md:py-24 lg:py-32 bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <FadeIn className="relative aspect-video rounded-lg overflow-hidden mb-8 md:mb-0 border border-border">
              <Image
                src="/api-optimisation.webp"
                alt="Query optimisation — from 10 seconds to 300ms"
                fill
                className="object-fill"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </FadeIn>
            <FadeIn delay={0.15}>
              <SectionHeading
                index="02"
                label="Under the hood"
                title="From 10 seconds to 300ms — a query optimisation story"
                className="mb-5"
              />
              <p className="text-base text-muted leading-relaxed mb-4">
                Two enterprise clients were each processing 2 million
                transactions daily — all landing in a single shared table. The
                query had a business_id filter but was pulling all columns,
                running on poorly defined indexes, with no table partitioning.
                Pulling 30 days of data was taking 10 seconds. It wasn&rsquo;t
                visible until a whale client hit production scale.
              </p>
              <p className="text-base text-muted leading-relaxed mb-4">
                The fix was precise: narrow the query to only the columns
                needed, introduce compound indexes matched to the actual query
                pattern, and partition the table per business. No infrastructure
                changes. No new services. The same query, now hitting the right
                partition with the right indexes, responds in 300ms.
              </p>
              <p className="text-base text-muted leading-relaxed">
                Left unsolved, every other client on the platform would have
                felt it. That&rsquo;s the kind of problem worth getting right.
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
                I&rsquo;m open to full-time roles, contract work, and consulting
                engagements. If you have a project that needs an engineer who
                thinks about the product — not just the code — let&rsquo;s talk.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/MasterLexhie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border rounded-lg px-4 py-2.5 text-sm text-muted hover:text-foreground hover:border-foreground transition-colors min-h-[44px] flex items-center"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/precious-alexandra-kanu/"
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
