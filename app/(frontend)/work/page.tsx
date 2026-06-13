import type { Metadata } from 'next'
import Link from 'next/link'
import { ProjectGrid } from '@/src/components/ProjectGrid'
import { getAllProjects } from '@/src/lib/data'

export const metadata: Metadata = {
  title: 'Work — Precious Kanu',
  description:
    'Selected projects spanning full-stack applications, backend services, frontend interfaces, and Web3.',
  openGraph: {
    title: 'Work — Precious Kanu',
    description:
      'Selected projects spanning full-stack applications, backend services, frontend interfaces, and Web3.',
    images: [{ url: '/og-default.jpg' }],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SERVER_URL}/work`,
  },
}

export default async function WorkPage() {
  const projects = await getAllProjects()

  return (
    <div className="py-12 md:py-16">
      <div className="px-4 md:px-8 max-w-6xl mx-auto mb-8 md:mb-12">
        {projects.length > 0 && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-muted">
              {String(projects.length).padStart(2, '0')} projects
            </span>
            <span className="flex-1 h-px bg-border" aria-hidden="true" />
          </div>
        )}
        <h1 className="text-3xl md:text-5xl tracking-tight">
          Everything I&rsquo;ve <em className="italic">built</em>
        </h1>
        <p className="text-base text-muted max-w-lg mt-4 leading-relaxed">
          Full-stack products, backend services, frontend interfaces, and the
          occasional smart contract. Filter by type or browse the case studies.
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        {projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <div className="px-4 md:px-8 pb-16">
            <div className="border border-border rounded-lg p-8 md:p-12">
              <p className="text-base text-muted leading-relaxed max-w-md">
                Nothing published here yet — the first case studies are on
                their way. In the meantime you can reach me directly.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center min-h-[44px] mt-4 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Get in touch &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
