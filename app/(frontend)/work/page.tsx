import type { Metadata } from 'next'
import { ProjectGrid } from '@/src/components/ProjectGrid'
// TODO: replace with Payload query in Phase 2
import { dummyProjects } from '@/src/lib/dummy-data'

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

export default function WorkPage() {
  // TODO: replace with Payload query in Phase 2
  const projects = dummyProjects

  return (
    <div className="py-12 md:py-16">
      <div className="px-4 md:px-8 max-w-6xl mx-auto mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-muted">
            {String(projects.length).padStart(2, '0')} projects
          </span>
          <span className="flex-1 h-px bg-border" aria-hidden="true" />
        </div>
        <h1 className="text-3xl md:text-5xl tracking-tight">
          Everything I&rsquo;ve <em className="italic">built</em>
        </h1>
        <p className="text-base text-muted max-w-lg mt-4 leading-relaxed">
          Full-stack products, backend services, frontend interfaces, and the
          occasional smart contract. Filter by type or browse the case studies.
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  )
}
