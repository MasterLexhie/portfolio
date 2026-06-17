import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media, Project, Testimonial } from '@/src/payload-types'

export type ProjectType = 'full-stack' | 'backend' | 'frontend' | 'web3'

export type PortfolioImage = {
  url: string
  alt: string
  sizes?: {
    card?: { url: string }
    thumb?: { url: string }
    og?: { url: string }
  }
}

// Rich text is a Lexical JSON AST coming from Payload; the RichText
// component also accepts plain strings.
export type RichTextContent = string | Record<string, unknown>

export type PortfolioProject = {
  id: string
  title: string
  slug: string
  summary: string
  featured: boolean
  cover_image: PortfolioImage
  role: string
  outcome_metric: string
  type: ProjectType
  problem?: RichTextContent
  solution?: RichTextContent
  result?: RichTextContent
  discovery?: RichTextContent
  tech_stack: { item: string }[]
  architecture_image?: PortfolioImage
  screenshots?: PortfolioImage[]
  live_url?: string
  github_url?: string
  published_date: string
}

export type PortfolioTestimonial = {
  id: string
  name: string
  role: string
  quote: string
  project?: { id: string } | null
  avatar?: PortfolioImage | null
}

const isMedia = (value: unknown): value is Media =>
  typeof value === 'object' && value !== null

function toImage(value: Project['cover_image'] | null | undefined): PortfolioImage | undefined {
  if (!isMedia(value) || !value.url) return undefined
  return {
    url: value.url,
    alt: value.alt,
    sizes: {
      card: value.sizes?.card?.url ? { url: value.sizes.card.url } : undefined,
      thumb: value.sizes?.thumb?.url ? { url: value.sizes.thumb.url } : undefined,
      og: value.sizes?.og?.url ? { url: value.sizes.og.url } : undefined,
    },
  }
}

function toProject(doc: Project): PortfolioProject {
  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary,
    featured: doc.featured,
    cover_image: toImage(doc.cover_image) ?? { url: '/placeholder-cover.svg', alt: doc.title },
    role: doc.role,
    outcome_metric: doc.outcome_metric,
    type: doc.type ?? 'full-stack',
    problem: doc.problem ?? undefined,
    solution: doc.solution ?? undefined,
    result: doc.result ?? undefined,
    discovery: doc.discovery ?? undefined,
    tech_stack: (doc.tech_stack ?? []).flatMap((t) => (t.item ? [{ item: t.item }] : [])),
    architecture_image: toImage(doc.architecture_image),
    screenshots: (doc.screenshots ?? []).flatMap((s) => {
      const image = toImage(s.image)
      return image ? [image] : []
    }),
    live_url: doc.live_url ?? undefined,
    github_url: doc.github_url ?? undefined,
    published_date: doc.published_date ?? doc.createdAt,
  }
}

function toTestimonial(doc: Testimonial): PortfolioTestimonial {
  const project = doc.project
  return {
    id: String(doc.id),
    name: doc.name,
    role: doc.role,
    quote: doc.quote,
    project:
      project == null
        ? null
        : { id: String(typeof project === 'object' ? project.id : project) },
    avatar: toImage(doc.avatar) ?? null,
  }
}

export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    where: { featured: { equals: true } },
    sort: '-published_date',
    limit: 3,
    depth: 2,
  })
  return docs.map(toProject)
}

export async function getAllProjects(): Promise<PortfolioProject[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    sort: '-published_date',
    limit: 100,
    depth: 1,
  })
  return docs.map(toProject)
}

export async function getProjectSlugs(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    limit: 100,
    depth: 0,
  })
  return docs.map((p) => p.slug)
}

export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0] ? toProject(docs[0]) : null
}

export async function getTestimonialForProject(
  projectId: string,
): Promise<PortfolioTestimonial | null> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'testimonials',
    where: { project: { equals: Number(projectId) } },
    limit: 1,
    depth: 1,
  })
  return docs[0] ? toTestimonial(docs[0]) : null
}

export async function getHomepageTestimonials(): Promise<PortfolioTestimonial[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'testimonials',
    where: { project: { exists: false } },
    limit: 2,
    depth: 1,
  })
  return docs.map(toTestimonial)
}
