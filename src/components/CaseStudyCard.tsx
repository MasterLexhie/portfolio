import Link from 'next/link'
import Image from 'next/image'
import type { PortfolioProject } from '@/src/lib/data'

type CaseStudyCardProps = {
  project: PortfolioProject
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
    <Link href={`/work/${project.slug}`} className="group block cursor-pointer">
      <div className="overflow-hidden rounded-lg bg-surface border border-border transition-colors duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-600">
        <div
          className={`relative w-full ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
        >
          <Image
            src={project.cover_image.sizes?.card?.url ?? project.cover_image.url}
            alt={project.cover_image.alt}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-border">
          <span className="text-xs font-mono text-muted uppercase tracking-wide transition-colors duration-300 group-hover:text-foreground">
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
        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-4 py-3 flex items-center justify-between transition-colors duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-600">
          <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300">
            Read the case study{' '}
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </span>
          <span className="text-xs text-muted font-mono">
            {project.role}
          </span>
        </div>
      </div>
    </Link>
  )
}
