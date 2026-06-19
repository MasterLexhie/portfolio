import Link from 'next/link'
import Image from 'next/image'
import type { PortfolioProject } from '@/src/lib/data'

type ProjectCardProps = {
  project: PortfolioProject
}

const typeLabels: Record<string, string> = {
  'full-stack': 'Full-stack',
  backend: 'Backend',
  frontend: 'Frontend',
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasCaseStudy = !!(project.problem && project.solution && project.result)

  return (
    <div className="group relative">
      {/* Card-level link — stretched to cover the entire card */}
      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${project.title}`}
      />

      <div className="relative overflow-hidden rounded-lg bg-surface border border-border transition-colors duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-600">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={project.cover_image.sizes?.card?.url ?? project.cover_image.url}
            alt={project.cover_image.alt}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between pb-2 border-b border-border transition-colors duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-600">
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-wide text-muted transition-colors duration-300 group-hover:text-foreground">
            {typeLabels[project.type] ?? project.type}
          </span>
          {hasCaseStudy && (
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
              <span className="text-[10px] font-mono text-muted max-md:sr-only">
                Case study
              </span>
            </span>
          )}
        </div>
        <div className="flex items-baseline justify-between gap-2 mt-3">
          <h3 className="font-serif text-base md:text-lg tracking-tight leading-snug group-hover:underline underline-offset-4 decoration-1">
            {project.title}
          </h3>
          <span className="relative z-10 flex items-baseline gap-2 shrink-0">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-muted transition-colors duration-300 hover:text-foreground"
              >
                GitHub {'↗'}
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-muted transition-colors duration-300 hover:text-foreground"
              >
                Live {'↗'}
              </a>
            )}
          </span>
        </div>
        <p className="text-sm text-muted mt-1.5 line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech_stack.slice(0, 4).map((t) => (
            <span
              key={t.item}
              className="text-[10px] md:text-xs font-mono text-muted bg-surface px-1.5 py-0.5 rounded"
            >
              {t.item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
