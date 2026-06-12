import Link from 'next/link'
import Image from 'next/image'
import type { DummyProject } from '@/src/lib/dummy-data'

type ProjectCardProps = {
  project: DummyProject
}

const typeLabels: Record<string, string> = {
  'full-stack': 'Full-stack',
  backend: 'Backend',
  frontend: 'Frontend',
  web3: 'Web3',
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasCaseStudy = !!(project.problem && project.solution && project.result)

  return (
    <Link href={`/work/${project.slug}`} className="group block cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-surface border border-border transition-colors duration-200 group-hover:border-neutral-300 dark:group-hover:border-neutral-700">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={project.cover_image.url}
            alt={project.cover_image.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-wide text-muted">
            {typeLabels[project.type] ?? project.type}
          </span>
          {hasCaseStudy && (
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-mono text-muted hidden md:inline">
                Case study
              </span>
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-2 mt-3">
          <h3 className="font-serif text-base md:text-lg tracking-tight leading-snug group-hover:underline underline-offset-4 decoration-1">
            {project.title}
          </h3>
          <span className="flex items-center gap-2 shrink-0 mt-0.5">
            {project.github_url && (
              <span className="text-[10px] font-mono text-muted">
                GitHub {'↗'}
              </span>
            )}
            {project.live_url && (
              <span className="text-[10px] font-mono text-muted">
                Live {'↗'}
              </span>
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
    </Link>
  )
}
