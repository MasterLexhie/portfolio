'use client'

import { useState } from 'react'
import { ProjectCard } from './ProjectCard'
import { FadeIn } from './FadeIn'
import type { PortfolioProject, ProjectType } from '@/src/lib/data'

type Filter = 'all' | ProjectType | 'case-study'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'full-stack', label: 'Full-stack' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'case-study', label: 'Case studies only' },
]

export function ProjectGrid({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState<Filter>('all')

  const filtered = projects.filter((p) => {
    if (active === 'all') return true
    if (active === 'case-study') return !!(p.problem && p.solution && p.result)
    return p.type === active
  })

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-2 px-4 md:px-8 mb-6 md:mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            aria-pressed={active === f.value}
            className={`whitespace-nowrap text-sm px-4 py-2 rounded-lg min-h-[44px] transition-colors ${
              active === f.value
                ? 'bg-foreground text-background'
                : 'border border-border text-muted hover:text-foreground hover:border-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 px-4 md:px-8 pb-16">
          {filtered.map((p) => (
            <FadeIn key={p.id}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <p role="status" className="text-sm text-muted px-4 md:px-8 pb-16">
          No projects in this category yet.
        </p>
      )}
    </>
  )
}
