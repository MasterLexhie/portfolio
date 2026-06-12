import Link from 'next/link'
import Image from 'next/image'
import type { DummyProject } from '@/src/lib/dummy-data'

type CaseStudyCardProps = {
  project: DummyProject
  featured?: boolean
}

const typeLabels: Record<string, string> = {
  'full-stack': 'Full-stack',
  backend: 'Backend',
  frontend: 'Frontend',
  web3: 'Web3',
}

export function CaseStudyCard({ project, featured }: CaseStudyCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-surface">
        <div
          className={`relative w-full ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
        >
          <Image
            src={project.cover_image.url}
            alt={project.cover_image.alt}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity"
            sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-border">
          <span className="text-xs font-mono text-muted uppercase tracking-wide">
            {typeLabels[project.type] ?? project.type}
          </span>
          <span className="text-xs font-mono text-accent text-right">
            {project.outcome_metric}
          </span>
        </div>
        <h3
          className={`font-serif tracking-tight mt-4 group-hover:underline underline-offset-4 decoration-1 ${
            featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-sm text-muted mt-2 leading-relaxed ${
            featured ? 'max-w-2xl line-clamp-2' : 'line-clamp-2'
          }`}
        >
          {project.summary}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted">{project.role}</span>
          <span className="text-sm text-accent">
            Read the case study &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
