import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@/src/components/RichText'
import { TestimonialBlock } from '@/src/components/TestimonialBlock'
import { FadeIn } from '@/src/components/FadeIn'
import {
  getProjectBySlug,
  getProjectSlugs,
  getTestimonialForProject,
} from '@/src/lib/data'

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Precious Kanu`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [
        {
          url: project.cover_image.sizes?.og?.url ?? project.cover_image.url,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/work/${slug}`,
    },
  }
}

const typeLabels: Record<string, string> = {
  'full-stack': 'Full-stack',
  backend: 'Backend',
  frontend: 'Frontend',
  web3: 'Web3',
}

function SectionLabel({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono text-muted">{num}</span>
      <h2 className="font-sans text-xs tracking-widest uppercase text-muted">
        {children}
      </h2>
      <span className="flex-1 h-px bg-border" aria-hidden="true" />
    </div>
  )
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const testimonial = await getTestimonialForProject(project.id)

  const sections = [
    { id: 'problem', label: 'Problem' },
    ...(project.discovery ? [{ id: 'discovery', label: 'Discovery' }] : []),
    { id: 'solution', label: 'Decision' },
    { id: 'results', label: 'Results' },
    ...(testimonial ? [{ id: 'testimonial', label: 'Testimonial' }] : []),
    { id: 'stack', label: 'Tech stack' },
  ]

  const num = (id: string) =>
    String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0')

  return (
    <>
      <article className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors py-4 mb-2"
          >
            <span aria-hidden="true">&larr;</span>
            All projects
          </Link>
          <div className="md:grid md:grid-cols-[1fr_280px] md:gap-12">
            {/* Main content */}
            <div>
              {/* Header */}
              <div className="mb-8 fade-in">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-wide text-muted">
                    {typeLabels[project.type] ?? project.type}
                  </span>
                  <span className="flex-1 h-px bg-border" aria-hidden="true" />
                </div>
                <h1 className="text-2xl md:text-4xl tracking-tight mt-5 mb-4 leading-[1.1]">
                  {project.title}
                </h1>
                <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl">
                  {project.summary}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 py-5 border-y border-border">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      Role
                    </p>
                    <p className="text-sm font-medium mt-1">{project.role}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      Timeline
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {project.published_date.slice(0, 4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      Outcome
                    </p>
                    <p className="text-sm font-medium mt-1 text-accent">
                      {project.outcome_metric}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      Status
                    </p>
                    <p className="text-sm font-medium mt-1">Production</p>
                  </div>
                </div>
              </div>

              {/* Cover image */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface mb-14">
                <Image
                  src={project.cover_image.url}
                  alt={project.cover_image.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Problem */}
              <section id="problem" className="mb-14">
                <FadeIn>
                  <SectionLabel num={num('problem')}>The problem</SectionLabel>
                  <RichText content={project.problem} />
                </FadeIn>
              </section>

              {/* Discovery */}
              {project.discovery && (
                <section id="discovery" className="mb-14">
                  <FadeIn>
                    <SectionLabel num={num('discovery')}>Discovery</SectionLabel>
                    <RichText content={project.discovery} />
                  </FadeIn>
                </section>
              )}

              {/* Solution / Decision */}
              <section id="solution" className="mb-14">
                <FadeIn>
                  <SectionLabel num={num('solution')}>The decision</SectionLabel>
                  <RichText content={project.solution} />
                </FadeIn>
              </section>

              {/* Architecture image */}
              {project.architecture_image && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface mb-14">
                  <Image
                    src={project.architecture_image.url}
                    alt={project.architecture_image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              )}

              {/* Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-14">
                  {project.screenshots.map((s, i) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-lg overflow-hidden bg-surface"
                    >
                      <Image
                        src={s.url}
                        alt={s.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Results */}
              <section id="results" className="mb-14">
                <FadeIn>
                  <SectionLabel num={num('results')}>Results</SectionLabel>
                  <RichText content={project.result} />
                </FadeIn>
              </section>

              {/* Testimonial */}
              {testimonial && (
                <section id="testimonial" className="mb-14 py-10 border-y border-border">
                  <FadeIn>
                    <TestimonialBlock testimonial={testimonial} />
                  </FadeIn>
                </section>
              )}

              {/* Tech stack */}
              {project.tech_stack.length > 0 && (
                <section id="stack" className="mb-14">
                  <FadeIn>
                  <SectionLabel num={num('stack')}>Tech stack</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((t) => (
                      <span
                        key={t.item}
                        className="text-xs font-mono text-muted border border-border px-3 py-1.5 rounded"
                      >
                        {t.item}
                      </span>
                    ))}
                  </div>
                  </FadeIn>
                </section>
              )}

              {/* Desktop CTA strip */}
              <div className="hidden md:flex items-center justify-between py-10 border-t border-border">
                <p className="text-xl font-serif tracking-tight">
                  Let&rsquo;s build something <em className="italic">together</em>.
                </p>
                <Link
                  href="/#contact"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  Get in touch &rarr;
                </Link>
              </div>
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden md:block">
              <div className="sticky top-24">
                {/* Table of contents */}
                <nav className="mb-8">
                  <p className="text-xs tracking-widest uppercase text-muted mb-4">
                    Contents
                  </p>
                  <ul className="space-y-2.5">
                    {sections.map((s, i) => (
                      <li key={s.id} className="flex items-baseline gap-3">
                        <span className="text-[10px] font-mono text-muted">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <a
                          href={`#${s.id}`}
                          className="text-sm text-muted hover:text-foreground transition-colors"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* CTA card */}
                <div className="bg-foreground text-background rounded-lg p-6">
                  <p className="font-serif text-lg tracking-tight mb-1.5">
                    Need something built?
                  </p>
                  <p className="text-xs opacity-60 mb-5">
                    I take on contracts and consulting work.
                  </p>
                  <Link
                    href="/#contact"
                    className="w-full text-center text-sm bg-background text-foreground px-4 py-2.5 rounded-lg hover:bg-surface transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    Book a call
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-3 px-4 flex items-center justify-between md:hidden z-40">
        <p className="text-sm font-medium truncate mr-4">{project.title}</p>
        <Link
          href="/#contact"
          className="shrink-0 text-sm bg-accent text-accent-foreground px-4 py-2.5 rounded-lg hover:bg-accent-hover transition-colors min-h-[44px] flex items-center"
        >
          Get in touch &rarr;
        </Link>
      </div>
    </>
  )
}
